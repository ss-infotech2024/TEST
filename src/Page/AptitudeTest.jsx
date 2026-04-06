import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ClipboardList, 
  User, 
  Mail, 
  Phone, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Shield,
  Award,
  BookOpen,
  Brain,
  Code,
  Lightbulb,
  Users,
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  ExternalLink,
  Activity,
  Server,
  WifiOff,
  Maximize2,
  Minimize2,
  Flag,
  Send,
  FileText
} from 'lucide-react';
import { aptitudeQuestions } from "../aptitudeq";

const AptitudeTest = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [fullscreen, setFullscreen] = useState(false);
    const [violationCount, setViolationCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState('');
    const [backendStatus, setBackendStatus] = useState('checking');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    // Refs for tracking
    const violationTimeoutRef = useRef(null);
    const timerIntervalRef = useRef(null);
    const testCompletedRef = useRef(false);

    const filteredQuestions = categoryFilter === 'all'
        ? aptitudeQuestions
        : aptitudeQuestions.filter(q => q.category === categoryFilter);

    const generateSubmissionId = () => {
        return 'sub-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    };

    const SUBMIT_ENDPOINT = 'https://ssinfotech-backend-k03q.onrender.com/api/submissions/submit';
    const HEALTH_ENDPOINTS = [
        'https://ssinfotech-backend-k03q.onrender.com/health',
        'https://ssinfotech-backend-k03q.onrender.com/api/health'
    ];

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfYourFormID/viewform";

    // Handle violation with proper tracking
    const handleViolation = useCallback(() => {
        if (testCompletedRef.current || !testStarted) return;
        
        setViolationCount(prev => {
            const newCount = prev + 1;
            
            // Show warning to user
            if (newCount < 3) {
                alert(`Security Warning ${newCount}/3: Do not attempt to leave the test environment! Switching tabs, opening developer tools, or leaving fullscreen mode is not allowed.`);
            }
            
            // Auto-submit on 3rd violation
            if (newCount >= 3) {
                alert('Test terminated due to multiple security violations (3/3). Your answers will be submitted automatically.');
                handleTestCompletion();
            }
            
            return newCount;
        });
    }, [testStarted]);

    // Enter fullscreen
    const enterFullscreen = useCallback(async () => {
        try {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                await elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                await elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                await elem.msRequestFullscreen();
            }
            setFullscreen(true);
        } catch (err) {
            console.log('Fullscreen error:', err);
            alert('Please allow fullscreen mode for the test. Press F11 to enter fullscreen manually.');
        }
    }, []);

    const exitFullscreen = useCallback(() => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setFullscreen(false);
    }, []);

    // Handle test completion
    const handleTestCompletion = useCallback(async () => {
        if (testCompletedRef.current || hasSubmitted) {
            console.log('Test already completed/submitted');
            return;
        }

        testCompletedRef.current = true;
        
        // Clear timer interval
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }

        const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 3600 - timeLeft;

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
            submissionId: generateSubmissionId()
        };

        console.log('Submitting test with ID:', submissionData.submissionId);

        // Save to localStorage
        saveToLocalStorage(submissionData, false);
        
        // Try to submit to backend
        const result = await submitTestToBackend(submissionData);
        saveToLocalStorage(submissionData, result.synced);

        setHasSubmitted(true);
        setTestCompleted(true);
        setTestStarted(false);
        
        // Exit fullscreen after completion
        exitFullscreen();
        
        // Remove security event listeners
        removeSecurityListeners();
        
    }, [userName, email, phone, score, filteredQuestions.length, userAnswers, violationCount, categoryFilter, startTime, timeLeft, hasSubmitted, exitFullscreen]);

    // Submit to backend
    const submitTestToBackend = async (submissionData) => {
        try {
            setSubmissionLoading(true);
            setSubmissionError('');
            setSubmissionSuccess('');

            const response = await fetch(SUBMIT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmissionSuccess('Your test results have been successfully recorded!');
                setBackendStatus('connected');
                return { ...result, synced: true };
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
            console.warn('Backend submission failed:', error.message);
            setSubmissionError('Results saved locally (server offline). Your results will be synced when connection is restored.');
            setBackendStatus('disconnected');
            return { synced: false, error: error.message };
        } finally {
            setSubmissionLoading(false);
        }
    };

    // Save to localStorage
    const saveToLocalStorage = (submission, synced = false) => {
        try {
            const existing = JSON.parse(localStorage.getItem('aptitudeTestSubmissions') || '[]');
            const existingIndex = existing.findIndex(sub => sub.submissionId === submission.submissionId);

            const newEntry = {
                ...submission,
                localSaveTime: new Date().toISOString(),
                syncedToBackend: synced
            };

            if (existingIndex !== -1) {
                existing[existingIndex] = newEntry;
            } else {
                existing.unshift(newEntry);
            }
            
            localStorage.setItem('aptitudeTestSubmissions', JSON.stringify(existing));
            console.log('Saved to localStorage:', newEntry.submissionId);
        } catch (e) {
            console.error('localStorage error:', e);
        }
    };

    // Test backend connection
    const testBackendConnection = async () => {
        for (const endpoint of HEALTH_ENDPOINTS) {
            try {
                const response = await fetch(endpoint, { method: 'GET', signal: AbortSignal.timeout(5000) });
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

    // Sync pending submissions
    const syncPendingSubmissions = async () => {
        const pending = JSON.parse(localStorage.getItem('aptitudeTestSubmissions') || '[]')
            .filter(s => !s.syncedToBackend);

        for (const sub of pending) {
            const result = await submitTestToBackend(sub);
            if (result.synced) {
                const updated = JSON.parse(localStorage.getItem('aptitudeTestSubmissions') || '[]')
                    .map(s => s.submissionId === sub.submissionId ? { ...s, syncedToBackend: true } : s);
                localStorage.setItem('aptitudeTestSubmissions', JSON.stringify(updated));
            }
        }
    };

    // Security event handlers
    const visibilityHandler = useCallback(() => {
        if (document.hidden && testStarted && !testCompletedRef.current) {
            handleViolation();
        }
    }, [testStarted, handleViolation]);

    const blurHandler = useCallback(() => {
        if (testStarted && !testCompletedRef.current) {
            handleViolation();
        }
    }, [testStarted, handleViolation]);

    const fullscreenChangeHandler = useCallback(() => {
        if (testStarted && !testCompletedRef.current && !document.fullscreenElement && !document.webkitFullscreenElement) {
            handleViolation();
            // Attempt to re-enter fullscreen
            enterFullscreen();
        }
    }, [testStarted, handleViolation, enterFullscreen]);

    const keydownHandler = useCallback((e) => {
        if (!testStarted || testCompletedRef.current) return;
        
        // Block F12, Escape, and DevTools shortcuts
        if (e.key === 'F12' || e.key === 'Escape') {
            e.preventDefault();
            handleViolation();
            return;
        }
        
        // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) {
            e.preventDefault();
            handleViolation();
            return;
        }
        
        // Block Ctrl+U (view source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            handleViolation();
            return;
        }
        
        // Block Alt+Tab detection (limited)
        if (e.altKey && e.key === 'Tab') {
            handleViolation();
        }
    }, [testStarted, handleViolation]);

    const contextMenuHandler = useCallback((e) => {
        if (testStarted && !testCompletedRef.current) {
            e.preventDefault();
            handleViolation();
            return false;
        }
    }, [testStarted, handleViolation]);

    const beforeUnloadHandler = useCallback((e) => {
        if (testStarted && !testCompletedRef.current) {
            e.preventDefault();
            e.returnValue = 'Your test is in progress! Leaving will submit your current answers. Are you sure?';
            return e.returnValue;
        }
    }, [testStarted]);

    // Remove all security listeners
    const removeSecurityListeners = useCallback(() => {
        document.removeEventListener('visibilitychange', visibilityHandler);
        window.removeEventListener('blur', blurHandler);
        document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
        document.removeEventListener('keydown', keydownHandler);
        document.removeEventListener('contextmenu', contextMenuHandler);
        window.removeEventListener('beforeunload', beforeUnloadHandler);
        
        // Re-enable text selection
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
    }, [visibilityHandler, blurHandler, fullscreenChangeHandler, keydownHandler, contextMenuHandler, beforeUnloadHandler]);

    // Setup security listeners
    const setupSecurityListeners = useCallback(() => {
        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('blur', blurHandler);
        document.addEventListener('fullscreenchange', fullscreenChangeHandler);
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('contextmenu', contextMenuHandler);
        window.addEventListener('beforeunload', beforeUnloadHandler);
        
        // Disable text selection
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
    }, [visibilityHandler, blurHandler, fullscreenChangeHandler, keydownHandler, contextMenuHandler, beforeUnloadHandler]);

    // Timer setup
    useEffect(() => {
        if (!testStarted || testCompletedRef.current || timeLeft <= 0) return;
        
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
        
        timerIntervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Time's up - auto submit
                    if (timerIntervalRef.current) {
                        clearInterval(timerIntervalRef.current);
                    }
                    handleTestCompletion();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        };
    }, [testStarted, timeLeft, handleTestCompletion]);

    // Initialize test
    useEffect(() => {
        if (testStarted && !testCompletedRef.current) {
            setStartTime(Date.now());
            setupSecurityListeners();
            enterFullscreen();
        }
        
        return () => {
            if (!testStarted) {
                removeSecurityListeners();
                if (timerIntervalRef.current) {
                    clearInterval(timerIntervalRef.current);
                    timerIntervalRef.current = null;
                }
            }
        };
    }, [testStarted, setupSecurityListeners, removeSecurityListeners, enterFullscreen]);

    // Check backend on mount
    useEffect(() => {
        testBackendConnection();
        const interval = setInterval(() => {
            testBackendConnection();
            if (!testStarted && !testCompletedRef.current) {
                syncPendingSubmissions();
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [testStarted]);

    const validateUserInfo = () => {
        if (!userName.trim()) {
            alert('Please enter your full name');
            return false;
        }
        if (!email.trim()) {
            alert('Please enter your email address');
            return false;
        }
        if (!phone.trim()) {
            alert('Please enter your phone number');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address (e.g., name@domain.com)');
            return false;
        }
        if (!/^[0-9+\-\s()]{10,15}$/.test(phone.trim())) {
            alert('Please enter a valid phone number (10-15 digits)');
            return false;
        }
        return true;
    };

    const handleStartTest = async () => {
        if (!validateUserInfo()) return;
        
        // Reset all states
        testCompletedRef.current = false;
        setTestStarted(true);
        setStartTime(Date.now());
        setUserAnswers([]);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setViolationCount(0);
        setHasSubmitted(false);
        setTimeLeft(3600);
        setSubmissionError('');
        setSubmissionSuccess('');
        
        await testBackendConnection();
    };

    const handleAnswerSelect = (answer) => {
        if (!testStarted || testCompletedRef.current) return;
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (!selectedAnswer || testCompletedRef.current) return;
        
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

        if (isCorrect) {
            setScore(s => s + 1);
        }

        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer('');
        } else {
            // Last question - auto submit
            handleTestCompletion();
        }
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const resetTest = () => {
        testCompletedRef.current = false;
        setUserName('');
        setEmail('');
        setPhone('');
        setTestStarted(false);
        setTestCompleted(false);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setScore(0);
        setUserAnswers([]);
        setTimeLeft(3600);
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
        return c === 'Logical' ? 'bg-blue-100 text-blue-800' :
            c === 'Technical' ? 'bg-purple-100 text-purple-800' :
            c === 'Reasoning' ? 'bg-indigo-100 text-indigo-800' :
            c === 'Soft Skills' ? 'bg-pink-100 text-pink-800' :
            'bg-gray-100 text-gray-800';
    };

    const getCategoryIcon = (c) => {
        switch(c) {
            case 'Logical': return <Brain size={16} className="mr-1" />;
            case 'Technical': return <Code size={16} className="mr-1" />;
            case 'Reasoning': return <Lightbulb size={16} className="mr-1" />;
            case 'Soft Skills': return <Users size={16} className="mr-1" />;
            default: return <BookOpen size={16} className="mr-1" />;
        }
    };

    const getBackendStatusColor = () => {
        return backendStatus === 'connected' ? 'bg-green-100 text-green-800' :
            backendStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800';
    };

    const getBackendStatusIcon = () => {
        return backendStatus === 'connected' ? <CheckCircle size={14} className="mr-1" /> :
            backendStatus === 'disconnected' ? <WifiOff size={14} className="mr-1" /> :
            <Activity size={14} className="mr-1" />;
    };

    const getBackendStatusText = () => {
        return backendStatus === 'connected' ? 'Connected' :
            backendStatus === 'disconnected' ? 'Offline Mode' :
            'Checking...';
    };

    const handleGoogleFormClick = () => {
        window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    };

    // Calculate category stats for results
    const getCategoryStats = () => {
        const stats = { Logical: { total: 0, correct: 0 }, Technical: { total: 0, correct: 0 }, Reasoning: { total: 0, correct: 0 }, 'Soft Skills': { total: 0, correct: 0 } };
        userAnswers.forEach(a => {
            if (stats[a.category]) {
                stats[a.category].total++;
                if (a.isCorrect) stats[a.category].correct++;
            }
        });
        return stats;
    };

    // START SCREEN
    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <ClipboardList size={48} className="text-blue-600" />
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">Aptitude Assessment Test</h1>
                            <p className="text-gray-600">Comprehensive evaluation of your skills</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">
                                    <User size={18} className="inline mr-2" /> Full Name *
                                </label>
                                <input type="text" value={userName} onChange={e => setUserName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">
                                    <Mail size={18} className="inline mr-2" /> Email *
                                </label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">
                                    <Phone size={18} className="inline mr-2" /> Phone Number *
                                </label>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+1234567890" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">
                                    <Filter size={18} className="inline mr-2" /> Test Category
                                </label>
                                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="all">All Categories ({aptitudeQuestions.length} Questions)</option>
                                    <option value="Logical">Logical Reasoning Only</option>
                                    <option value="Technical">Technical Only</option>
                                    <option value="Reasoning">Pure Reasoning Only</option>
                                    <option value="Soft Skills">Soft Skills Only</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <Brain size={32} className="text-blue-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-blue-600">{aptitudeQuestions.filter(q => q.category === 'Logical').length}</div>
                                <div className="text-blue-700 font-medium">Logical</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg text-center">
                                <Code size={32} className="text-purple-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-purple-600">{aptitudeQuestions.filter(q => q.category === 'Technical').length}</div>
                                <div className="text-purple-700 font-medium">Technical</div>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-lg text-center">
                                <Lightbulb size={32} className="text-indigo-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-indigo-600">{aptitudeQuestions.filter(q => q.category === 'Reasoning').length}</div>
                                <div className="text-indigo-700 font-medium">Reasoning</div>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg text-center">
                                <Users size={32} className="text-pink-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-pink-600">{aptitudeQuestions.filter(q => q.category === 'Soft Skills').length}</div>
                                <div className="text-pink-700 font-medium">Soft Skills</div>
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
                                <Shield size={20} className="mr-2" /> Security Measures:
                            </h3>
                            <ul className="list-disc list-inside text-red-700 space-y-1">
                                <li>Fullscreen mode is MANDATORY and enforced</li>
                                <li>Tab/window switching is PROHIBITED (records violation)</li>
                                <li>Right-click and developer tools are DISABLED</li>
                                <li>Keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+U) are BLOCKED</li>
                                <li>3 security violations will AUTO-SUBMIT your test</li>
                                <li>Leaving the test window triggers a violation</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                                <FileText size={20} className="mr-2" /> Test Information:
                            </h3>
                            <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Total Questions: {filteredQuestions.length}</li>
                                <li>Time Limit: 60 minutes (1 hour)</li>
                                <li>All questions are multiple choice</li>
                                <li>No negative marking</li>
                                <li>Results auto-saved locally and to server</li>
                            </ul>
                        </div>

                        {backendStatus === 'disconnected' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                <p className="text-yellow-700 text-center flex items-center justify-center">
                                    <WifiOff size={18} className="mr-2" />
                                    Backend server is offline. Test results will be saved locally and synced later.
                                </p>
                            </div>
                        )}

                        <button onClick={handleStartTest}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
                            disabled={backendStatus === 'checking'}>
                            {backendStatus === 'checking' ? (
                                <>
                                    <Activity size={20} className="animate-spin mr-2" />
                                    Checking Connection...
                                </>
                            ) : (
                                <>
                                    <Maximize2 size={20} className="mr-2" />
                                    Start Test
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // TEST IN PROGRESS
    if (testStarted && !testCompleted) {
        const currentQ = filteredQuestions[currentQuestion];
        
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Security Warning Bar */}
                    <div className="mb-4 bg-red-600 text-white px-4 py-2 rounded-lg text-center font-bold flex items-center justify-center">
                        <Shield size={18} className="mr-2" />
                        SECURITY MODE ACTIVE - Fullscreen Enforced | Violations: {violationCount}/3
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Test Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                            <ClipboardList size={24} className="mr-2" /> Aptitude Test
                                        </h2>
                                        <p className="text-gray-600 flex items-center mt-1">
                                            <User size={14} className="mr-1" /> Candidate: {userName}
                                        </p>
                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getBackendStatusColor()}`}>
                                            {getBackendStatusIcon()}
                                            {getBackendStatusText()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-gray-700 flex items-center">
                                            <Clock size={18} className="mr-1" />
                                            Time Left: <span className={timeLeft < 300 ? "text-red-600 font-bold ml-1" : "text-gray-800 ml-1"}>
                                                {formatTime(timeLeft)}
                                            </span>
                                        </div>
                                        <div className="text-gray-600">
                                            Question {currentQuestion + 1} of {filteredQuestions.length}
                                        </div>
                                        <div className="text-sm font-bold text-red-600 flex items-center justify-end">
                                            <AlertTriangle size={14} className="mr-1" />
                                            Violations: {violationCount}/3
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
                                            <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentQ.category)}`}>
                                                {getCategoryIcon(currentQ.category)}
                                                {currentQ.category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
                                                {currentQ.difficulty.toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            Q#{currentQ.id}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                                        {currentQ.question}
                                    </h3>

                                    <div className="space-y-3">
                                        {currentQ.options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswerSelect(option)}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${selectedAnswer === option
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                                    }`}
                                            >
                                                <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        onClick={() => {
                                            if (currentQuestion > 0) {
                                                setCurrentQuestion(prev => prev - 1);
                                                setSelectedAnswer('');
                                            }
                                        }}
                                        disabled={currentQuestion === 0}
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
                                    >
                                        <ChevronLeft size={18} className="mr-1" />
                                        Previous
                                    </button>

                                    <button
                                        onClick={handleNextQuestion}
                                        disabled={!selectedAnswer}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold flex items-center"
                                    >
                                        {currentQuestion === filteredQuestions.length - 1 ? (
                                            <>
                                                <Flag size={18} className="mr-1" />
                                                Finish Test
                                            </>
                                        ) : (
                                            <>
                                                Next Question
                                                <ChevronRight size={18} className="ml-1" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center justify-center">
                                        <Shield size={18} className="text-red-600 mr-2" />
                                        <span className="text-red-700 font-medium">
                                            DO NOT leave fullscreen or switch tabs! {violationCount > 0 ? `${3 - violationCount} violation(s) remaining before auto-submit.` : 'Stay focused!'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Ads */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-gradient-to-b from-blue-600 to-purple-700 rounded-2xl shadow-lg p-4 text-white">
                                <div className="text-center mb-3">
                                    <h3 className="font-bold text-sm mb-1">SS Training Center</h3>
                                    <p className="text-xs mb-2">AI-DATA ANALYTICS</p>
                                    <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                                        FORAGE CERTIFICATION
                                    </div>
                                </div>
                                <div className="text-xs space-y-1 mb-3">
                                    <p className="font-semibold text-yellow-300">TOPICS:</p>
                                    <p>• Excel, BI Tools, SQL</p>
                                    <p>• Python, Data Science</p>
                                    <p>• WebScraping, API</p>
                                </div>
                                <div className="bg-white text-blue-600 text-center py-1 rounded-lg text-xs font-bold mb-2">
                                    GRAB YOUR SEAT NOW!
                                </div>
                                <div className="text-center text-xs">
                                    <p className="font-semibold">Contact:</p>
                                    <p>9422129534 | 7719927774</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-b from-green-600 to-blue-700 rounded-2xl shadow-lg p-4 text-white">
                                <div className="text-center mb-3">
                                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-1">
                                        LAUNCHING SOON
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">ANSWERCRAFT</h3>
                                    <p className="text-xs mb-2">Get "HIRED" Skills</p>
                                </div>
                                <div className="text-xs space-y-1 mb-3">
                                    <p className="font-semibold text-yellow-300">YOU GET:</p>
                                    <p>• STAR+ Strategy</p>
                                    <p>• HR Question Handling</p>
                                    <p>• Interview Practice</p>
                                </div>
                                <div className="bg-yellow-400 text-black text-center py-1 rounded-lg text-xs font-bold mb-2">
                                    JOIN NOW!
                                </div>
                                <div className="text-center text-xs">
                                    <p>7719927774 | 7720846048</p>
                                    <p className="text-xs mt-1">skill2success.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // RESULTS SCREEN
    if (testCompleted) {
        const categoryStats = getCategoryStats();
        const percentage = ((score / filteredQuestions.length) * 100).toFixed(1);
        
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award size={40} className="text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Completed!</h1>
                            <p className="text-gray-600">Congratulations {userName} on completing the aptitude test!</p>

                            {submissionSuccess && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-700 flex items-center justify-center">
                                        <CheckCircle size={18} className="mr-2" />
                                        {submissionSuccess}
                                    </p>
                                </div>
                            )}

                            {submissionError && (
                                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-yellow-700 flex items-center justify-center">
                                        <AlertTriangle size={18} className="mr-2" />
                                        {submissionError}
                                    </p>
                                </div>
                            )}

                            {violationCount > 0 && (
                                <p className="text-orange-600 mt-2 font-semibold flex items-center justify-center">
                                    <AlertTriangle size={16} className="mr-1" />
                                    Note: {violationCount} security violation(s) were recorded during your test.
                                </p>
                            )}

                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getBackendStatusColor()}`}>
                                {getBackendStatusIcon()}
                                {getBackendStatusText()}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4">Your Overall Score</h2>
                            <div className="text-6xl font-bold mb-2">{score}/{filteredQuestions.length}</div>
                            <div className="text-2xl">{percentage}%</div>
                            <div className="text-sm mt-2 flex items-center justify-center">
                                <Clock size={14} className="mr-1" />
                                Time Taken: {formatTime(3600 - timeLeft)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            {Object.entries(categoryStats).map(([category, stats]) => (
                                stats.total > 0 && (
                                    <div key={category} className={`p-6 rounded-lg text-center ${
                                        category === 'Logical' ? 'bg-blue-50' :
                                        category === 'Technical' ? 'bg-purple-50' :
                                        category === 'Reasoning' ? 'bg-indigo-50' : 'bg-pink-50'
                                    }`}>
                                        <div className="flex justify-center mb-2">
                                            {category === 'Logical' && <Brain size={32} className="text-blue-600" />}
                                            {category === 'Technical' && <Code size={32} className="text-purple-600" />}
                                            {category === 'Reasoning' && <Lightbulb size={32} className="text-indigo-600" />}
                                            {category === 'Soft Skills' && <Users size={32} className="text-pink-600" />}
                                        </div>
                                        <div className={`text-3xl font-bold ${
                                            category === 'Logical' ? 'text-blue-600' :
                                            category === 'Technical' ? 'text-purple-600' :
                                            category === 'Reasoning' ? 'text-indigo-600' : 'text-pink-600'
                                        }`}>
                                            {stats.correct}/{stats.total}
                                        </div>
                                        <div className="font-medium text-gray-700">{category}</div>
                                        <div className="text-sm text-gray-500">{((stats.correct/stats.total)*100).toFixed(1)}%</div>
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center justify-center">
                                    <FileText size={20} className="mr-2" /> Next Step: Complete Online Test Form
                                </h3>
                                <p className="text-yellow-700 mb-4">
                                    Please click the button below to complete the official Google Form for your online test submission.
                                </p>
                                <button onClick={handleGoogleFormClick}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center mx-auto">
                                    <Send size={18} className="mr-2" />
                                    Complete Google Form
                                    <ExternalLink size={14} className="ml-2" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={resetTest}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center">
                                <ClipboardList size={18} className="mr-2" />
                                Take Test Again
                            </button>
                            <button onClick={() => window.print()}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center">
                                <Printer size={18} className="mr-2" />
                                Print Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return null;
};

export default AptitudeTest;