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
    const [timeLeft, setTimeLeft] = useState(1800);
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

    const SUBMIT_ENDPOINT = 'https://ssinfotech-0x5s.onrender.com/api/submissions/submit';
    const HEALTH_ENDPOINTS = [
        'https://ssinfotech-0x5s.onrender.com/health',
        'https://ssinfotech-0x5s.onrender.com/api/health'
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
        d === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200';

    const getCategoryColor = (c) => {
        const map = {
            'SQL Advanced': 'bg-blue-50 text-blue-700 border-blue-200',
            'PySpark Advanced': 'bg-purple-50 text-purple-700 border-purple-200',
            'Python Advanced': 'bg-indigo-50 text-indigo-700 border-indigo-200',
            'Big Data & Architecture': 'bg-teal-50 text-teal-700 border-teal-200',
        };
        return map[c] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    const getBackendStatusColor = () =>
        backendStatus === 'connected' ? 'bg-emerald-50 text-emerald-700' :
        backendStatus === 'disconnected' ? 'bg-amber-50 text-amber-700' : 'bg-gray-50 text-gray-700';

    const getBackendStatusText = () =>
        backendStatus === 'connected' ? 'Backend Connected' :
        backendStatus === 'disconnected' ? 'Backend Offline - Local Save Only' : 'Checking Connection...';

    const getCategoryCounts = () => {
        const counts = {};
        dataEngineeringQuestions.forEach(q => {
            counts[q.category] = (counts[q.category] || 0) + 1;
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    // Icon components (simple SVG replacements for emojis)
    const IconDatabase = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
            <path d="M4 6v12c0 1.66 2.69 3 8 3s8-1.34 8-3V6"></path>
            <path d="M4 12c0 1.66 2.69 3 8 3s8-1.34 8-3"></path>
        </svg>
    );

    const IconClock = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );

    const IconCheckCircle = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 16 16 12 12 8"></polyline>
            <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
    );

    const IconShield = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    );

    const IconBarChart = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
    );

    const IconUser = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

    const IconMail = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
    );

    const IconPhone = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    );

    const IconFilter = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3"></polygon>
        </svg>
    );

    const IconArrowRight = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    );

    const IconPrinter = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9V2h12v7"></path>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <path d="M6 14h12v8H6z"></path>
        </svg>
    );

    const IconRepeat = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 2l4 4-4 4"></path>
            <path d="M3 12v-2a4 4 0 0 1 4-4h14"></path>
            <path d="M7 22l-4-4 4-4"></path>
            <path d="M21 12v2a4 4 0 0 1-4 4H3"></path>
        </svg>
    );

    // Start Screen
    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                {/* Header bar */}
                <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                    <div className="max-w-5xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <IconDatabase />
                            </div>
                            <span className="font-semibold text-gray-900">Data Engineering Assessment</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm mb-4">
                                    <IconBarChart />
                                    <span>Advanced Certification</span>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    Data Engineering Proficiency Test
                                </h1>
                                <p className="text-gray-500 text-lg">
                                    SQL • PySpark • Python • Big Data Architecture
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="flex items-center gap-2">
                                            <IconUser />
                                            Full Name
                                        </span>
                                    </label>
                                    <input 
                                        type="text" 
                                        value={userName} 
                                        onChange={e => setUserName(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                        placeholder="John Doe" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="flex items-center gap-2">
                                            <IconMail />
                                            Email Address
                                        </span>
                                    </label>
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                        placeholder="john@example.com" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="flex items-center gap-2">
                                            <IconPhone />
                                            Phone Number
                                        </span>
                                    </label>
                                    <input 
                                        type="tel" 
                                        value={phone} 
                                        onChange={e => setPhone(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                                        placeholder="+1 (555) 000-0000" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="flex items-center gap-2">
                                            <IconFilter />
                                            Question Set
                                        </span>
                                    </label>
                                    <select 
                                        value={categoryFilter} 
                                        onChange={e => setCategoryFilter(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    >
                                        <option value="all">All Categories ({dataEngineeringQuestions.length} Questions)</option>
                                        {Object.entries(categoryCounts).map(([category, count]) => (
                                            <option key={category} value={category}>
                                                {category} ({count} Questions)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <IconShield />
                                        <h3 className="font-semibold text-amber-800">Security Measures</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-amber-700">
                                        <li className="flex items-center gap-2">• Fullscreen mode enforced</li>
                                        <li className="flex items-center gap-2">• Tab switching prohibited</li>
                                        <li className="flex items-center gap-2">• Developer tools disabled</li>
                                        <li className="flex items-center gap-2">• 3 violations will auto-submit</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <IconClock />
                                        <h3 className="font-semibold text-blue-800">Test Information</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-blue-700">
                                        <li className="flex items-center gap-2">• Total Questions: {filteredQuestions.length} MCQs</li>
                                        <li className="flex items-center gap-2">• Time Limit: 30 minutes</li>
                                        <li className="flex items-center gap-2">• No negative marking</li>
                                        <li className="flex items-center gap-2">• Results saved automatically</li>
                                    </ul>
                                </div>
                            </div>

                            {backendStatus === 'disconnected' && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                    <p className="text-amber-700 text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                        Backend offline. Results will be saved locally and synced when connection resumes.
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={handleStartTest}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                disabled={backendStatus === 'checking'}
                            >
                                {backendStatus === 'checking' ? 'Checking Connection...' : (
                                    <>
                                        Start Assessment
                                        <IconArrowRight />
                                    </>
                                )}
                            </button>

                            <div className="mt-6 text-center">
                                <span className={`inline-flex items-center gap-2 text-xs px-2 py-1 rounded ${getBackendStatusColor()}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${backendStatus === 'connected' ? 'bg-emerald-500' : backendStatus === 'disconnected' ? 'bg-amber-500' : 'bg-gray-400'}`}></span>
                                    {getBackendStatusText()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 text-xs mt-8">
                        <p>© Data Engineering Assessment Platform | Secure Testing Environment</p>
                    </div>
                </div>
            </div>
        );
    }

    // Test In Progress
    if (testStarted && !testCompleted) {
        const currentQ = filteredQuestions[currentQuestion];
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-20">
                    <div className="max-w-4xl mx-auto px-6 py-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                                    <IconDatabase />
                                </div>
                                <span className="font-medium text-gray-900">Data Engineering Test</span>
                                <span className="text-xs text-gray-400 ml-2">{userName}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <IconClock />
                                    <span className={timeLeft < 300 ? "text-red-600 font-medium" : "text-gray-600"}>
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <IconShield />
                                    <span className="text-sm">
                                        <span className={violationCount >= 2 ? "text-red-600 font-medium" : "text-gray-600"}>
                                            {violationCount}
                                        </span>
                                        <span className="text-gray-400">/3</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-6 py-10">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex gap-2 flex-wrap">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(currentQ.category)}`}>
                                        {currentQ.category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(currentQ.difficulty)}`}>
                                        {currentQ.difficulty.toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Question {currentQuestion + 1} of {filteredQuestions.length}
                                </div>
                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-1 mb-8">
                                <div 
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full transition-all duration-300" 
                                    style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
                                ></div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                                {currentQ.question}
                            </h3>

                            <div className="space-y-3">
                                {currentQ.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(option)}
                                        className={`w-full text-left p-4 rounded-lg border transition-all duration-150 ${
                                            selectedAnswer === option
                                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                                selectedAnswer === option
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <span className="text-gray-700 flex-1">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNextQuestion}
                                disabled={!selectedAnswer}
                                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:from-blue-700 hover:to-purple-700"
                            >
                                {currentQuestion === filteredQuestions.length - 1 ? 'Submit Test' : 'Next Question'}
                            </button>
                        </div>
                    </div>

                    <div className="text-center text-xs text-gray-400 mt-6">
                        <p>Security active • Do not switch tabs or exit fullscreen</p>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (testCompleted) {
        const percentage = ((score / filteredQuestions.length) * 100).toFixed(1);

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                    <div className="max-w-6xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <IconDatabase />
                            </div>
                            <span className="font-semibold text-gray-900">Assessment Results</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 text-center border-b border-gray-100">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconCheckCircle />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Assessment Completed</h1>
                            <p className="text-gray-500 mt-1">Congratulations, {userName}!</p>
                        </div>

                        {submissionSuccess && (
                            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 m-6 rounded">
                                <p className="text-emerald-700 text-sm">{submissionSuccess}</p>
                            </div>
                        )}
                        {submissionError && (
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 m-6 rounded">
                                <p className="text-amber-700 text-sm">{submissionError}</p>
                            </div>
                        )}

                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center p-10 m-6 rounded-xl">
                            <h2 className="text-lg font-medium opacity-90 mb-2">Your Score</h2>
                            <div className="text-6xl font-bold mb-2">{score} / {filteredQuestions.length}</div>
                            <div className="text-2xl opacity-90">{percentage}%</div>
                            <div className="mt-4 text-sm opacity-75 flex items-center justify-center gap-2">
                                <IconClock />
                                Time taken: {formatTime(1800 - timeLeft)}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h3>
                            <div className="space-y-4">
                                {userAnswers.map((answer, index) => (
                                    <div 
                                        key={index} 
                                        className={`border rounded-lg p-5 ${
                                            answer.isCorrect 
                                                ? 'bg-emerald-50 border-emerald-200' 
                                                : 'bg-red-50 border-red-200'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                                        answer.isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'
                                                    }`}>
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-medium text-gray-900">{answer.question}</span>
                                                </div>
                                                <div className="mt-2 text-sm space-y-1">
                                                    <p><span className="text-gray-500">Your answer:</span> {answer.selectedAnswer || 'Not answered'}</p>
                                                    <p><span className="text-gray-500">Correct answer:</span> <span className="font-medium text-gray-900">{answer.correctAnswer}</span></p>
                                                    {answer.explanation && (
                                                        <p className="mt-2 text-gray-600 text-sm bg-white/50 p-2 rounded">
                                                            {answer.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                {answer.isCorrect ? (
                                                    <IconCheckCircle />
                                                ) : (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={resetTest} 
                                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <IconRepeat />
                                Take Again
                            </button>
                            <button 
                                onClick={() => window.print()} 
                                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <IconPrinter />
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