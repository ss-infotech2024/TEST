import React, { useState, useEffect, useRef } from 'react';

// ─── Question Bank ────────────────────────────────────────────────────────────
export const dataEngineeringQuestions = [
  {
    id: 1,
    question: "You need to find the 2nd highest salary per department. Which approach is best?",
    options: [
      "GROUP BY with MAX()",
      "ORDER BY with LIMIT 2",
      "ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)",
      "DISTINCT with ORDER BY",
    ],
    correctAnswer: "ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)",
    category: "SQL Advanced",
    difficulty: "medium",
    explanation:
      "ROW_NUMBER() with PARTITION BY and filtering on rn = 2 is the standard way to find nth highest salary per group.",
  },
  {
    id: 2,
    question: "What happens if you use WHERE with aggregate functions?",
    options: ["Works normally", "Throws error", "Filters after aggregation", "Same as HAVING"],
    correctAnswer: "Throws error",
    category: "SQL Advanced",
    difficulty: "easy",
    explanation: "WHERE filters rows before GROUP BY. Aggregate functions cannot be used in WHERE clause.",
  },
  {
    id: 3,
    question: "You want only departments where total sales > 10,000. Which clause?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correctAnswer: "HAVING",
    category: "SQL Advanced",
    difficulty: "easy",
    explanation: "HAVING filters groups after aggregation.",
  },
  {
    id: 4,
    question: "Which join will return all records even if there is no match in both tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correctAnswer: "FULL OUTER JOIN",
    category: "SQL Advanced",
    difficulty: "medium",
    explanation: "FULL OUTER JOIN returns all rows from both tables with NULLs where no match exists.",
  },
  {
    id: 5,
    question:
      "What does this query do? ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC)",
    options: ["Removes duplicates", "Assigns ranking per customer", "Groups data", "Filters data"],
    correctAnswer: "Assigns ranking per customer",
    category: "SQL Advanced",
    difficulty: "medium",
    explanation: "It assigns a unique rank to each row within each customer partition.",
  },
  {
    id: 6,
    question: "Which is best for removing column-level duplicates?",
    options: ["DISTINCT", "GROUP BY", "ROW_NUMBER() with filter", "ORDER BY"],
    correctAnswer: "ROW_NUMBER() with filter",
    category: "SQL Advanced",
    difficulty: "medium",
    explanation:
      "ROW_NUMBER() + WHERE rn = 1 is the most flexible way to deduplicate keeping specific records.",
  },
  {
    id: 7,
    question: "What is the main benefit of CTEs?",
    options: [
      "Faster execution",
      "Reduce joins",
      "Improve readability and modular queries",
      "Store data permanently",
    ],
    correctAnswer: "Improve readability and modular queries",
    category: "SQL Advanced",
    difficulty: "easy",
    explanation: "CTEs make complex queries more readable and easier to maintain.",
  },
  {
    id: 8,
    question: "Which operation is most expensive in distributed SQL systems?",
    options: ["SELECT", "FILTER", "JOIN (shuffle)", "LIMIT"],
    correctAnswer: "JOIN (shuffle)",
    category: "SQL Advanced",
    difficulty: "medium",
    explanation: "Joins often require shuffling data across the cluster, making them expensive.",
  },
  {
    id: 9,
    question: "Which technique improves query performance?",
    options: ["SELECT *", "Column pruning", "Nested subqueries everywhere", "Removing indexes"],
    correctAnswer: "Column pruning",
    category: "SQL Advanced",
    difficulty: "easy",
    explanation: "Reading only required columns reduces I/O significantly.",
  },
  {
    id: 10,
    question: "Which is true about indexing?",
    options: [
      "Slows down SELECT",
      "Improves read performance",
      "Only works on small tables",
      "Used only for joins",
    ],
    correctAnswer: "Improves read performance",
    category: "SQL Advanced",
    difficulty: "easy",
    explanation: "Indexes speed up SELECT, WHERE, and JOIN operations.",
  },
  {
    id: 11,
    question: "Why is Spark faster than Hadoop MapReduce?",
    options: ["Uses more CPU", "Uses in-memory processing", "Uses SQL", "Uses Python"],
    correctAnswer: "Uses in-memory processing",
    category: "PySpark Advanced",
    difficulty: "easy",
    explanation: "Spark processes data in memory, reducing disk I/O compared to MapReduce.",
  },
  {
    id: 12,
    question: "What triggers execution in Spark?",
    options: ["Transformation", "Action", "Schema", "Partition"],
    correctAnswer: "Action",
    category: "PySpark Advanced",
    difficulty: "easy",
    explanation: "Actions (show, count, write, etc.) trigger the actual computation in Spark.",
  },
  {
    id: 13,
    question: "Which optimization avoids shuffle during joins?",
    options: ["Repartition", "Broadcast Join", "Cache", "Coalesce"],
    correctAnswer: "Broadcast Join",
    category: "PySpark Advanced",
    difficulty: "medium",
    explanation: "Broadcast Join is used when one table is small and can be sent to all nodes.",
  },
  {
    id: 14,
    question: "What happens when you call df.cache()?",
    options: ["Writes to disk", "Stores in memory", "Deletes data", "Repartitions data"],
    correctAnswer: "Stores in memory",
    category: "PySpark Advanced",
    difficulty: "easy",
    explanation: "cache() stores the DataFrame in memory for faster reuse.",
  },
  {
    id: 15,
    question: "When should you use repartition()?",
    options: [
      "Reduce partitions",
      "Increase or rebalance partitions",
      "Remove duplicates",
      "Sort data",
    ],
    correctAnswer: "Increase or rebalance partitions",
    category: "PySpark Advanced",
    difficulty: "medium",
    explanation: "repartition() is used to increase or rebalance the number of partitions.",
  },
  {
    id: 16,
    question: "Difference between repartition() and coalesce()?",
    options: [
      "Both same",
      "repartition reduces only",
      "coalesce avoids shuffle when reducing",
      "coalesce increases partitions",
    ],
    correctAnswer: "coalesce avoids shuffle when reducing",
    category: "PySpark Advanced",
    difficulty: "medium",
    explanation: "coalesce() reduces partitions without full shuffle.",
  },
  {
    id: 17,
    question: "Which operation causes data shuffle?",
    options: ["select()", "filter()", "groupBy()", "drop()"],
    correctAnswer: "groupBy()",
    category: "PySpark Advanced",
    difficulty: "medium",
    explanation: "groupBy(), join(), and distinct() usually cause shuffle.",
  },
  {
    id: 18,
    question: "What is predicate pushdown?",
    options: [
      "Filtering after read",
      "Filtering at source level",
      "Sorting data",
      "Partitioning data",
    ],
    correctAnswer: "Filtering at source level",
    category: "PySpark Advanced",
    difficulty: "medium",
    explanation: "Predicate pushdown filters data at the storage level before reading.",
  },
  {
    id: 19,
    question: "Which file format is best for analytics?",
    options: ["CSV", "JSON", "Parquet", "TXT"],
    correctAnswer: "Parquet",
    category: "PySpark Advanced",
    difficulty: "easy",
    explanation: "Parquet is columnar, compressed, and supports predicate pushdown.",
  },
  {
    id: 20,
    question: "What is schema inference drawback?",
    options: [
      "Faster processing",
      "Extra computation overhead",
      "Better performance",
      "No impact",
    ],
    correctAnswer: "Extra computation overhead",
    category: "PySpark Advanced",
    difficulty: "medium",
    explanation: "Schema inference requires scanning data, adding overhead.",
  },
  {
    id: 21,
    question: "What is the output? x = [1,2,3]; print(x*2)",
    options: ["[1,2,3,1,2,3]", "[2,4,6]", "Error", "None"],
    correctAnswer: "[1,2,3,1,2,3]",
    category: "Python Advanced",
    difficulty: "easy",
    explanation: "List multiplication repeats the list.",
  },
  {
    id: 22,
    question: "What does this return? list(map(lambda x: x*2, [1,2,3]))",
    options: ["[1,2,3]", "[2,4,6]", "Error", "None"],
    correctAnswer: "[2,4,6]",
    category: "Python Advanced",
    difficulty: "easy",
    explanation: "map applies the lambda to each element.",
  },
  {
    id: 23,
    question: "Which is faster for large data?",
    options: ["for loop", "list comprehension", "recursion", "print()"],
    correctAnswer: "list comprehension",
    category: "Python Advanced",
    difficulty: "medium",
    explanation: "List comprehensions are generally faster than for loops.",
  },
  {
    id: 24,
    question: "What does try-except do?",
    options: ["Loop control", "Error handling", "Function call", "Sorting"],
    correctAnswer: "Error handling",
    category: "Python Advanced",
    difficulty: "easy",
    explanation: "try-except is used for exception handling.",
  },
  {
    id: 25,
    question: "Which library is used for tabular data?",
    options: ["NumPy", "Pandas", "Matplotlib", "OS"],
    correctAnswer: "Pandas",
    category: "Python Advanced",
    difficulty: "easy",
    explanation: "Pandas is the standard library for tabular data in Python.",
  },
  {
    id: 26,
    question: "Why is data partitioning important?",
    options: ["Reduce storage", "Improve parallelism", "Reduce schema", "Increase redundancy"],
    correctAnswer: "Improve parallelism",
    category: "Big Data & Architecture",
    difficulty: "medium",
    explanation: "Partitioning enables parallel processing across nodes.",
  },
  {
    id: 27,
    question: "What is data locality?",
    options: [
      "Data stored centrally",
      "Processing near data",
      "Remote execution",
      "Backup storage",
    ],
    correctAnswer: "Processing near data",
    category: "Big Data & Architecture",
    difficulty: "medium",
    explanation: "Processing tasks run on nodes where data is already located.",
  },
  {
    id: 28,
    question: "Which system supports real-time processing?",
    options: ["Hadoop MapReduce", "Spark Streaming", "Hive", "Pig"],
    correctAnswer: "Spark Streaming",
    category: "Big Data & Architecture",
    difficulty: "medium",
    explanation: "Spark Streaming enables real-time data processing.",
  },
  {
    id: 29,
    question: "What is fault tolerance in Spark?",
    options: [
      "Backup storage",
      "Lineage-based recomputation",
      "Replication only",
      "Caching",
    ],
    correctAnswer: "Lineage-based recomputation",
    category: "Big Data & Architecture",
    difficulty: "medium",
    explanation: "Spark uses lineage to recompute lost data.",
  },
  {
    id: 30,
    question: "Which architecture uses Bronze, Silver, Gold layers?",
    options: ["Data Warehouse", "Data Lake", "Medallion Architecture", "OLTP"],
    correctAnswer: "Medallion Architecture",
    category: "Big Data & Architecture",
    difficulty: "medium",
    explanation: "Medallion Architecture organizes data in Bronze → Silver → Gold layers.",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────
const SUBMIT_ENDPOINT = "https://ssinfotech-0x5s.onrender.com/api/submissions/submit";
const TIMER_SECONDS   = 3600; // 60 minutes
const MAX_VIOLATIONS  = 3;

const toolsData = [
  { name: "Apache Spark",  icon: "⚡", description: "Unified analytics engine for large-scale data processing" },
  { name: "Databricks",    icon: "🔷", description: "Unified data analytics platform"                          },
  { name: "Delta Lake",    icon: "📊", description: "Open format storage layer"                                },
  { name: "SQL Analytics", icon: "📈", description: "Advanced query optimization"                              },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

const generateSubmissionId = () =>
  "data-eng-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);

const getGrade = (pct) => {
  if (pct >= 80) return { label: "Excellent 🏆", color: "text-green-700",  bg: "bg-green-100"  };
  if (pct >= 60) return { label: "Good 👍",      color: "text-blue-700",   bg: "bg-blue-100"   };
  if (pct >= 40) return { label: "Average 📚",   color: "text-amber-700",  bg: "bg-amber-100"  };
  return           { label: "Needs Work 💪",      color: "text-red-700",    bg: "bg-red-100"    };
};

// ─── Component ────────────────────────────────────────────────────────────────
const DataEngineeringTest = () => {
  // ── Form state ────────────────────────────────────────────────────────────
  const [userName,       setUserName]       = useState("");
  const [email,          setEmail]          = useState("");
  const [phone,          setPhone]          = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // ── Test flow state ───────────────────────────────────────────────────────
  const [testStarted,   setTestStarted]   = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer,  setSelectedAnswer]  = useState("");
  const [violationCount,  setViolationCount]  = useState(0);
  const [timeLeft,        setTimeLeft]        = useState(TIMER_SECONDS);
  const [backendStatus,   setBackendStatus]   = useState("checking");

  // ── Result state (set once at completion — avoids stale-closure issues) ───
  const [resultData, setResultData] = useState(null); // { score, total, answers, timeTaken }

  // ── Refs — always up-to-date, safe inside async / closure callbacks ───────
  const userAnswersRef    = useRef([]);   // array indexed by question position
  const finalScoreRef     = useRef(0);
  const timeLeftRef       = useRef(TIMER_SECONDS);
  const violationCountRef = useRef(0);
  const hasSubmittedRef   = useRef(false);
  const startTimeRef      = useRef(null);

  // ── Derived ───────────────────────────────────────────────────────────────
  const filteredQuestions =
    categoryFilter === "all"
      ? dataEngineeringQuestions
      : dataEngineeringQuestions.filter((q) => q.category === categoryFilter);

  const categoryCounts = dataEngineeringQuestions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {});

  const answeredCount     = userAnswersRef.current.filter(Boolean).length;
  const progressPct       = filteredQuestions.length
    ? (answeredCount / filteredQuestions.length) * 100
    : 0;

  // ─────────────────────────────────────────────────────────────────────────
  // API helpers
  // ─────────────────────────────────────────────────────────────────────────
  const submitTestToBackend = async (data) => {
    try {
      const res = await fetch(SUBMIT_ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setBackendStatus("connected");
        return { synced: true };
      }
      throw new Error("Submission failed");
    } catch {
      setBackendStatus("disconnected");
      return { synced: false };
    }
  };

  const saveToLocalStorage = (submission, synced = false) => {
    try {
      const existing = JSON.parse(
        localStorage.getItem("dataEngineeringSubmissions") || "[]"
      );
      existing.unshift({
        ...submission,
        localSaveTime:   new Date().toISOString(),
        syncedToBackend: synced,
      });
      localStorage.setItem("dataEngineeringSubmissions", JSON.stringify(existing));
    } catch (e) {
      console.error("localStorage error:", e);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Fullscreen helpers
  // ─────────────────────────────────────────────────────────────────────────
  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };
  const exitFullscreen = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // FIX: handleTestCompletion receives fresh data as params
  //      instead of reading potentially-stale React state.
  // ─────────────────────────────────────────────────────────────────────────
  const handleTestCompletion = async (finalAnswers, finalScore) => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const answers   = finalAnswers ?? userAnswersRef.current;
    const score     = finalScore   ?? finalScoreRef.current;
    const timeTaken = startTimeRef.current
      ? Math.floor((Date.now() - startTimeRef.current) / 1000)
      : TIMER_SECONDS - timeLeftRef.current;

    const submissionData = {
      testType:       "data-engineering",
      userName:       userName.trim(),
      email:          email.trim().toLowerCase(),
      phone:          phone.trim(),
      score,
      totalQuestions: filteredQuestions.length,
      userAnswers:    answers.filter(Boolean),
      violationCount: violationCountRef.current,
      timeTaken,
      submittedAt:    new Date().toISOString(),
      submissionId:   generateSubmissionId(),
    };

    // Snapshot results into state for the results page
    setResultData({
      score,
      total:    filteredQuestions.length,
      answers:  answers.filter(Boolean),
      timeTaken,
    });

    saveToLocalStorage(submissionData, false);
    const result = await submitTestToBackend(submissionData);
    saveToLocalStorage(submissionData, result.synced);

    exitFullscreen();
    setTestStarted(false);
    setTestCompleted(true);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Violation handler — reads ref (never stale)
  // ─────────────────────────────────────────────────────────────────────────
  const handleViolation = () => {
    if (hasSubmittedRef.current) return;
    violationCountRef.current += 1;
    setViolationCount(violationCountRef.current);
    if (violationCountRef.current >= MAX_VIOLATIONS) {
      handleTestCompletion(userAnswersRef.current, finalScoreRef.current);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Anti-cheat effect
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!testStarted || testCompleted) return;

    const onVisibility  = () => { if (document.hidden) handleViolation(); };
    const onBlur        = () => handleViolation();
    const onFullscreen  = () => {
      if (!document.fullscreenElement) handleViolation();
    };
    const onKeydown     = (e) => {
      const blocked =
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "u");
      if (blocked) { e.preventDefault(); handleViolation(); }
    };
    const onContextMenu   = (e) => e.preventDefault();
    const onBeforeUnload  = (e) => { e.preventDefault(); e.returnValue = ""; };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    document.addEventListener("fullscreenchange", onFullscreen);
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("beforeunload", onBeforeUnload);

    enterFullscreen();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("fullscreenchange", onFullscreen);
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testStarted, testCompleted]);

  // ─────────────────────────────────────────────────────────────────────────
  // Countdown timer — uses ref so callback never reads stale state
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!testStarted || testCompleted) return;

    const timer = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);

      if (timeLeftRef.current <= 0) {
        clearInterval(timer);
        handleTestCompletion(userAnswersRef.current, finalScoreRef.current);
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testStarted, testCompleted]);

  // ─────────────────────────────────────────────────────────────────────────
  // Validation
  // ─────────────────────────────────────────────────────────────────────────
  const validateUserInfo = () => {
    if (!userName.trim())  { alert("Please enter your full name");           return false; }
    if (!email.trim())     { alert("Please enter your email address");       return false; }
    if (!phone.trim())     { alert("Please enter your phone number");        return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address"); return false;
    }
    if (!/^[0-9+\-\s()]{10,}$/.test(phone)) {
      alert("Please enter a valid phone number (minimum 10 digits)"); return false;
    }
    return true;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Start test — reset all refs and state cleanly
  // ─────────────────────────────────────────────────────────────────────────
  const handleStartTest = () => {
    if (!validateUserInfo()) return;

    // Reset refs first
    userAnswersRef.current    = new Array(filteredQuestions.length).fill(undefined);
    finalScoreRef.current     = 0;
    violationCountRef.current = 0;
    hasSubmittedRef.current   = false;
    timeLeftRef.current       = TIMER_SECONDS;
    startTimeRef.current      = Date.now();

    // Reset state
    setTimeLeft(TIMER_SECONDS);
    setViolationCount(0);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setResultData(null);
    setTestCompleted(false);
    setTestStarted(true);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────────────────────────────────
  const handleAnswerSelect = (answer) => setSelectedAnswer(answer);

  const handlePreviousQuestion = () => {
    if (currentQuestion <= 0) return;
    const prev = userAnswersRef.current[currentQuestion - 1];
    setSelectedAnswer(prev ? prev.selectedAnswer : "");
    setCurrentQuestion((q) => q - 1);
  };

  // FIX: Compute fresh score locally, then pass to handleTestCompletion.
  //      Never rely on stale React state inside async callbacks.
  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      alert("Please select an answer before proceeding");
      return;
    }

    const currentQ  = filteredQuestions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    // 1. Build updated answers array synchronously
    const updatedAnswers = [...userAnswersRef.current];
    updatedAnswers[currentQuestion] = {
      questionId:     currentQ.id,
      question:       currentQ.question,
      selectedAnswer,
      correctAnswer:  currentQ.correctAnswer,
      isCorrect,
      category:       currentQ.category,
      explanation:    currentQ.explanation,
    };
    userAnswersRef.current = updatedAnswers;

    // 2. Compute score from the fresh array (no stale closure)
    const newScore = updatedAnswers.filter((a) => a?.isCorrect).length;
    finalScoreRef.current = newScore;

    // 3. Advance or complete
    if (currentQuestion < filteredQuestions.length - 1) {
      const next = updatedAnswers[currentQuestion + 1];
      setSelectedAnswer(next ? next.selectedAnswer : "");
      setCurrentQuestion((q) => q + 1);
    } else {
      // Pass fresh data directly — no stale-closure risk
      handleTestCompletion(updatedAnswers, newScore);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Reset
  // ─────────────────────────────────────────────────────────────────────────
  const resetTest = () => {
    setUserName(""); setEmail(""); setPhone("");
    setCategoryFilter("all");
    setTestStarted(false); setTestCompleted(false);
    setCurrentQuestion(0); setSelectedAnswer("");
    setViolationCount(0); setTimeLeft(TIMER_SECONDS);
    setResultData(null);
    userAnswersRef.current    = [];
    finalScoreRef.current     = 0;
    violationCountRef.current = 0;
    hasSubmittedRef.current   = false;
    timeLeftRef.current       = TIMER_SECONDS;
    startTimeRef.current      = null;
  };

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER — Landing page
  // ═════════════════════════════════════════════════════════════════════════
  if (!testStarted && !testCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Data Engineering Test
                </h1>
                <p className="text-gray-500 text-lg">
                  Master SQL, PySpark, Python &amp; Big Data Architecture
                </p>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
                {[
                  { label: "Full Name",      type: "text",  val: userName, set: setUserName, ph: "John Doe"            },
                  { label: "Email Address",  type: "email", val: email,    set: setEmail,    ph: "john@example.com"     },
                  { label: "Phone Number",   type: "tel",   val: phone,    set: setPhone,    ph: "+91 98000 00000"      },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      value={f.val}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder={f.ph}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question Set</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">
                      All Categories ({dataEngineeringQuestions.length} Questions)
                    </option>
                    {Object.entries(categoryCounts).map(([cat, cnt]) => (
                      <option key={cat} value={cat}>
                        {cat} ({cnt} Questions)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tools grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
                {toolsData.map((t, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <div className="font-medium text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{t.description}</div>
                  </div>
                ))}
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span>🛡️</span>
                    <h3 className="font-semibold text-amber-800">Security</h3>
                  </div>
                  <ul className="space-y-1 text-sm text-amber-700">
                    <li>• Fullscreen mode enforced</li>
                    <li>• Tab switching prohibited</li>
                    <li>• {MAX_VIOLATIONS} violations = auto-submit</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span>⏱️</span>
                    <h3 className="font-semibold text-blue-800">Test Details</h3>
                  </div>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• {filteredQuestions.length} MCQs</li>
                    <li>• 60 minutes time limit</li>
                    <li>• Navigate back &amp; forth freely</li>
                  </ul>
                </div>
              </div>

              {/* Start button */}
              <button
                onClick={handleStartTest}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm"
              >
                Start Test →
              </button>

              {/* Backend status */}
              <div className="mt-4 text-center text-xs text-gray-400">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded ${
                    backendStatus === "connected" ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      backendStatus === "connected" ? "bg-green-500" : "bg-amber-500"
                    }`}
                  />
                  {backendStatus === "connected"
                    ? "Ready"
                    : backendStatus === "disconnected"
                    ? "Offline Mode"
                    : "Connecting..."}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER — Test page
  // ═════════════════════════════════════════════════════════════════════════
  if (testStarted && !testCompleted) {
    const currentQ  = filteredQuestions[currentQuestion];
    const isFirst   = currentQuestion === 0;
    const isLast    = currentQuestion === filteredQuestions.length - 1;

    return (
      <div className="min-h-screen bg-gray-50">

        {/* Sticky header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-20">
          <div className="max-w-4xl mx-auto px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                DE
              </div>
              <span className="font-medium text-gray-900 text-sm">Data Engineering Test</span>
              <span className="text-xs text-gray-400 ml-1 hidden md:inline">{userName}</span>
            </div>

            <div className="flex items-center gap-5">
              {/* Timer */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm">⏱️</span>
                <span
                  className={`text-sm font-medium tabular-nums ${
                    timeLeft < 600 ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Violations */}
              <div className="flex items-center gap-1">
                <span className="text-sm">🛡️</span>
                <span className="text-sm">
                  <span className={violationCount >= 2 ? "text-red-600 font-medium" : "text-gray-600"}>
                    {violationCount}
                  </span>
                  <span className="text-gray-400">/{MAX_VIOLATIONS}</span>
                </span>
              </div>

              {/* Question counter */}
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                {currentQuestion + 1} / {filteredQuestions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">

              {/* Meta row */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {currentQ.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      currentQ.difficulty === "medium"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-green-50  text-green-700  border-green-200"
                    }`}
                  >
                    {currentQ.difficulty.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Q {currentQuestion + 1} of {filteredQuestions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-7">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Question text */}
              <h3 className="text-lg font-semibold text-gray-900 mb-6 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded-lg border transition-all text-sm ${
                      selectedAnswer === option
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
                          selectedAnswer === option
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3 mt-8">
                {!isFirst && (
                  <button
                    onClick={handlePreviousQuestion}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors text-sm"
                  >
                    ← Previous
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className={`flex-1 font-medium py-3 rounded-lg transition-colors text-sm text-white ${
                    !selectedAnswer
                      ? "bg-blue-300 cursor-not-allowed"
                      : isLast
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isLast ? "✓ Submit Test" : "Next Question →"}
                </button>
              </div>

            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            🔒 Do not switch tabs · {MAX_VIOLATIONS - violationCount} violation(s) remaining
          </p>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════════════
  // RENDER — Results page
  // ═════════════════════════════════════════════════════════════════════════
  if (testCompleted && resultData) {
    const { score, total, answers, timeTaken } = resultData;
    const pct   = total ? ((score / total) * 100).toFixed(1) : "0.0";
    const grade = getGrade(parseFloat(pct));

    return (
      <div className="min-h-screen bg-gray-50">

        {/* Header bar */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              DE
            </div>
            <span className="font-semibold text-gray-900">Test Results</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Top section */}
            <div className="p-8 text-center border-b border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                📋
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Test Completed!</h1>
              <p className="text-gray-500 mt-1">Thank you, {userName}!</p>
            </div>

            {/* Score card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center p-10 mx-6 mt-6 rounded-xl">
              <p className="text-base font-medium opacity-80 mb-1">Final Score</p>
              <div className="text-6xl font-bold mb-1 tabular-nums">{score} / {total}</div>
              <div className="text-2xl opacity-90 font-medium">{pct}%</div>
              <div
                className={`inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full text-sm font-semibold ${grade.bg} ${grade.color}`}
              >
                {grade.label}
              </div>
              <div className="mt-3 text-sm opacity-70">
                ⏱️ Time taken: {formatTime(timeTaken)}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mx-6 mt-5">
              {[
                { label: "Correct",   val: score,         color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
                { label: "Incorrect", val: total - score,  color: "text-red-600",   bg: "bg-red-50",   border: "border-red-200"   },
                { label: "Total",     val: total,          color: "text-blue-600",  bg: "bg-blue-50",  border: "border-blue-200"  },
              ].map((s) => (
                <div key={s.label} className={`${s.bg} border ${s.border} rounded-lg p-4 text-center`}>
                  <div className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Answer review */}
            <div className="p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Answer Review</h3>
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {answers.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 ${
                      ans.isCorrect
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
                          ans.isCorrect
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm leading-snug">
                          {ans.question}
                        </p>
                        <div className="mt-2 text-xs space-y-0.5">
                          <p>
                            <span className="text-gray-500">Your answer: </span>
                            <span className={ans.isCorrect ? "text-green-700 font-medium" : "text-red-600 font-medium"}>
                              {ans.selectedAnswer}
                            </span>
                          </p>
                          {!ans.isCorrect && (
                            <p>
                              <span className="text-gray-500">Correct: </span>
                              <span className="font-medium text-green-700">{ans.correctAnswer}</span>
                            </p>
                          )}
                          {ans.explanation && (
                            <p className="mt-1.5 text-gray-600 bg-white/60 p-2 rounded border border-gray-100">
                              💡 {ans.explanation}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="text-base flex-shrink-0">
                        {ans.isCorrect ? "✅" : "❌"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-center">
              <button
                onClick={resetTest}
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-8 rounded-lg transition-colors text-sm"
              >
                ⟳ Take Again
              </button>
              <button
                onClick={() => window.print()}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-8 rounded-lg transition-colors text-sm"
              >
                🖨️ Print Results
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DataEngineeringTest;