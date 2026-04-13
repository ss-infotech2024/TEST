import React, { useState, useEffect } from 'react';

// German Basics Questions Data - 30 MCQs
export const germanQuestions = [
    // Alphabet & Pronunciation (1-5)
    {
        id: 1,
        question: "What is the correct pronunciation of \"W\" in German?",
        options: ["V", "W", "F", "B"],
        correctAnswer: "V",
        category: "Alphabet & Pronunciation",
        difficulty: "easy",
        explanation: "In German, 'W' is pronounced like the English 'V' sound"
    },
    {
        id: 2,
        question: "How is \"Z\" pronounced in German?",
        options: ["Z", "S", "TS (tset)", "T"],
        correctAnswer: "TS (tset)",
        category: "Alphabet & Pronunciation",
        difficulty: "easy",
        explanation: "In German, 'Z' is pronounced as 'TS', like in the word 'pizza'"
    },
    {
        id: 3,
        question: "Which letter sounds like \"Y\" in English?",
        options: ["J", "Y", "G", "E"],
        correctAnswer: "J",
        category: "Alphabet & Pronunciation",
        difficulty: "easy",
        explanation: "The German 'J' is pronounced like the English 'Y' sound, as in 'yes'"
    },
    {
        id: 4,
        question: "What is the pronunciation of \"V\" in German (usually)?",
        options: ["V", "F", "W", "B"],
        correctAnswer: "F",
        category: "Alphabet & Pronunciation",
        difficulty: "easy",
        explanation: "In German, 'V' is usually pronounced like the English 'F' sound"
    },
    {
        id: 5,
        question: "Which letter is pronounced \"HA\"?",
        options: ["A", "H", "K", "R"],
        correctAnswer: "H",
        category: "Alphabet & Pronunciation",
        difficulty: "easy",
        explanation: "The German letter 'H' is pronounced 'HA'"
    },

    // Numbers (6-10)
    {
        id: 6,
        question: "What is \"5\" in German?",
        options: ["Vier", "Fünf", "Sechs", "Drei"],
        correctAnswer: "Fünf",
        category: "Numbers",
        difficulty: "easy",
        explanation: "Fünf = 5 in German"
    },
    {
        id: 7,
        question: "What is \"10\" in German?",
        options: ["Zehn", "Elf", "Zwölf", "Acht"],
        correctAnswer: "Zehn",
        category: "Numbers",
        difficulty: "easy",
        explanation: "Zehn = 10 in German"
    },
    {
        id: 8,
        question: "What is \"3\" in German?",
        options: ["Zwei", "Drei", "Vier", "Eins"],
        correctAnswer: "Drei",
        category: "Numbers",
        difficulty: "easy",
        explanation: "Drei = 3 in German"
    },
    {
        id: 9,
        question: "What is \"8\" in German?",
        options: ["Sieben", "Neun", "Acht", "Sechs"],
        correctAnswer: "Acht",
        category: "Numbers",
        difficulty: "easy",
        explanation: "Acht = 8 in German"
    },
    {
        id: 10,
        question: "What is \"1\" in German?",
        options: ["Eins", "Ein", "Eine", "Einen"],
        correctAnswer: "Eins",
        category: "Numbers",
        difficulty: "easy",
        explanation: "Eins = 1 (standalone number) in German"
    },

    // Basic Questions (11-15)
    {
        id: 11,
        question: "\"Wie heißt du?\" means:",
        options: ["Where do you live?", "What is your name?", "How are you?", "Where are you from?"],
        correctAnswer: "What is your name?",
        category: "Basic Questions",
        difficulty: "easy",
        explanation: "Wie heißt du? = What is your name?"
    },
    {
        id: 12,
        question: "\"Woher kommst du?\" means:",
        options: ["Where do you live?", "Where are you from?", "What is your name?", "What do you do?"],
        correctAnswer: "Where are you from?",
        category: "Basic Questions",
        difficulty: "easy",
        explanation: "Woher kommst du? = Where are you from?"
    },
    {
        id: 13,
        question: "\"Wo wohnst du?\" means:",
        options: ["Where do you live?", "Where are you from?", "What is your name?", "How old are you?"],
        correctAnswer: "Where do you live?",
        category: "Basic Questions",
        difficulty: "easy",
        explanation: "Wo wohnst du? = Where do you live?"
    },
    {
        id: 14,
        question: "Correct answer to \"Wie heißt du?\"",
        options: ["Ich komme aus Indien", "Ich wohne in Nagpur", "Ich heiße Rahul", "Ich bin 25 Jahre alt"],
        correctAnswer: "Ich heiße Rahul",
        category: "Basic Questions",
        difficulty: "easy",
        explanation: "To answer 'What is your name?', you say 'Ich heiße [Name]'"
    },
    {
        id: 15,
        question: "Correct answer to \"Woher kommst du?\"",
        options: ["Ich heiße Riya", "Ich komme aus Indien", "Ich wohne in Mumbai", "Ich bin Student"],
        correctAnswer: "Ich komme aus Indien",
        category: "Basic Questions",
        difficulty: "easy",
        explanation: "To answer 'Where are you from?', you say 'Ich komme aus [country]'"
    },

    // Months & Days (16-20)
    {
        id: 16,
        question: "What is \"January\" in German?",
        options: ["Februar", "Januar", "März", "April"],
        correctAnswer: "Januar",
        category: "Months & Days",
        difficulty: "easy",
        explanation: "Januar = January in German"
    },
    {
        id: 17,
        question: "What is \"Monday\" in German?",
        options: ["Dienstag", "Mittwoch", "Montag", "Freitag"],
        correctAnswer: "Montag",
        category: "Months & Days",
        difficulty: "easy",
        explanation: "Montag = Monday in German"
    },
    {
        id: 18,
        question: "What is \"Friday\" in German?",
        options: ["Samstag", "Sonntag", "Freitag", "Donnerstag"],
        correctAnswer: "Freitag",
        category: "Months & Days",
        difficulty: "easy",
        explanation: "Freitag = Friday in German"
    },
    {
        id: 19,
        question: "What is \"March\" in German?",
        options: ["Mai", "März", "Juni", "Juli"],
        correctAnswer: "März",
        category: "Months & Days",
        difficulty: "easy",
        explanation: "März = March in German"
    },
    {
        id: 20,
        question: "What is \"Sunday\" in German?",
        options: ["Samstag", "Montag", "Sonntag", "Dienstag"],
        correctAnswer: "Sonntag",
        category: "Months & Days",
        difficulty: "easy",
        explanation: "Sonntag = Sunday in German"
    },

    // Name, Spelling & Birthdate (21-25)
    {
        id: 21,
        question: "How do you say \"My name is Riya\"?",
        options: ["Ich komme aus Riya", "Ich heiße Riya", "Ich bin Riya", "Ich wohne Riya"],
        correctAnswer: "Ich heiße Riya",
        category: "Name, Spelling & Birthdate",
        difficulty: "easy",
        explanation: "Ich heiße = My name is / I am called"
    },
    {
        id: 22,
        question: "What does \"Auf Wiedersehen\" mean?",
        options: ["Hello", "Goodbye / See you again", "Thank you", "Please"],
        correctAnswer: "Goodbye / See you again",
        category: "Name, Spelling & Birthdate",
        difficulty: "easy",
        explanation: "Auf Wiedersehen = Goodbye / Until we meet again"
    },
    {
        id: 23,
        question: "How do you say \"My birthdate is 5th May\"?",
        options: ["Ich heiße 5 Mai", "Ich bin 5 Mai", "Mein Geburtstag ist am 5. Mai", "Ich komme am 5 Mai"],
        correctAnswer: "Mein Geburtstag ist am 5. Mai",
        category: "Name, Spelling & Birthdate",
        difficulty: "medium",
        explanation: "Mein Geburtstag ist am [date]. [Month] = My birthday is on [date]"
    },
    {
        id: 24,
        question: "What is \"April\" in German?",
        options: ["März", "Mai", "April", "Juni"],
        correctAnswer: "April",
        category: "Name, Spelling & Birthdate",
        difficulty: "easy",
        explanation: "April = April in German (same spelling!)"
    },
    {
        id: 25,
        question: "Correct way to say \"I live in Delhi\"",
        options: ["Ich komme in Delhi", "Ich wohne in Delhi", "Ich heiße Delhi", "Ich bin Delhi"],
        correctAnswer: "Ich wohne in Delhi",
        category: "Name, Spelling & Birthdate",
        difficulty: "easy",
        explanation: "Ich wohne in [city] = I live in [city]"
    },

    // Tricky Questions (26-29)
    {
        id: 26,
        question: "Which is the correct sentence?",
        options: ["Ich wohne aus Indien", "Ich komme in Indien", "Ich komme aus Indien", "Ich wohne aus Mumbai"],
        correctAnswer: "Ich komme aus Indien",
        category: "Tricky Questions",
        difficulty: "medium",
        explanation: "komme aus = come from. 'aus' is used with 'kommen', not 'wohnen'"
    },
    {
        id: 27,
        question: "Which is the correct sentence for \"I am from India and I live in Mumbai\"?",
        options: [
            "Ich komme in Indien und ich wohne aus Mumbai",
            "Ich komme aus Indien und ich wohne in Mumbai",
            "Ich wohne aus Indien und ich komme in Mumbai",
            "Ich bin aus Indien und ich wohne auf Mumbai"
        ],
        correctAnswer: "Ich komme aus Indien und ich wohne in Mumbai",
        category: "Tricky Questions",
        difficulty: "medium",
        explanation: "komme aus = from, wohne in = live in. Both prepositions must be correct"
    },
    {
        id: 28,
        question: "What is the correct question for this answer: \"Ich heiße Aman\"?",
        options: ["Wo wohnst du?", "Wie heißt du?", "Woher kommst du?", "Wie alt bist du?"],
        correctAnswer: "Wie heißt du?",
        category: "Tricky Questions",
        difficulty: "easy",
        explanation: "Wie heißt du? = What is your name? → Ich heiße Aman = My name is Aman"
    },
    {
        id: 29,
        question: "Which option is a correctly written birthdate in German?",
        options: [
            "Ich Geburtstag ist 10 Juni",
            "Mein Geburtstag ist 10. Juni",
            "Mein Geburtstag ist am 10. Juni",
            "Ich bin am 10 Juni Geburtstag"
        ],
        correctAnswer: "Mein Geburtstag ist am 10. Juni",
        category: "Tricky Questions",
        difficulty: "medium",
        explanation: "The correct structure is: Mein Geburtstag ist am [ordinal date]. [Month]"
    },

    // Easy Final Question (30)
    {
        id: 30,
        question: "What is \"Tuesday\" in German?",
        options: ["Montag", "Mittwoch", "Dienstag", "Freitag"],
        correctAnswer: "Dienstag",
        category: "Months & Days",
        difficulty: "easy",
        explanation: "Dienstag = Tuesday in German"
    }
];

const GermanTest = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
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
        ? germanQuestions
        : germanQuestions.filter(q => q.category === categoryFilter);

    const generateSubmissionId = () => {
        return 'german-sub-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    };

    const SUBMIT_ENDPOINT = 'https://ssinfotech-backend-k03q.onrender.com/api/submissions/submit';
    const HEALTH_ENDPOINTS = [
        'https://ssinfotech-backend-k03q.onrender.com/health',
        'https://ssinfotech-backend-k03q.onrender.com/api/health'
    ];

    const submitTestToBackend = async (submissionData) => {
        try {
            setSubmissionLoading(true);
            setSubmissionError('');
            setSubmissionSuccess('');

            const response = await fetch(SUBMIT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmissionSuccess('Your German test results have been successfully recorded!');
                setBackendStatus('connected');
                return { ...result, synced: true };
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
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
            const existing = JSON.parse(localStorage.getItem('germanTestSubmissions') || '[]');
            const existingSubmission = existing.find(sub => sub.submissionId === submission.submissionId);

            if (existingSubmission) {
                const updated = existing.map(sub =>
                    sub.submissionId === submission.submissionId
                        ? { ...submission, localSaveTime: new Date().toISOString(), syncedToBackend: synced }
                        : sub
                );
                localStorage.setItem('germanTestSubmissions', JSON.stringify(updated));
            } else {
                const newEntry = {
                    ...submission,
                    submissionId: submission.submissionId || generateSubmissionId(),
                    localSaveTime: new Date().toISOString(),
                    syncedToBackend: synced
                };
                existing.unshift(newEntry);
                localStorage.setItem('germanTestSubmissions', JSON.stringify(existing));
            }
        } catch (e) {
            console.error('localStorage error:', e);
        }
    };

    const syncPendingSubmissions = async () => {
        const pending = JSON.parse(localStorage.getItem('germanTestSubmissions') || '[]')
            .filter(s => !s.syncedToBackend);

        for (const sub of pending) {
            const result = await submitTestToBackend(sub);
            if (result.synced) {
                const updated = JSON.parse(localStorage.getItem('germanTestSubmissions') || '[]')
                    .map(s => s.submissionId === sub.submissionId ? { ...s, syncedToBackend: true } : s);
                localStorage.setItem('germanTestSubmissions', JSON.stringify(updated));
            }
        }
    };

    const enterFullscreen = () => {
        const elem = document.documentElement;
        (elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen)?.call(elem);
        setFullscreen(true);
    };

    const exitFullscreen = () => {
        (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen)?.call(document);
        setFullscreen(false);
    };

    const handleViolation = () => {
        const newCount = violationCount + 1;
        setViolationCount(newCount);
        if (newCount >= 3) {
            handleTestCompletion();
            alert('Test terminated due to multiple security violations!');
        } else {
            alert(`Security Warning ${newCount}/3: Do not attempt to leave the test environment!`);
        }
    };

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
            e.returnValue = 'Are you sure? Your test will be submitted.';
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

    useEffect(() => {
        if (!testStarted || testCompleted || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        if (timeLeft === 0) handleTestCompletion();
        return () => clearInterval(timer);
    }, [testStarted, testCompleted, timeLeft]);

    useEffect(() => {
        testBackendConnection();
        const interval = setInterval(() => {
            testBackendConnection();
            syncPendingSubmissions();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const validateUserInfo = () => {
        if (!userName.trim()) return alert('Please enter your name'), false;
        if (!email.trim()) return alert('Please enter your email'), false;
        if (!phone.trim()) return alert('Please enter your phone number'), false;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email address'), false;
        if (!/^[0-9+\-\s()]{10,}$/.test(phone)) return alert('Please enter a valid phone number'), false;
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
        const currentQ = filteredQuestions[currentQuestion];
        const isCorrect = selectedAnswer === currentQ.correctAnswer;

        setUserAnswers(prev => [...prev, {
            questionId: currentQ.id,
            question: currentQ.question,
            selectedAnswer,
            correctAnswer: currentQ.correctAnswer,
            isCorrect,
            difficulty: currentQ.difficulty,
            category: currentQ.category,
            explanation: currentQ.explanation
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
        if (hasSubmitted) return;
        setHasSubmitted(true);

        const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 1800 - timeLeft;

        const submissionData = {
            testType: 'german',
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

        saveToLocalStorage(submissionData, false);
        const result = await submitTestToBackend(submissionData);
        saveToLocalStorage(submissionData, result.synced);

        setTestCompleted(true);
        setTestStarted(false);
        exitFullscreen();
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const resetTest = () => {
        setUserName(''); setEmail(''); setPhone('');
        setTestStarted(false); setTestCompleted(false);
        setCurrentQuestion(0); setSelectedAnswer(''); setScore(0);
        setUserAnswers([]); setTimeLeft(1800); setCategoryFilter('all');
        setViolationCount(0); setSubmissionError(''); setSubmissionSuccess('');
        setBackendStatus('checking'); setHasSubmitted(false);
        testBackendConnection();
    };

    const getDifficultyColor = (d) =>
        d === 'medium' ? 'bg-yellow-100 text-yellow-800' :
        d === 'hard' ? 'bg-red-100 text-red-800' :
        'bg-green-100 text-green-800';

    const getCategoryColor = (c) => {
        const map = {
            'Alphabet & Pronunciation': 'bg-blue-100 text-blue-800',
            'Numbers': 'bg-purple-100 text-purple-800',
            'Basic Questions': 'bg-indigo-100 text-indigo-800',
            'Months & Days': 'bg-teal-100 text-teal-800',
            'Name, Spelling & Birthdate': 'bg-pink-100 text-pink-800',
            'Tricky Questions': 'bg-orange-100 text-orange-800',
        };
        return map[c] || 'bg-gray-100 text-gray-800';
    };

    const getBackendStatusColor = () =>
        backendStatus === 'connected' ? 'bg-green-100 text-green-800' :
        backendStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' :
        backendStatus === 'error' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800';

    const getBackendStatusText = () =>
        backendStatus === 'connected' ? '' :
        backendStatus === 'disconnected' ? 'Backend Offline' :
        backendStatus === 'error' ? 'Connection Error' :
        'Checking Status...';

    const getCategoryCounts = () => {
        const counts = {};
        germanQuestions.forEach(q => {
            counts[q.category] = (counts[q.category] || 0) + 1;
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    // === UI: START SCREEN ===
    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-black/5 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            {/* German flag stripe */}
                            <div className="flex justify-center gap-1 mb-4">
                                <div className="h-3 w-16 rounded bg-black"></div>
                                <div className="h-3 w-16 rounded bg-red-600"></div>
                                <div className="h-3 w-16 rounded bg-yellow-400"></div>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                🇩🇪 German Basics Test
                            </h1>
                            <p className="text-gray-600">Test your German language fundamentals — Alphabet, Numbers, Days, Months & Phrases</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" value={userName} onChange={e => setUserName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Email *</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="+1234567890" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Test Category</label>
                                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                                    <option value="all">All Categories ({germanQuestions.length} Questions)</option>
                                    {Object.entries(categoryCounts).map(([category, count]) => (
                                        <option key={category} value={category}>
                                            {category} ({count} Questions)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">Security Measures:</h3>
                            <ul className="list-disc list-inside text-red-700 space-y-1">
                                <li>Fullscreen mode will be enforced</li>
                                <li>Tab/window switching is prohibited</li>
                                <li>Right-click and developer tools are disabled</li>
                                <li>3 security violations will auto-submit your test</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Test Information:</h3>
                            <ul className="list-disc list-inside text-yellow-700 space-y-1">
                                <li>Total Questions: {filteredQuestions.length} MCQs</li>
                                <li>Time Limit: 30 minutes</li>
                                <li>Topics: Alphabet & Pronunciation, Numbers, Basic Questions, Months & Days, Birthdate Phrases</li>
                                <li>No negative marking</li>
                                <li>Your results will be saved automatically</li>
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
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={backendStatus === 'checking'}
                        >
                            {backendStatus === 'checking' ? 'Checking Connection...' : '🇩🇪 Start German Test'}
                        </button>

                        {backendStatus === 'disconnected' && (
                            <div className="mt-4 text-center">
                                <button onClick={testBackendConnection} className="text-red-600 hover:text-red-800 underline text-sm">
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
        const currentQ = filteredQuestions[currentQuestion];

        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-black/5 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">🇩🇪 German Basics Test</h2>
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
                            </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                            <div className="bg-red-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}></div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex gap-2 flex-wrap">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentQ.category)}`}>
                                        {currentQ.category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
                                        {currentQ.difficulty.toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">Q{currentQ.id}</span>
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
                                            ? 'border-red-500 bg-red-50 text-red-700'
                                            : 'border-gray-200 hover:border-red-300 hover:bg-red-25'
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
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
        );
    }

    // === UI: RESULTS SCREEN ===
    if (testCompleted) {
        const percentage = ((score / userAnswers.filter(a => a.type !== 'coding').length) * 100).toFixed(1);

        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-black/5 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            {/* German flag stripe */}
                            <div className="flex justify-center gap-1 mb-3">
                                <div className="h-2 w-12 rounded bg-black"></div>
                                <div className="h-2 w-12 rounded bg-red-600"></div>
                                <div className="h-2 w-12 rounded bg-yellow-400"></div>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">🇩🇪 German Test Completed!</h1>
                            <p className="text-gray-600">Congratulations {userName} on completing the German Basics test</p>

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
                        </div>

                        <div className="bg-gradient-to-r from-black via-red-700 to-yellow-500 rounded-2xl p-8 text-white text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4">Your German Test Score</h2>
                            <div className="text-5xl font-bold mb-2">{score}/{filteredQuestions.length}</div>
                            <div className="text-xl">Score: {percentage}%</div>
                            <div className="text-sm mt-2">Time Taken: {formatTime(1800 - timeLeft)}</div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Results</h3>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                                    <div><div className="text-2xl font-bold text-green-600">{score}</div><div className="text-gray-600">Correct</div></div>
                                    <div><div className="text-2xl font-bold text-red-600">{userAnswers.length - score}</div><div className="text-gray-600">Incorrect</div></div>
                                    <div><div className="text-2xl font-bold text-blue-600">{userAnswers.length}</div><div className="text-gray-600">Attempted</div></div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Question Review</h3>
                            <div className="space-y-4">
                                {userAnswers.map((answer, index) => (
                                    <div key={index} className={`border rounded-lg p-4 ${answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-semibold">Q{index + 1}: {answer.question}</span>
                                            <span className={`px-2 py-1 rounded text-xs ${answer.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                {answer.isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                                            </span>
                                        </div>
                                        <div className="text-sm">
                                            <p><strong>Your answer:</strong> {answer.selectedAnswer || '(not answered)'}</p>
                                            <p><strong>Correct answer:</strong> {answer.correctAnswer}</p>
                                            {answer.explanation && (
                                                <p className="mt-2 text-gray-600"><strong>Explanation:</strong> {answer.explanation}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={resetTest}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                Take Test Again
                            </button>
                            <button onClick={() => window.print()}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                Print Results
                            </button>
                        </div>

                        {backendStatus === 'disconnected' && (
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Your German test results are saved in your browser's local storage.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default GermanTest;