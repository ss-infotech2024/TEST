import React, { useState, useEffect } from 'react';

// Advanced Data Engineering Questions (30 MCQs)
export const dataEngineeringQuestions = [
    // Section 1: SQL Advanced (1-10)
    {
        id: 1,
        question: "You need to find the 2nd highest salary per department. Which approach is best?",
        options: [
            "GROUP BY with MAX()",
            "ORDER BY with LIMIT 2",
            "ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)",
            "DISTINCT with ORDER BY"
        ],
        correctAnswer: "ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)",
        category: "SQL Advanced",
        difficulty: "medium",
        explanation: "ROW_NUMBER() with PARTITION BY and filtering on rn = 2 is the standard way to find nth highest salary per group."
    },
    {
        id: 2,
        question: "What happens if you use WHERE with aggregate functions?",
        options: ["Works normally", "Throws error", "Filters after aggregation", "Same as HAVING"],
        correctAnswer: "Throws error",
        category: "SQL Advanced",
        difficulty: "easy",
        explanation: "WHERE filters rows before GROUP BY. Aggregate functions cannot be used in WHERE clause."
    },
    {
        id: 3,
        question: "You want only departments where total sales > 10,000. Which clause?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correctAnswer: "HAVING",
        category: "SQL Advanced",
        difficulty: "easy",
        explanation: "HAVING filters groups after aggregation."
    },
    {
        id: 4,
        question: "Which join will return all records even if there is no match in both tables?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correctAnswer: "FULL OUTER JOIN",
        category: "SQL Advanced",
        difficulty: "medium",
        explanation: "FULL OUTER JOIN returns all rows from both tables with NULLs where no match exists."
    },
    {
        id: 5,
        question: "What does this query do? ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC)",
        options: ["Removes duplicates", "Assigns ranking per customer", "Groups data", "Filters data"],
        correctAnswer: "Assigns ranking per customer",
        category: "SQL Advanced",
        difficulty: "medium",
        explanation: "It assigns a unique rank to each row within each customer partition."
    },
    {
        id: 6,
        question: "Which is best for removing column-level duplicates?",
        options: ["DISTINCT", "GROUP BY", "ROW_NUMBER() with filter", "ORDER BY"],
        correctAnswer: "ROW_NUMBER() with filter",
        category: "SQL Advanced",
        difficulty: "medium",
        explanation: "ROW_NUMBER() + WHERE rn = 1 is the most flexible way to deduplicate keeping specific records."
    },
    {
        id: 7,
        question: "What is the main benefit of CTEs?",
        options: ["Faster execution", "Reduce joins", "Improve readability and modular queries", "Store data permanently"],
        correctAnswer: "Improve readability and modular queries",
        category: "SQL Advanced",
        difficulty: "easy",
        explanation: "CTEs make complex queries more readable and easier to maintain."
    },
    {
        id: 8,
        question: "Which operation is most expensive in distributed SQL systems?",
        options: ["SELECT", "FILTER", "JOIN (shuffle)", "LIMIT"],
        correctAnswer: "JOIN (shuffle)",
        category: "SQL Advanced",
        difficulty: "medium",
        explanation: "Joins often require shuffling data across the cluster, making them expensive."
    },
    {
        id: 9,
        question: "Which technique improves query performance?",
        options: ["SELECT *", "Column pruning", "Nested subqueries everywhere", "Removing indexes"],
        correctAnswer: "Column pruning",
        category: "SQL Advanced",
        difficulty: "easy",
        explanation: "Reading only required columns reduces I/O significantly."
    },
    {
        id: 10,
        question: "Which is true about indexing?",
        options: ["Slows down SELECT", "Improves read performance", "Only works on small tables", "Used only for joins"],
        correctAnswer: "Improves read performance",
        category: "SQL Advanced",
        difficulty: "easy",
        explanation: "Indexes speed up SELECT, WHERE, and JOIN operations."
    },

    // Section 2: PySpark Advanced (11-20)
    {
        id: 11,
        question: "Why is Spark faster than Hadoop MapReduce?",
        options: ["Uses more CPU", "Uses in-memory processing", "Uses SQL", "Uses Python"],
        correctAnswer: "Uses in-memory processing",
        category: "PySpark Advanced",
        difficulty: "easy",
        explanation: "Spark processes data in memory, reducing disk I/O compared to MapReduce."
    },
    {
        id: 12,
        question: "What triggers execution in Spark?",
        options: ["Transformation", "Action", "Schema", "Partition"],
        correctAnswer: "Action",
        category: "PySpark Advanced",
        difficulty: "easy",
        explanation: "Actions (show, count, write, etc.) trigger the actual computation in Spark."
    },
    {
        id: 13,
        question: "Which optimization avoids shuffle during joins?",
        options: ["Repartition", "Broadcast Join", "Cache", "Coalesce"],
        correctAnswer: "Broadcast Join",
        category: "PySpark Advanced",
        difficulty: "medium",
        explanation: "Broadcast Join is used when one table is small and can be sent to all nodes."
    },
    {
        id: 14,
        question: "What happens when you call df.cache()?",
        options: ["Writes to disk", "Stores in memory", "Deletes data", "Repartitions data"],
        correctAnswer: "Stores in memory",
        category: "PySpark Advanced",
        difficulty: "easy",
        explanation: "cache() stores the DataFrame in memory for faster reuse."
    },
    {
        id: 15,
        question: "When should you use repartition()?",
        options: ["Reduce partitions", "Increase or rebalance partitions", "Remove duplicates", "Sort data"],
        correctAnswer: "Increase or rebalance partitions",
        category: "PySpark Advanced",
        difficulty: "medium",
        explanation: "repartition() is used to increase or rebalance the number of partitions."
    },
    {
        id: 16,
        question: "Difference between repartition() and coalesce()?",
        options: ["Both same", "repartition reduces only", "coalesce avoids shuffle when reducing", "coalesce increases partitions"],
        correctAnswer: "coalesce avoids shuffle when reducing",
        category: "PySpark Advanced",
        difficulty: "medium",
        explanation: "coalesce() reduces partitions without full shuffle."
    },
    {
        id: 17,
        question: "Which operation causes data shuffle?",
        options: ["select()", "filter()", "groupBy()", "drop()"],
        correctAnswer: "groupBy()",
        category: "PySpark Advanced",
        difficulty: "medium",
        explanation: "groupBy(), join(), and distinct() usually cause shuffle."
    },
    {
        id: 18,
        question: "What is predicate pushdown?",
        options: ["Filtering after read", "Filtering at source level", "Sorting data", "Partitioning data"],
        correctAnswer: "Filtering at source level",
        category: "PySpark Advanced",
        difficulty: "medium",
        explanation: "Predicate pushdown filters data at the storage level before reading."
    },
    {
        id: 19,
        question: "Which file format is best for analytics?",
        options: ["CSV", "JSON", "Parquet", "TXT"],
        correctAnswer: "Parquet",
        category: "PySpark Advanced",
        difficulty: "easy",
        explanation: "Parquet is columnar, compressed, and supports predicate pushdown."
    },
    {
        id: 20,
        question: "What is schema inference drawback?",
        options: ["Faster processing", "Extra computation overhead", "Better performance", "No impact"],
        correctAnswer: "Extra computation overhead",
        category: "PySpark Advanced",
        difficulty: "medium",
        explanation: "Schema inference requires scanning data, adding overhead."
    },

    // Section 3: Python Advanced (21-25)
    {
        id: 21,
        question: "What is the output? x = [1,2,3]; print(x*2)",
        options: ["[1,2,3,1,2,3]", "[2,4,6]", "Error", "None"],
        correctAnswer: "[1,2,3,1,2,3]",
        category: "Python Advanced",
        difficulty: "easy",
        explanation: "List multiplication repeats the list."
    },
    {
        id: 22,
        question: "What does this return? list(map(lambda x: x*2, [1,2,3]))",
        options: ["[1,2,3]", "[2,4,6]", "Error", "None"],
        correctAnswer: "[2,4,6]",
        category: "Python Advanced",
        difficulty: "easy",
        explanation: "map applies the lambda to each element."
    },
    {
        id: 23,
        question: "Which is faster for large data?",
        options: ["for loop", "list comprehension", "recursion", "print()"],
        correctAnswer: "list comprehension",
        category: "Python Advanced",
        difficulty: "medium",
        explanation: "List comprehensions are generally faster than for loops."
    },
    {
        id: 24,
        question: "What does try-except do?",
        options: ["Loop control", "Error handling", "Function call", "Sorting"],
        correctAnswer: "Error handling",
        category: "Python Advanced",
        difficulty: "easy",
        explanation: "try-except is used for exception handling."
    },
    {
        id: 25,
        question: "Which library is used for tabular data?",
        options: ["NumPy", "Pandas", "Matplotlib", "OS"],
        correctAnswer: "Pandas",
        category: "Python Advanced",
        difficulty: "easy",
        explanation: "Pandas is the standard library for tabular data in Python."
    },

    // Section 4: Big Data & Architecture (26-30)
    {
        id: 26,
        question: "Why is data partitioning important?",
        options: ["Reduce storage", "Improve parallelism", "Reduce schema", "Increase redundancy"],
        correctAnswer: "Improve parallelism",
        category: "Big Data & Architecture",
        difficulty: "medium",
        explanation: "Partitioning enables parallel processing across nodes."
    },
    {
        id: 27,
        question: "What is data locality?",
        options: ["Data stored centrally", "Processing near data", "Remote execution", "Backup storage"],
        correctAnswer: "Processing near data",
        category: "Big Data & Architecture",
        difficulty: "medium",
        explanation: "Processing tasks run on nodes where data is already located."
    },
    {
        id: 28,
        question: "Which system supports real-time processing?",
        options: ["Hadoop MapReduce", "Spark Streaming", "Hive", "Pig"],
        correctAnswer: "Spark Streaming",
        category: "Big Data & Architecture",
        difficulty: "medium",
        explanation: "Spark Streaming enables real-time data processing."
    },
    {
        id: 29,
        question: "What is fault tolerance in Spark?",
        options: ["Backup storage", "Lineage-based recomputation", "Replication only", "Caching"],
        correctAnswer: "Lineage-based recomputation",
        category: "Big Data & Architecture",
        difficulty: "medium",
        explanation: "Spark uses lineage to recompute lost data."
    },
    {
        id: 30,
        question: "Which architecture uses Bronze, Silver, Gold layers?",
        options: ["Data Warehouse", "Data Lake", "Medallion Architecture", "OLTP"],
        correctAnswer: "Medallion Architecture",
        category: "Big Data & Architecture",
        difficulty: "medium",
        explanation: "Medallion Architecture organizes data in Bronze → Silver → Gold layers."
    }
];

const DataEngineeringTest = () => {
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
        ? dataEngineeringQuestions
        : dataEngineeringQuestions.filter(q => q.category === categoryFilter);

    const generateSubmissionId = () => {
        return 'data-eng-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
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
                setSubmissionSuccess('Your Data Engineering test results have been successfully recorded!');
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
            const existing = JSON.parse(localStorage.getItem('dataEngineeringSubmissions') || '[]');
            const existingSubmission = existing.find(sub => sub.submissionId === submission.submissionId);
            if (existingSubmission) {
                const updated = existing.map(sub =>
                    sub.submissionId === submission.submissionId
                        ? { ...submission, localSaveTime: new Date().toISOString(), syncedToBackend: synced }
                        : sub
                );
                localStorage.setItem('dataEngineeringSubmissions', JSON.stringify(updated));
            } else {
                const newEntry = {
                    ...submission,
                    submissionId: submission.submissionId || generateSubmissionId(),
                    localSaveTime: new Date().toISOString(),
                    syncedToBackend: synced
                };
                existing.unshift(newEntry);
                localStorage.setItem('dataEngineeringSubmissions', JSON.stringify(existing));
            }
        } catch (e) {
            console.error('localStorage error:', e);
        }
    };

    const syncPendingSubmissions = async () => {
        const pending = JSON.parse(localStorage.getItem('dataEngineeringSubmissions') || '[]')
            .filter(s => !s.syncedToBackend);
        for (const sub of pending) {
            const result = await submitTestToBackend(sub);
            if (result.synced) {
                const updated = JSON.parse(localStorage.getItem('dataEngineeringSubmissions') || '[]')
                    .map(s => s.submissionId === sub.submissionId ? { ...s, syncedToBackend: true } : s);
                localStorage.setItem('dataEngineeringSubmissions', JSON.stringify(updated));
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
            if (e.key === 'Escape' || e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
                (e.ctrlKey && e.key === 'u')) {
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
            testType: 'data-engineering',
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
        d === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';

    const getCategoryColor = (c) => {
        const map = {
            'SQL Advanced': 'bg-blue-100 text-blue-800',
            'PySpark Advanced': 'bg-purple-100 text-purple-800',
            'Python Advanced': 'bg-indigo-100 text-indigo-800',
            'Big Data & Architecture': 'bg-teal-100 text-teal-800',
        };
        return map[c] || 'bg-gray-100 text-gray-800';
    };

    const getBackendStatusColor = () =>
        backendStatus === 'connected' ? 'bg-green-100 text-green-800' :
        backendStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800';

    const getBackendStatusText = () =>
        backendStatus === 'connected' ? '' :
        backendStatus === 'disconnected' ? 'Backend Offline' : 'Checking Status...';

    const getCategoryCounts = () => {
        const counts = {};
        dataEngineeringQuestions.forEach(q => {
            counts[q.category] = (counts[q.category] || 0) + 1;
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    // ====================== UI RENDERING ======================

    // Start Screen
    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <div className="flex justify-center gap-1 mb-4">
                                <div className="h-3 w-16 rounded bg-blue-600"></div>
                                <div className="h-3 w-16 rounded bg-indigo-600"></div>
                                <div className="h-3 w-16 rounded bg-purple-600"></div>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                💾 Advanced Data Engineering Test
                            </h1>
                            <p className="text-gray-600">SQL + PySpark + Python + Big Data Architecture (30 MCQs)</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" value={userName} onChange={e => setUserName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Email *</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="+91 9876543210" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Test Category</label>
                                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                    <option value="all">All Categories ({dataEngineeringQuestions.length} Questions)</option>
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
                                <li>Fullscreen mode enforced</li>
                                <li>Tab switching prohibited</li>
                                <li>Developer tools disabled</li>
                                <li>3 violations will auto-submit test</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Test Information:</h3>
                            <ul className="list-disc list-inside text-yellow-700 space-y-1">
                                <li>Total Questions: {filteredQuestions.length} MCQs</li>
                                <li>Time Limit: 30 minutes</li>
                                <li>No negative marking</li>
                                <li>Results saved automatically</li>
                            </ul>
                        </div>

                        {backendStatus === 'disconnected' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
                                <p className="text-yellow-700">Backend offline. Results will be saved locally.</p>
                            </div>
                        )}

                        <button
                            onClick={handleStartTest}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg"
                            disabled={backendStatus === 'checking'}
                        >
                            {backendStatus === 'checking' ? 'Checking Connection...' : '🚀 Start Data Engineering Test'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Test In Progress
    if (testStarted && !testCompleted) {
        const currentQ = filteredQuestions[currentQuestion];
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">💾 Data Engineering Test</h2>
                                <p className="text-gray-600">Candidate: {userName}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold">
                                    Time Left: <span className={timeLeft < 300 ? "text-red-600" : ""}>{formatTime(timeLeft)}</span>
                                </div>
                                <div>Question {currentQuestion + 1} of {filteredQuestions.length}</div>
                                <div className="text-red-600">Violations: {violationCount}/3</div>
                            </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                            <div className="bg-indigo-600 h-2 rounded-full transition-all" 
                                style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}></div>
                        </div>

                        <div className="mb-8">
                            <div className="flex gap-2 flex-wrap mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(currentQ.category)}`}>
                                    {currentQ.category}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(currentQ.difficulty)}`}>
                                    {currentQ.difficulty.toUpperCase()}
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-6">{currentQ.question}</h3>

                            <div className="space-y-3">
                                {currentQ.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(option)}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedAnswer === option
                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                            : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                                        }`}
                                    >
                                        <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleNextQuestion}
                            disabled={!selectedAnswer}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                        >
                            {currentQuestion === filteredQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
                        </button>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            Security Active • Do not switch tabs or exit fullscreen
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (testCompleted) {
        const percentage = ((score / filteredQuestions.length) * 100).toFixed(1);

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">✅</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800">Data Engineering Test Completed!</h1>
                            <p className="text-gray-600 mt-2">Congratulations {userName}!</p>
                        </div>

                        {submissionSuccess && <div className="bg-green-50 p-4 rounded-lg text-green-700 mb-6">{submissionSuccess}</div>}
                        {submissionError && <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 mb-6">{submissionError}</div>}

                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-10 text-center mb-8">
                            <h2 className="text-2xl mb-4">Your Score</h2>
                            <div className="text-7xl font-bold mb-2">{score} / {filteredQuestions.length}</div>
                            <div className="text-2xl">{percentage}%</div>
                            <div className="mt-4">Time Taken: {formatTime(1800 - timeLeft)}</div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4">Detailed Results</h3>
                            <div className="space-y-4">
                                {userAnswers.map((answer, index) => (
                                    <div key={index} className={`border rounded-lg p-5 ${answer.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                        <div className="flex justify-between">
                                            <strong>Q{index + 1}: {answer.question}</strong>
                                            <span className={`px-3 py-1 rounded text-xs font-medium ${answer.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                {answer.isCorrect ? 'CORRECT' : 'INCORRECT'}
                                            </span>
                                        </div>
                                        <div className="mt-3 text-sm">
                                            <p><strong>Your Answer:</strong> {answer.selectedAnswer || 'Not answered'}</p>
                                            <p><strong>Correct Answer:</strong> {answer.correctAnswer}</p>
                                            {answer.explanation && <p className="mt-2 text-gray-600"><strong>Explanation:</strong> {answer.explanation}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={resetTest} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-lg">
                                Take Test Again
                            </button>
                            <button onClick={() => window.print()} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg">
                                Print Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default DataEngineeringTest;