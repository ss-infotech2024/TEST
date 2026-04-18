import React, { useState, useEffect } from 'react';

// Advanced Data Engineering Questions (30 MCQs)
export const dataEngineeringQuestions = [
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
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes = 3600 seconds
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [violationCount, setViolationCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [backendStatus, setBackendStatus] = useState('checking');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const filteredQuestions = categoryFilter === 'all'
        ? dataEngineeringQuestions
        : dataEngineeringQuestions.filter(q => q.category === categoryFilter);

    const generateSubmissionId = () => {
        return 'data-eng-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    };

    const SUBMIT_ENDPOINT = 'https://ssinfotech-0x5s.onrender.com/api/submissions/submit';

    const submitTestToBackend = async (submissionData) => {
        try {
            const response = await fetch(SUBMIT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });
            const result = await response.json();
            if (response.ok && result.success) {
                setBackendStatus('connected');
                return { synced: true };
            }
            throw new Error('Submission failed');
        } catch (error) {
            setBackendStatus('disconnected');
            return { synced: false };
        }
    };

    const saveToLocalStorage = (submission, synced = false) => {
        try {
            const existing = JSON.parse(localStorage.getItem('dataEngineeringSubmissions') || '[]');
            const newEntry = {
                ...submission,
                localSaveTime: new Date().toISOString(),
                syncedToBackend: synced
            };
            existing.unshift(newEntry);
            localStorage.setItem('dataEngineeringSubmissions', JSON.stringify(existing));
        } catch (e) {
            console.error('localStorage error:', e);
        }
    };

    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const handleViolation = () => {
        if (!testStarted || testCompleted) return;
        const newCount = violationCount + 1;
        setViolationCount(newCount);
        if (newCount >= 3) {
            handleTestCompletion();
        }
    };

    useEffect(() => {
        if (!testStarted || testCompleted) return;

        const visibilityHandler = () => {
            if (document.hidden) handleViolation();
        };
        const blurHandler = () => handleViolation();
        const fullscreenHandler = () => {
            if (!document.fullscreenElement && testStarted && !testCompleted) {
                handleViolation();
            }
        };
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
            e.returnValue = '';
        };

        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('blur', blurHandler);
        document.addEventListener('fullscreenchange', fullscreenHandler);
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('contextmenu', contextMenuHandler);
        window.addEventListener('beforeunload', beforeUnloadHandler);

        enterFullscreen();

        return () => {
            document.removeEventListener('visibilitychange', visibilityHandler);
            window.removeEventListener('blur', blurHandler);
            document.removeEventListener('fullscreenchange', fullscreenHandler);
            document.removeEventListener('keydown', keydownHandler);
            document.removeEventListener('contextmenu', contextMenuHandler);
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            if (testCompleted) exitFullscreen();
        };
    }, [testStarted, testCompleted, violationCount]);

    useEffect(() => {
        if (!testStarted || testCompleted || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTestCompletion();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [testStarted, testCompleted]);

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
            alert('Please enter a valid email address');
            return false;
        }
        if (!/^[0-9+\-\s()]{10,}$/.test(phone)) {
            alert('Please enter a valid phone number (minimum 10 digits)');
            return false;
        }
        return true;
    };

    const handleStartTest = () => {
        if (!validateUserInfo()) {
            return;
        }
        setTestStarted(true);
        setStartTime(Date.now());
        setUserAnswers([]);
        setScore(0);
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setViolationCount(0);
        setHasSubmitted(false);
        setTimeLeft(3600); // Reset to 60 minutes
    };

    const handleAnswerSelect = (answer) => setSelectedAnswer(answer);

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            // Load previously selected answer for the question
            const previousAnswer = userAnswers[currentQuestion - 1];
            setSelectedAnswer(previousAnswer ? previousAnswer.selectedAnswer : '');
        }
    };

    const handleNextQuestion = () => {
        if (!selectedAnswer) {
            alert('Please select an answer before proceeding');
            return;
        }

        const currentQ = filteredQuestions[currentQuestion];
        const isCorrect = selectedAnswer === currentQ.correctAnswer;

        // Update userAnswers
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = {
            questionId: currentQ.id,
            question: currentQ.question,
            selectedAnswer,
            correctAnswer: currentQ.correctAnswer,
            isCorrect,
            category: currentQ.category,
            explanation: currentQ.explanation
        };
        
        setUserAnswers(updatedAnswers);

        // Update score
        let newScore = 0;
        updatedAnswers.forEach(answer => {
            if (answer && answer.isCorrect) newScore++;
        });
        setScore(newScore);

        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            // Load previously selected answer for the next question if exists
            const nextAnswer = updatedAnswers[currentQuestion + 1];
            setSelectedAnswer(nextAnswer ? nextAnswer.selectedAnswer : '');
        } else {
            handleTestCompletion();
        }
    };

    const handleTestCompletion = async () => {
        if (hasSubmitted) return;
        setHasSubmitted(true);

        const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 3600 - timeLeft;

        const submissionData = {
            testType: 'data-engineering',
            userName: userName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            score,
            totalQuestions: filteredQuestions.length,
            userAnswers: userAnswers.filter(a => a !== undefined),
            violationCount,
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
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        setTimeLeft(3600);
        setCategoryFilter('all');
        setViolationCount(0);
        setHasSubmitted(false);
        setStartTime(null);
    };

    const getCategoryCounts = () => {
        const counts = {};
        dataEngineeringQuestions.forEach(q => {
            counts[q.category] = (counts[q.category] || 0) + 1;
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    const toolsData = [
        { name: 'Apache Spark', icon: '⚡', description: 'Unified analytics engine for large-scale data processing' },
        { name: 'Databricks', icon: '🔷', description: 'Unified data analytics platform' },
        { name: 'Delta Lake', icon: '📊', description: 'Open format storage layer' },
        { name: 'SQL Analytics', icon: '📈', description: 'Advanced query optimization' }
    ];

    // Progress percentage
    const answeredCount = userAnswers.filter(a => a !== undefined).length;
    const progressPercentage = (answeredCount / filteredQuestions.length) * 100;

    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    Data Engineering Test
                                </h1>
                                <p className="text-gray-500 text-lg">
                                    Master SQL, PySpark, Python & Big Data Architecture
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={userName} 
                                        onChange={e => setUserName(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="John Doe" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="john@example.com" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        value={phone} 
                                        onChange={e => setPhone(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="+1 (555) 000-0000" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Question Set</label>
                                    <select 
                                        value={categoryFilter} 
                                        onChange={e => setCategoryFilter(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                {toolsData.map((tool, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                                        <div className="text-2xl mb-2">{tool.icon}</div>
                                        <div className="font-medium text-gray-900 text-sm">{tool.name}</div>
                                        <div className="text-xs text-gray-500 mt-1">{tool.description}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span>🛡️</span>
                                        <h3 className="font-semibold text-amber-800">Security</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-amber-700">
                                        <li>• Fullscreen mode enforced</li>
                                        <li>• Tab switching prohibited</li>
                                        <li>• 3 violations auto-submit</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span>⏱️</span>
                                        <h3 className="font-semibold text-blue-800">Test Details</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-blue-700">
                                        <li>• {filteredQuestions.length} MCQs</li>
                                        <li>• 60 minutes time limit</li>
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={handleStartTest}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                            >
                                Start Test →
                            </button>

                            <div className="mt-6 text-center text-xs text-gray-400">
                                <span className={`inline-flex items-center gap-2 px-2 py-1 rounded ${backendStatus === 'connected' ? 'text-green-600' : 'text-amber-600'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${backendStatus === 'connected' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                    {backendStatus === 'connected' ? 'Ready' : backendStatus === 'disconnected' ? 'Offline Mode' : 'Connecting...'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (testStarted && !testCompleted) {
        const currentQ = filteredQuestions[currentQuestion];
        const isLastQuestion = currentQuestion === filteredQuestions.length - 1;
        const isFirstQuestion = currentQuestion === 0;
        
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="sticky top-0 bg-white border-b border-gray-200 z-20">
                    <div className="max-w-4xl mx-auto px-6 py-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">DB</div>
                                <span className="font-medium text-gray-900">Data Engineering Test</span>
                                <span className="text-xs text-gray-400 ml-2">{userName}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span>⏱️</span>
                                    <span className={timeLeft < 600 ? "text-red-600 font-medium" : "text-gray-600"}>
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>🛡️</span>
                                    <span className="text-sm">
                                        <span className={violationCount >= 2 ? "text-red-600" : "text-gray-600"}>
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
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                        {currentQ.category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${currentQ.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                                        {currentQ.difficulty.toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    {currentQuestion + 1} / {filteredQuestions.length}
                                </div>
                            </div>

                            <div className="w-full bg-gray-100 rounded-full h-1 mb-8">
                                <div 
                                    className="bg-blue-600 h-1 rounded-full transition-all" 
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                {currentQ.question}
                            </h3>

                            <div className="space-y-3">
                                {currentQ.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(option)}
                                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                                            selectedAnswer === option
                                                ? 'border-blue-500 bg-blue-50'
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
                                            <span className="text-gray-700">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-8">
                                {!isFirstQuestion && (
                                    <button
                                        onClick={handlePreviousQuestion}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-colors"
                                    >
                                        ← Previous
                                    </button>
                                )}
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={!selectedAnswer}
                                    className={`flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors ${
                                        isFirstQuestion ? 'w-full' : ''
                                    }`}
                                >
                                    {isLastQuestion ? 'Submit Test' : 'Next Question →'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-xs text-gray-400 mt-6">
                        🔒 Security active • Do not switch tabs or exit fullscreen • {3 - violationCount} violations remaining
                    </div>
                </div>
            </div>
        );
    }

    if (testCompleted) {
        const percentage = ((score / filteredQuestions.length) * 100).toFixed(1);
        
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="border-b border-gray-200 bg-white">
                    <div className="max-w-5xl mx-auto px-6 py-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">DB</div>
                            <span className="font-semibold text-gray-900">Test Results</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-12">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-8 text-center border-b border-gray-100">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                📋
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Test Completed
                            </h1>
                            <p className="text-gray-500 mt-1">Thank you, {userName}!</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center p-10 m-6 rounded-xl">
                            <h2 className="text-lg font-medium opacity-90 mb-2">Final Score</h2>
                            <div className="text-6xl font-bold mb-2">{score} / {filteredQuestions.length}</div>
                            <div className="text-2xl opacity-90">{percentage}%</div>
                            <div className="mt-4 text-sm opacity-75">
                                ⏱️ Time taken: {formatTime(3600 - timeLeft)}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Answer Review</h3>
                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {userAnswers.filter(a => a !== undefined).map((answer, index) => (
                                    <div 
                                        key={index} 
                                        className={`border rounded-lg p-4 ${
                                            answer.isCorrect 
                                                ? 'bg-green-50 border-green-200' 
                                                : 'bg-red-50 border-red-200'
                                        }`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                                    answer.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                                }`}>
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 text-sm">{answer.question}</p>
                                                <div className="mt-2 text-sm">
                                                    <p><span className="text-gray-500">You:</span> {answer.selectedAnswer}</p>
                                                    <p><span className="text-gray-500">Correct:</span> <span className="font-medium">{answer.correctAnswer}</span></p>
                                                    {answer.explanation && (
                                                        <p className="mt-2 text-gray-600 text-xs bg-white/50 p-2 rounded">
                                                            💡 {answer.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-lg">
                                                {answer.isCorrect ? '✓' : '✗'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex gap-4 justify-center">
                            <button 
                                onClick={resetTest} 
                                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-8 rounded-lg transition-colors"
                            >
                                ⟳ Take Again
                            </button>
                            <button 
                                onClick={() => window.print()} 
                                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-8 rounded-lg transition-colors"
                            >
                                🖨️ Print Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default DataEngineeringTest;