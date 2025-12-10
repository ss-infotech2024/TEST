// OrionAptitudeTest.jsx
import React, { useState, useEffect } from 'react';
import orionAptitudeQuestions from "../orionAptitudeQuestions";

const OrionAptitudeTest = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [fullscreen, setFullscreen] = useState(false);
    const [violationCount, setViolationCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState('');
    const [backendStatus, setBackendStatus] = useState('checking');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const filteredQuestions = categoryFilter === 'all'
        ? orionAptitudeQuestions
        : orionAptitudeQuestions.filter(q => q.category === categoryFilter);

    const generateSubmissionId = () => {
        return 'orion-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    };

    const SUBMIT_ENDPOINT = 'https://ssinfotech-backend-k03q.onrender.com/api/orion-submissions/submit';
    const HEALTH_ENDPOINTS = [
        'https://ssinfotech-backend-k03q.onrender.com/health',
        'https://ssinfotech-backend-k03q.onrender.com/api/health'
    ];

    // Google Form for Orion RFID applications
    const ORION_GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform";

    const submitTestToBackend = async (submissionData) => {
        try {
            setSubmissionLoading(true);
            setSubmissionError('');
            setSubmissionSuccess('');

            console.log('Submitting Orion test data:', submissionData);

            const response = await fetch(SUBMIT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();
            console.log('Backend response:', result);

            if (response.ok && result.success) {
                setSubmissionSuccess('Your Orion RFID aptitude test results have been successfully submitted!');
                setBackendStatus('connected');
                return { ...result, synced: true };
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
            console.warn('Backend submission failed:', error.message);
            setSubmissionError('Results saved locally (server offline)');
            setBackendStatus('disconnected');
            return { synced: false, error: error.message };
        } finally {
            setSubmissionLoading(false);
        }
    };

    const testBackendConnection = async () => {
        for (const endpoint of HEALTH_ENDPOINTS) {
            try {
                const response = await fetch(endpoint, { method: 'GET' });
                if (response.ok) {
                    setBackendStatus('connected');
                    return true;
                }
            } catch (error) {
                console.log(`Health check failed: ${endpoint}`);
            }
        }
        setBackendStatus('disconnected');
        return false;
    };

    const saveToLocalStorage = (submission, synced = false) => {
        try {
            const existing = JSON.parse(localStorage.getItem('orionAptitudeTestSubmissions') || '[]');

            const existingSubmission = existing.find(sub =>
                sub.submissionId === submission.submissionId
            );

            if (existingSubmission) {
                console.log('Submission already exists in localStorage, updating...');
                const updated = existing.map(sub =>
                    sub.submissionId === submission.submissionId
                        ? { ...submission, localSaveTime: new Date().toISOString(), syncedToBackend: synced }
                        : sub
                );
                localStorage.setItem('orionAptitudeTestSubmissions', JSON.stringify(updated));
            } else {
                const newEntry = {
                    ...submission,
                    submissionId: submission.submissionId || generateSubmissionId(),
                    localSaveTime: new Date().toISOString(),
                    syncedToBackend: synced,
                    testType: 'Orion RFID Aptitude Test'
                };
                existing.unshift(newEntry);
                localStorage.setItem('orionAptitudeTestSubmissions', JSON.stringify(existing));
                console.log('New Orion submission saved to localStorage:', newEntry);
            }
        } catch (e) {
            console.error('localStorage error:', e);
        }
    };

    const syncPendingSubmissions = async () => {
        const pending = JSON.parse(localStorage.getItem('orionAptitudeTestSubmissions') || '[]')
            .filter(s => !s.syncedToBackend);

        for (const sub of pending) {
            const result = await submitTestToBackend(sub);
            if (result.synced) {
                const updated = JSON.parse(localStorage.getItem('orionAptitudeTestSubmissions') || '[]')
                    .map(s => s.submissionId === sub.submissionId ? { ...s, syncedToBackend: true } : s);
                localStorage.setItem('orionAptitudeTestSubmissions', JSON.stringify(updated));
            }
        }
    };

    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        setFullscreen(true);
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setFullscreen(false);
    };

    const handleViolation = () => {
        const newCount = violationCount + 1;
        setViolationCount(newCount);
        if (newCount >= 3) {
            handleTestCompletion();
            alert('Test terminated due to multiple security violations!');
        } else {
            alert(`Security Warning ${newCount}/3: Maintain test integrity!`);
        }
    };

    // Security event listeners
    useEffect(() => {
        if (!testStarted || testCompleted) return;

        const visibilityHandler = () => document.hidden && handleViolation();
        const blurHandler = () => handleViolation();
        const fullscreenHandler = () => !document.fullscreenElement && handleViolation();
        const keydownHandler = (e) => {
            if (
                e.key === 'Escape' || e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
                handleViolation();
            }
        };
        const contextMenuHandler = (e) => e.preventDefault();
        const beforeUnloadHandler = (e) => {
            e.preventDefault();
            e.returnValue = 'Are you sure you want to leave? Your test will be submitted.';
            return e.returnValue;
        };

        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('blur', blurHandler);
        document.addEventListener('fullscreenchange', fullscreenHandler);
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('contextmenu', contextMenuHandler);
        window.addEventListener('beforeunload', beforeUnloadHandler);

        enterFullscreen();
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';

        return () => {
            document.removeEventListener('visibilitychange', visibilityHandler);
            window.removeEventListener('blur', blurHandler);
            document.removeEventListener('fullscreenchange', fullscreenHandler);
            document.removeEventListener('keydown', keydownHandler);
            document.removeEventListener('contextmenu', contextMenuHandler);
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
            if (testCompleted) exitFullscreen();
        };
    }, [testStarted, testCompleted, violationCount]);

    // Timer
    useEffect(() => {
        if (!testStarted || testCompleted || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        if (timeLeft === 0) handleTestCompletion();
        return () => clearInterval(timer);
    }, [testStarted, testCompleted, timeLeft]);

    // Check backend on mount + periodic sync
    useEffect(() => {
        testBackendConnection();
        const interval = setInterval(() => {
            testBackendConnection();
            syncPendingSubmissions();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const validateUserInfo = () => {
        if (!userName.trim()) {
            alert('Please enter your name');
            return false;
        }
        if (!email.trim()) {
            alert('Please enter your email');
            return false;
        }
        if (!phone.trim()) {
            alert('Please enter your phone number');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        if (!/^[0-9+\-\s()]{10,}$/.test(phone)) {
            alert('Please enter a valid phone number');
            return false;
        }
        return true;
    };

    const handleStartTest = async () => {
        if (!validateUserInfo()) return;
        await testBackendConnection();
        setTestStarted(true);
        setStartTime(Date.now());
        setUserAnswers([]);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setViolationCount(0);
        setHasSubmitted(false);
    };

    const handleAnswerSelect = (answer) => setSelectedAnswer(answer);

    const handleNextQuestion = () => {
        const q = filteredQuestions[currentQuestion];
        const isCorrect = selectedAnswer === q.correctAnswer;

        setUserAnswers(prev => [...prev, {
            questionId: q.id,
            question: q.question,
            selectedAnswer,
            correctAnswer: q.correctAnswer,
            isCorrect,
            difficulty: q.difficulty,
            category: q.category
        }]);

        if (isCorrect) setScore(s => s + 1);

        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer('');
        } else {
            handleTestCompletion();
        }
    };

    const handleTestCompletion = async () => {
        if (hasSubmitted) {
            console.log('Test already submitted, skipping duplicate submission');
            return;
        }

        setHasSubmitted(true);

        const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 2700 - timeLeft;

        const submissionData = {
            userName: userName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            score,
            totalQuestions: filteredQuestions.length,
            userAnswers,
            violationCount,
            categoryFilter,
            timeTaken,
            submittedAt: new Date().toISOString(),
            submissionId: generateSubmissionId(),
            testType: 'Orion RFID Solutions Aptitude Test',
            company: 'Orion RFID Solutions '
        };

        console.log('Submitting Orion test with ID:', submissionData.submissionId);

        saveToLocalStorage(submissionData, false);

        const result = await submitTestToBackend(submissionData);

        saveToLocalStorage(submissionData, result.synced);

        setTestCompleted(true);
        setTestStarted(false);
        exitFullscreen();
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const resetTest = () => {
        setUserName('');
        setEmail('');
        setPhone('');
        setTestStarted(false);
        setTestCompleted(false);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setScore(0);
        setUserAnswers([]);
        setTimeLeft(2700);
        setCategoryFilter('all');
        setViolationCount(0);
        setSubmissionError('');
        setSubmissionSuccess('');
        setBackendStatus('checking');
        setHasSubmitted(false);
        testBackendConnection();
    };

    const getDifficultyColor = (d) => {
        return d === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            d === 'hard' ? 'bg-red-100 text-red-800' :
                'bg-green-100 text-green-800';
    };

    const getCategoryColor = (c) => {
        const colors = {
            'RFID Technology': 'bg-blue-100 text-blue-800',
            'Company Profile': 'bg-purple-100 text-purple-800',
            'RFID Applications': 'bg-indigo-100 text-indigo-800',
            'Business Logic': 'bg-green-100 text-green-800'
        };
        return colors[c] || 'bg-gray-100 text-gray-800';
    };

    const getBackendStatusColor = () => {
        return backendStatus === 'connected' ? 'bg-green-100 text-green-800' :
            backendStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' :
                backendStatus === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800';
    };

    const getBackendStatusText = () => {
        return backendStatus === 'connected' ? 'Connected' :
            backendStatus === 'disconnected' ? 'Backend Offline' :
                backendStatus === 'error' ? 'Connection Error' :
                    'Checking Status...';
    };

    const handleGoogleFormClick = () => {
        window.open(ORION_GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    };

    // Calculate category statistics
    const categoryStats = {
        'RFID Technology': { total: 0, correct: 0 },
        'Company Profile': { total: 0, correct: 0 },
        'RFID Applications': { total: 0, correct: 0 },
        'Business Logic': { total: 0, correct: 0 }
    };

    if (testCompleted) {
        userAnswers.forEach(a => {
            if (categoryStats[a.category]) {
                categoryStats[a.category].total++;
                if (a.isCorrect) categoryStats[a.category].correct++;
            }
        });
    }

    // === UI: START SCREEN ===
    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        {/* Company Header */}
                        <div className="text-center mb-10">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                                <div className="bg-blue-600 text-white p-4 rounded-lg">
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                        Orion RFID Solutions
                                    </h1>
                                    <h2 className="text-2xl font-semibold text-blue-600">
                                        Technical Aptitude Assessment
                                    </h2>
                                    <p className="text-gray-600 mt-2">Established 2017 • Manufacturing, Retailing & Wholesaling</p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                                Assessment for candidates interested in RFID technology, manufacturing processes,
                                and business operations at Orion RFID Solutions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" value={userName} onChange={e => setUserName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Email *</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+91 9876543210" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Test Category Focus</label>
                                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="all">All Categories ({orionAptitudeQuestions.length} Questions)</option>
                                    <option value="RFID Technology">RFID Technology Only</option>
                                    <option value="Company Profile">Company Profile Only</option>
                                    <option value="Business Logic">Business Logic Only</option>
                                </select>
                            </div>
                        </div>

                        {/* Company Profile Summary */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-bold text-blue-800 mb-3">About Orion RFID Solutions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-blue-700 mb-2">
                                        <span className="font-semibold">Founded:</span> 2017
                                    </p>
                                    <p className="text-blue-700 mb-2">
                                        <span className="font-semibold">Mentor:</span> Mr. Satish Mangal Masih
                                    </p>
                                    <p className="text-blue-700 mb-2">
                                        <span className="font-semibold">Business:</span> Manufacturing, Retailing & Wholesaling
                                    </p>
                                </div>
                                <div>
                                    <p className="text-blue-700 mb-2">
                                        <span className="font-semibold">Products:</span> RFID Tags, UHF RFID Tags, Cards
                                    </p>
                                    <p className="text-blue-700 mb-2">
                                        <span className="font-semibold">Focus:</span> Latest Technology, Market Norms
                                    </p>
                                    <p className="text-blue-700 mb-2">
                                        <span className="font-semibold">Quality:</span> Long Service Life, Fine Finishing
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {orionAptitudeQuestions.filter(q => q.category === 'RFID Technology').length}
                                </div>
                                <div className="text-blue-700 font-medium">RFID Technology</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {orionAptitudeQuestions.filter(q => q.category === 'Company Profile').length}
                                </div>
                                <div className="text-purple-700 font-medium">Company Profile</div>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-indigo-600">
                                    {orionAptitudeQuestions.filter(q => q.category === 'RFID Applications').length}
                                </div>
                                <div className="text-indigo-700 font-medium">Applications</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {orionAptitudeQuestions.filter(q => q.category === 'Business Logic').length}
                                </div>
                                <div className="text-green-700 font-medium">Business Logic</div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Security & Test Rules:</h3>
                            <ul className="list-disc list-inside text-yellow-700 space-y-1">
                                <li>Fullscreen mode will be enforced automatically</li>
                                <li>Switching tabs/windows is prohibited</li>
                                <li>Right-click and developer tools are disabled</li>
                                <li>3 security violations will auto-submit your test</li>
                                <li>Time limit: 45 minutes</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">📋 Test Information:</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Total Questions: {filteredQuestions.length}</li>
                                <li>Time Limit: 45 minutes</li>
                                <li>All questions are multiple choice (single answer)</li>
                                <li>No negative marking</li>
                                <li>Results will be saved automatically</li>
                                <li>Backup storage in browser for offline submission</li>
                            </ul>
                        </div>

                        {backendStatus === 'disconnected' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                <p className="text-yellow-700 text-center">
                                    Backend server is not connected. Test results will be saved locally in your browser.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleStartTest}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={backendStatus === 'checking'}
                        >
                            {backendStatus === 'checking' ? 'Checking Connection...' : 'Start Orion RFID Aptitude Test'}
                        </button>

                        {backendStatus === 'disconnected' && (
                            <div className="mt-4 text-center">
                                <button onClick={testBackendConnection} className="text-blue-600 hover:text-blue-800 underline text-sm">
                                    Retry Backend Connection
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // === UI: TEST IN PROGRESS ===
    if (testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Test Content - 3/4 width */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Orion RFID Aptitude Test</h2>
                                        <p className="text-gray-600">Candidate: {userName}</p>
                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBackendStatusColor()}`}>
                                            {getBackendStatusText()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-gray-700">
                                            Time Left: <span className={timeLeft < 300 ? "text-red-600 font-bold" : "text-gray-800"}>
                                                {formatTime(timeLeft)}
                                            </span>
                                        </div>
                                        <div className="text-gray-600">
                                            Question {currentQuestion + 1} of {filteredQuestions.length}
                                        </div>
                                        <div className="text-sm text-red-600">
                                            Violations: {violationCount}/3
                                        </div>
                                        <div className="text-sm text-blue-600">
                                            Score: {score}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}></div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(filteredQuestions[currentQuestion].category)}`}>
                                                {filteredQuestions[currentQuestion].category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(filteredQuestions[currentQuestion].difficulty)}`}>
                                                {filteredQuestions[currentQuestion].difficulty.toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            Q{filteredQuestions[currentQuestion].id}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                                        {filteredQuestions[currentQuestion].question}
                                    </h3>

                                    <div className="space-y-3">
                                        {filteredQuestions[currentQuestion].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswerSelect(option)}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${selectedAnswer === option
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                                                    }`}
                                            >
                                                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                        disabled={currentQuestion === 0}
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>

                                    <button
                                        onClick={handleNextQuestion}
                                        disabled={!selectedAnswer}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {currentQuestion === filteredQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
                                    </button>
                                </div>

                                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                        </svg>
                                        <span className="text-red-700 font-medium">
                                            SECURITY ACTIVE: {violationCount > 0 && `Violations: ${violationCount}/3`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // === UI: RESULTS SCREEN ===
    if (testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Orion RFID Assessment Complete</h1>
                            <p className="text-gray-600">Congratulations {userName} on completing the Orion RFID aptitude assessment</p>
                            <p className="text-blue-600 font-medium">Your results have been recorded for recruitment consideration</p>

                            {submissionSuccess && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-700">{submissionSuccess}</p>
                                </div>
                            )}

                            {submissionError && (
                                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-yellow-700">{submissionError}</p>
                                </div>
                            )}

                            {violationCount > 0 && (
                                <p className="text-yellow-600 mt-2">
                                    Note: {violationCount} security violation(s) were recorded during your test.
                                </p>
                            )}

                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getBackendStatusColor()}`}>
                                {getBackendStatusText()}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4">Your Overall Score</h2>
                            <div className="text-5xl font-bold mb-2">{score}/{filteredQuestions.length}</div>
                            <div className="text-xl">
                                {((score / filteredQuestions.length) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm mt-2">
                                Time Taken: {formatTime(2700 - timeLeft)}
                            </div>
                            <div className="text-sm mt-1">
                                Test Date: {new Date().toLocaleDateString()}
                            </div>
                        </div>

                        {/* Category-wise Performance */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Category-wise Performance</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {Object.entries(categoryStats).map(([category, stats]) => (
                                    stats.total > 0 ? (
                                        <div key={category} className={`p-4 rounded-lg text-center ${category === 'RFID Technology' ? 'bg-blue-50' :
                                            category === 'Company Profile' ? 'bg-purple-50' :
                                                category === 'RFID Applications' ? 'bg-indigo-50' :
                                                    'bg-green-50'
                                            }`}>
                                            <div className={`text-2xl font-bold ${category === 'RFID Technology' ? 'text-blue-600' :
                                                category === 'Company Profile' ? 'text-purple-600' :
                                                    category === 'RFID Applications' ? 'text-indigo-600' :
                                                        'text-green-600'
                                                }`}>
                                                {stats.correct}/{stats.total}
                                            </div>
                                            <div className={`font-medium ${category === 'RFID Technology' ? 'text-blue-700' :
                                                category === 'Company Profile' ? 'text-purple-700' :
                                                    category === 'RFID Applications' ? 'text-indigo-700' :
                                                        'text-green-700'
                                                }`}>
                                                {category}
                                            </div>
                                            <div className={`text-sm ${category === 'RFID Technology' ? 'text-blue-600' :
                                                category === 'Company Profile' ? 'text-purple-600' :
                                                    category === 'RFID Applications' ? 'text-indigo-600' :
                                                        'text-green-600'
                                                }`}>
                                                {((stats.correct / stats.total) * 100).toFixed(1)}%
                                            </div>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>

                        {/* Detailed Statistics */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Results</h3>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div><div className="text-2xl font-bold text-green-600">{score}</div><div className="text-gray-600">Correct Answers</div></div>
                                    <div><div className="text-2xl font-bold text-red-600">{filteredQuestions.length - score}</div><div className="text-gray-600">Incorrect Answers</div></div>
                                    <div><div className="text-2xl font-bold text-blue-600">{userAnswers.length}</div><div className="text-gray-600">Questions Attempted</div></div>
                                    <div><div className="text-2xl font-bold text-purple-600">{filteredQuestions.length - userAnswers.length}</div><div className="text-gray-600">Skipped Questions</div></div>
                                </div>
                            </div>
                        </div>

                        {/* Difficulty Analysis */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Difficulty Analysis</h3>
                            <div className="space-y-4">
                                {['easy', 'medium', 'hard'].map(difficulty => {
                                    const diffQuestions = userAnswers.filter(a => a.difficulty === difficulty);
                                    const correct = diffQuestions.filter(a => a.isCorrect).length;
                                    const total = diffQuestions.length;

                                    return total > 0 && (
                                        <div key={difficulty} className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
                                                    {difficulty.toUpperCase()}
                                                </span>
                                                <span className="text-gray-700 font-medium">
                                                    {correct}/{total} ({((correct / total) * 100).toFixed(1)}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full"
                                                    style={{ width: `${(correct / total) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Google Form Submission */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-blue-800 mb-3">Next Step: Official Application Form</h3>
                                <p className="text-blue-700 mb-4">
                                    Please click the button below to complete the official Google Form for your Orion RFID Solutions application.
                                    This is required to finalize your candidature.
                                </p>
                                <button
                                    onClick={handleGoogleFormClick}
                                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center mx-auto"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.4 12.8H12v2.4h2.4V12.8zM21.6 12c0-1.2-.4-2.4-1.2-3.2l-2.4 2.4c.4.8.4 1.6.4 2.4 0 .8-.4 1.6-.4 2.4l2.4 2.4c.8-.8 1.2-2 1.2-3.2zM12 7.2c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4-2-4.4-4.4-4.4zM2.4 12c0-1.2.4-2.4 1.2-3.2l2.4 2.4c-.4.8-.4 1.6-.4 2.4 0 .8.4 1.6.4 2.4l-2.4 2.4c-.8-.8-1.2-2-1.2-3.2z" />
                                    </svg>
                                    Complete Orion RFID Application Form
                                </button>
                                <p className="text-blue-600 text-sm mt-3">
                                    Note: Your test score will be automatically linked with your application.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={resetTest}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                Retake Test
                            </button>
                            <button onClick={() => window.print()}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                Print Results
                            </button>
                            <button onClick={() => {
                                const data = {
                                    userName,
                                    email,
                                    phone,
                                    score,
                                    totalQuestions: filteredQuestions.length,
                                    percentage: ((score / filteredQuestions.length) * 100).toFixed(1),
                                    testDate: new Date().toISOString(),
                                    categoryStats
                                };
                                navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                                alert('Results copied to clipboard!');
                            }}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                Copy Results
                            </button>
                        </div>

                        {backendStatus === 'disconnected' && (
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Your results are saved in your browser's local storage under 'orionAptitudeTestSubmissions'.
                                    They will be automatically synced when the server is available.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default OrionAptitudeTest;