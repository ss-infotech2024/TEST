import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ClipboardList, User, Mail, Phone, Filter, Clock, AlertTriangle,
  CheckCircle, Shield, Award, BookOpen, Brain,
  Lightbulb, Users, ChevronLeft, ChevronRight, Printer, ExternalLink,
  Activity, WifiOff, Maximize2, Flag, Send, FileText,
} from 'lucide-react';
import { aptitudeQuestions } from '../aptitudeq';
import image1 from "../assets/crt.png";
import image2 from "../assets/databricks.png";
import image3 from "../assets/germany.png";
import image4 from "../assets/servicenow.png";

const DEFAULT_LEFT_IMAGES = [image1, image2];
const DEFAULT_RIGHT_IMAGES = [image3, image4];

const AptitudeTest = () => {
  // User Info
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Test State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [violationCount, setViolationCount] = useState(0);

  // Submission State
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Refs
  const scoreRef = useRef(0);
  const userAnswersRef = useRef([]);
  const violationCountRef = useRef(0);
  const testCompletedRef = useRef(false);
  const timerIntervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastViolationTimeRef = useRef(0);
  const violationCooldownRef = useRef(false);

  // Derived
  const filteredQuestions = categoryFilter === 'all'
    ? aptitudeQuestions
    : aptitudeQuestions.filter(q => q.category === categoryFilter);

  // Constants
  const SUBMIT_ENDPOINT = 'https://ssinfotech-0x5s.onrender.com/api/submissions/submit';
  const HEALTH_ENDPOINTS = [
    'https://ssinfotech-0x5s.onrender.com/health',
    'https://ssinfotech-0x5s.onrender.com/api/health',
  ];
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfYourFormID/viewform';
  const VIOLATION_COOLDOWN_MS = 2000;

  // Helpers
  const generateSubmissionId = () => 'sub-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Fullscreen
  const enterFullscreen = useCallback(async () => {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
    } catch {
      alert('Please allow fullscreen mode. Press F11 to enter manually.');
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  }, []);

  // Backend
  const testBackendConnection = async () => {
    for (const endpoint of HEALTH_ENDPOINTS) {
      try {
        const res = await fetch(endpoint, { method: 'GET', signal: AbortSignal.timeout(5000) });
        if (res.ok) { setBackendStatus('connected'); return true; }
      } catch { }
    }
    setBackendStatus('disconnected');
    return false;
  };

  const saveToLocalStorage = (submission, synced = false) => {
    try {
      const existing = JSON.parse(localStorage.getItem('aptitudeTestSubmissions') || '[]');
      const idx = existing.findIndex(s => s.submissionId === submission.submissionId);
      const entry = { ...submission, localSaveTime: new Date().toISOString(), syncedToBackend: synced };
      if (idx !== -1) existing[idx] = entry;
      else existing.unshift(entry);
      localStorage.setItem('aptitudeTestSubmissions', JSON.stringify(existing));
    } catch (e) { console.error('localStorage error:', e); }
  };

  const submitTestToBackend = async submissionData => {
    try {
      setSubmissionLoading(true);
      setSubmissionError('');
      setSubmissionSuccess('');
      const res = await fetch(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSubmissionSuccess('Your test results have been successfully recorded!');
        setBackendStatus('connected');
        return { ...result, synced: true };
      }
      throw new Error(result.error || 'Submission failed');
    } catch (error) {
      setSubmissionError('Results saved locally. Will sync when connection is restored.');
      setBackendStatus('disconnected');
      return { synced: false, error: error.message };
    } finally {
      setSubmissionLoading(false);
    }
  };

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

  // Test Completion
  const handleTestCompletion = useCallback(async (finalScore, finalAnswers) => {
    if (testCompletedRef.current || hasSubmitted) return;
    testCompletedRef.current = true;

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    const accurateScore = finalScore !== undefined ? finalScore : scoreRef.current;
    const accurateAnswers = finalAnswers !== undefined ? finalAnswers : userAnswersRef.current;
    const timeTaken = startTimeRef.current ? Math.floor((Date.now() - startTimeRef.current) / 1000) : 3600 - timeLeft;

    const submissionData = {
      userName: userName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      score: accurateScore,
      totalQuestions: filteredQuestions.length,
      userAnswers: accurateAnswers,
      violationCount: violationCountRef.current,
      categoryFilter,
      timeTaken,
      submittedAt: new Date().toISOString(),
      submissionId: generateSubmissionId(),
    };

    saveToLocalStorage(submissionData, false);
    const result = await submitTestToBackend(submissionData);
    saveToLocalStorage(submissionData, result.synced);

    setHasSubmitted(true);
    setTestCompleted(true);
    setTestStarted(false);
    exitFullscreen();
    removeSecurityListeners();
  }, [userName, email, phone, filteredQuestions.length, categoryFilter, hasSubmitted, exitFullscreen]);

  // Violations
  const handleViolation = useCallback(() => {
    if (testCompletedRef.current) return;

    const now = Date.now();
    if (violationCooldownRef.current) return;
    if (now - lastViolationTimeRef.current < VIOLATION_COOLDOWN_MS) return;

    violationCooldownRef.current = true;
    lastViolationTimeRef.current = now;

    setTimeout(() => {
      violationCooldownRef.current = false;
    }, VIOLATION_COOLDOWN_MS);

    const newCount = violationCountRef.current + 1;
    violationCountRef.current = newCount;
    setViolationCount(newCount);

    if (newCount < 3) {
      alert(`Security Warning ${newCount}/3: Do not leave the test environment!`);
    } else {
      alert('Test terminated due to 3 security violations. Auto-submitting now.');
      handleTestCompletion();
    }
  }, [handleTestCompletion]);

  // Security Handlers
  const visibilityHandler = useCallback(() => {
    if (document.hidden && !testCompletedRef.current) handleViolation();
  }, [handleViolation]);

  const blurHandler = useCallback(() => {
    if (!testCompletedRef.current) {
      setTimeout(() => {
        if (!testCompletedRef.current) handleViolation();
      }, 100);
    }
  }, [handleViolation]);

  const fullscreenChangeHandler = useCallback(() => {
    if (!testCompletedRef.current && !document.fullscreenElement && !document.webkitFullscreenElement) {
      handleViolation();
      setTimeout(() => {
        if (!testCompletedRef.current) enterFullscreen();
      }, 500);
    }
  }, [handleViolation, enterFullscreen]);

  const keydownHandler = useCallback(e => {
    if (testCompletedRef.current) return;
    if (e.key === 'F12' || e.key === 'Escape') { e.preventDefault(); handleViolation(); return; }
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) { e.preventDefault(); handleViolation(); return; }
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); handleViolation(); return; }
    if (e.altKey && e.key === 'Tab') handleViolation();
  }, [handleViolation]);

  const contextMenuHandler = useCallback(e => {
    if (!testCompletedRef.current) { e.preventDefault(); handleViolation(); }
  }, [handleViolation]);

  const beforeUnloadHandler = useCallback(e => {
    if (!testCompletedRef.current) {
      e.preventDefault();
      e.returnValue = 'Test in progress! Are you sure you want to leave?';
      handleViolation();
    }
  }, [handleViolation]);

  const removeSecurityListeners = useCallback(() => {
    document.removeEventListener('visibilitychange', visibilityHandler);
    window.removeEventListener('blur', blurHandler);
    document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('contextmenu', contextMenuHandler);
    window.removeEventListener('beforeunload', beforeUnloadHandler);
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  }, [visibilityHandler, blurHandler, fullscreenChangeHandler, keydownHandler, contextMenuHandler, beforeUnloadHandler]);

  const setupSecurityListeners = useCallback(() => {
    document.addEventListener('visibilitychange', visibilityHandler);
    window.addEventListener('blur', blurHandler);
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('contextmenu', contextMenuHandler);
    window.addEventListener('beforeunload', beforeUnloadHandler);
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  }, [visibilityHandler, blurHandler, fullscreenChangeHandler, keydownHandler, contextMenuHandler, beforeUnloadHandler]);

  // Timer
  useEffect(() => {
    if (!testStarted || testCompletedRef.current || timeLeft <= 0) return;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
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
  }, [testStarted, handleTestCompletion]);

  // Init / Cleanup
  useEffect(() => {
    if (testStarted && !testCompletedRef.current) {
      setupSecurityListeners();
      enterFullscreen();
    }
    return () => {
      if (!testStarted) {
        removeSecurityListeners();
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      }
    };
  }, [testStarted, setupSecurityListeners, removeSecurityListeners, enterFullscreen]);

  // Backend Polling
  useEffect(() => {
    testBackendConnection();
    const interval = setInterval(() => {
      testBackendConnection();
      if (!testStarted && !testCompletedRef.current) syncPendingSubmissions();
    }, 30000);
    return () => clearInterval(interval);
  }, [testStarted]);

  // Validation
  const validateUserInfo = () => {
    if (!userName.trim()) { alert('Please enter your full name'); return false; }
    if (!email.trim()) { alert('Please enter your email address'); return false; }
    if (!phone.trim()) { alert('Please enter your phone number'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!/^[0-9+\-\s()]{10,15}$/.test(phone.trim())) {
      alert('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  // Start Test
  const handleStartTest = async () => {
    if (!validateUserInfo()) return;

    testCompletedRef.current = false;
    scoreRef.current = 0;
    userAnswersRef.current = [];
    violationCountRef.current = 0;
    startTimeRef.current = Date.now();
    lastViolationTimeRef.current = 0;
    violationCooldownRef.current = false;

    setTestStarted(true);
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

  // Answer & Navigation
  const handleAnswerSelect = answer => {
    if (!testStarted || testCompletedRef.current) return;
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer || testCompletedRef.current) return;

    const q = filteredQuestions[currentQuestion];
    const isCorrect = selectedAnswer === q.correctAnswer;

    const newAnswer = {
      questionId: q.id,
      question: q.question,
      selectedAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
      difficulty: q.difficulty,
      category: q.category,
    };

    const existingIdx = userAnswersRef.current.findIndex(a => a.questionId === q.id);

    if (existingIdx !== -1) {
      const prev = userAnswersRef.current[existingIdx];
      if (prev.isCorrect && !isCorrect) scoreRef.current -= 1;
      else if (!prev.isCorrect && isCorrect) scoreRef.current += 1;
      const updated = [...userAnswersRef.current];
      updated[existingIdx] = newAnswer;
      userAnswersRef.current = updated;
    } else {
      userAnswersRef.current = [...userAnswersRef.current, newAnswer];
      if (isCorrect) scoreRef.current += 1;
    }

    const nextAnswers = userAnswersRef.current;
    const nextScore = scoreRef.current;
    setUserAnswers(nextAnswers);
    setScore(nextScore);

    const isLast = currentQuestion === filteredQuestions.length - 1;
    if (!isLast) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer('');
    } else {
      handleTestCompletion(nextScore, nextAnswers);
    }
  };

  // Reset
  const resetTest = () => {
    testCompletedRef.current = false;
    scoreRef.current = 0;
    userAnswersRef.current = [];
    violationCountRef.current = 0;
    startTimeRef.current = null;
    lastViolationTimeRef.current = 0;
    violationCooldownRef.current = false;

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

  // Style Helpers
  const getDifficultyColor = d =>
    d === 'medium' ? 'bg-yellow-100 text-yellow-800' :
    d === 'hard' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';

  const getCategoryColor = c =>
    c === 'Logical' ? 'bg-blue-100 text-blue-800' :
    c === 'Reasoning' ? 'bg-indigo-100 text-indigo-800' :
    c === 'Soft Skills' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-800';

  const getCategoryIcon = c => {
    switch (c) {
      case 'Logical': return <Brain size={16} className="mr-1" />;
      case 'Reasoning': return <Lightbulb size={16} className="mr-1" />;
      case 'Soft Skills': return <Users size={16} className="mr-1" />;
      default: return <BookOpen size={16} className="mr-1" />;
    }
  };

  const getBackendStatusColor = () =>
    backendStatus === 'connected' ? 'bg-green-100 text-green-800' :
    backendStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800';

  const getBackendStatusIcon = () =>
    backendStatus === 'connected' ? <CheckCircle size={14} className="mr-1" /> :
    backendStatus === 'disconnected' ? <WifiOff size={14} className="mr-1" /> : <Activity size={14} className="mr-1" />;

  const getBackendStatusText = () =>
    backendStatus === 'connected' ? 'Connected' : backendStatus === 'disconnected' ? 'Offline Mode' : 'Checking...';

  // Category Stats
  const getCategoryStats = () => {
    const stats = {
      Logical: { total: 0, correct: 0 },
      Reasoning: { total: 0, correct: 0 },
      'Soft Skills': { total: 0, correct: 0 },
    };
    userAnswersRef.current.forEach(a => {
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
              {[
                { label: 'Full Name', icon: <User size={18} className="inline mr-2" />, value: userName, set: setUserName, type: 'text', placeholder: 'John Doe' },
                { label: 'Email', icon: <Mail size={18} className="inline mr-2" />, value: email, set: setEmail, type: 'email', placeholder: 'john@example.com' },
                { label: 'Phone Number', icon: <Phone size={18} className="inline mr-2" />, value: phone, set: setPhone, type: 'tel', placeholder: '+1234567890' },
              ].map(({ label, icon, value, set, type, placeholder }) => (
                <div key={label}>
                  <label className="block text-lg font-medium text-gray-700 mb-2">{icon}{label} *</label>
                  <input
                    type={type} value={value} onChange={e => set(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <Filter size={18} className="inline mr-2" />Test Category
                </label>
                <select
                  value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories ({aptitudeQuestions.length} Questions)</option>
                  <option value="Logical">Logical Reasoning Only</option>
                  <option value="Reasoning">Pure Reasoning Only</option>
                  <option value="Soft Skills">Soft Skills Only</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { cat: 'Logical', icon: <Brain size={32} className="text-blue-600 mx-auto mb-2" />, bg: 'bg-blue-50', text: 'text-blue-600', label: 'text-blue-700' },
                { cat: 'Reasoning', icon: <Lightbulb size={32} className="text-indigo-600 mx-auto mb-2" />, bg: 'bg-indigo-50', text: 'text-indigo-600', label: 'text-indigo-700' },
                { cat: 'Soft Skills', icon: <Users size={32} className="text-pink-600 mx-auto mb-2" />, bg: 'bg-pink-50', text: 'text-pink-600', label: 'text-pink-700' },
              ].map(({ cat, icon, bg, text, label }) => (
                <div key={cat} className={`${bg} p-4 rounded-lg text-center`}>
                  {icon}
                  <div className={`text-2xl font-bold ${text}`}>
                    {aptitudeQuestions.filter(q => q.category === cat).length}
                  </div>
                  <div className={`${label} font-medium`}>{cat}</div>
                </div>
              ))}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
                <Shield size={20} className="mr-2" /> Security Measures
              </h3>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                <li>Fullscreen mode is mandatory and enforced</li>
                <li>Tab switching is prohibited (records violation)</li>
                <li>Right-click and developer tools are disabled</li>
                <li>3 security violations will auto-submit your test</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                <FileText size={20} className="mr-2" /> Test Information
              </h3>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Total Questions: {filteredQuestions.length}</li>
                <li>Time Limit: 60 minutes</li>
                <li>Multiple choice — no negative marking</li>
                <li>Results auto-saved locally and to server</li>
              </ul>
            </div>

            {backendStatus === 'disconnected' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center justify-center text-yellow-700">
                <WifiOff size={18} className="mr-2" />
                Backend offline. Results will be saved locally.
              </div>
            )}

            <button
              onClick={handleStartTest}
              disabled={backendStatus === 'checking'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
            >
              {backendStatus === 'checking' ? (
                <><Activity size={20} className="animate-spin mr-2" />Checking Connection...</>
              ) : (
                <><Maximize2 size={20} className="mr-2" />Start Test</>
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
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center font-bold flex items-center justify-between">
            <div className="flex items-center">
              <Shield size={18} className="mr-2" />
              <span>Security Mode Active — Fullscreen Enforced</span>
            </div>
            <div className={`flex items-center ${violationCount >= 2 ? 'animate-pulse' : ''}`}>
              <AlertTriangle size={16} className="mr-1" />
              <span>Violations: {violationCount}/3</span>
            </div>
          </div>
          {violationCount === 2 && (
            <div className="bg-yellow-500 text-white px-4 py-1 rounded-b-lg text-center text-sm font-semibold">
              Final Warning: One more violation will terminate the test!
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT SIDE IMAGES */}
            <div className="lg:w-1/5 space-y-6">
              {DEFAULT_LEFT_IMAGES.map((img, idx) => (
                <div key={`left-${idx}`} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img src={img} alt={`Advertisement ${idx + 1}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>

            {/* CENTER - MCQ */}
            <div className="lg:w-3/5">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <ClipboardList size={24} className="mr-2" /> Aptitude Test
                    </h2>
                    <p className="text-gray-600 flex items-center mt-1">
                      <User size={14} className="mr-1" /> {userName}
                    </p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getBackendStatusColor()}`}>
                      {getBackendStatusIcon()}{getBackendStatusText()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold flex items-center justify-end ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                      <Clock size={18} className="mr-1" />{formatTime(timeLeft)}
                    </div>
                    <div className="text-gray-600">Q {currentQuestion + 1} / {filteredQuestions.length}</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }} />
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentQ.category)}`}>
                        {getCategoryIcon(currentQ.category)}{currentQ.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
                        {currentQ.difficulty.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">Q#{currentQ.id}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed whitespace-pre-line">
                    {currentQ.question}
                  </h3>

                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedAnswer === option
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
                        const prevQ = filteredQuestions[currentQuestion - 1];
                        const prevSaved = userAnswersRef.current.find(a => a.questionId === prevQ.id);
                        setCurrentQuestion(c => c - 1);
                        setSelectedAnswer(prevSaved ? prevSaved.selectedAnswer : '');
                      }
                    }}
                    disabled={currentQuestion === 0}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
                  >
                    <ChevronLeft size={18} className="mr-1" />Previous
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold flex items-center"
                  >
                    {currentQuestion === filteredQuestions.length - 1
                      ? <><Flag size={18} className="mr-1" />Finish Test</>
                      : <>Next Question<ChevronRight size={18} className="ml-1" /></>}
                  </button>
                </div>

                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <Shield size={18} className="text-red-600 inline mr-2" />
                  <span className="text-red-700 font-medium">
                    Do not leave fullscreen or switch tabs!{' '}
                    {violationCount === 0 && "Stay focused!"}
                    {violationCount === 1 && "Be careful!"}
                    {violationCount === 2 && "Last warning!"}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE IMAGES */}
            <div className="lg:w-1/5 space-y-6">
              {DEFAULT_RIGHT_IMAGES.map((img, idx) => (
                <div key={`right-${idx}`} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img src={img} alt={`Advertisement ${idx + 1}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (testCompleted) {
    const categoryStats = getCategoryStats();
    const finalScore = scoreRef.current;
    const totalQ = filteredQuestions.length;
    const percentage = totalQ > 0 ? ((finalScore / totalQ) * 100).toFixed(1) : '0.0';

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={40} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Completed!</h1>
              <p className="text-gray-600">Congratulations {userName}!</p>

              {submissionSuccess && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center text-green-700">
                  <CheckCircle size={18} className="mr-2" />{submissionSuccess}
                </div>
              )}
              {submissionError && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-center text-yellow-700">
                  <AlertTriangle size={18} className="mr-2" />{submissionError}
                </div>
              )}
              {violationCount > 0 && (
                <p className="mt-2 font-semibold flex items-center justify-center text-orange-600">
                  <AlertTriangle size={16} className="mr-1" />
                  {violationCount} security violation(s) recorded.
                </p>
              )}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getBackendStatusColor()}`}>
                {getBackendStatusIcon()}{getBackendStatusText()}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Overall Score</h2>
              <div className="text-6xl font-bold mb-2">{finalScore}/{totalQ}</div>
              <div className="text-2xl">{percentage}%</div>
              <div className="text-sm mt-2 flex items-center justify-center">
                <Clock size={14} className="mr-1" />
                Time Taken: {startTimeRef.current ? formatTime(Math.floor((Date.now() - startTimeRef.current) / 1000)) : '—'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(categoryStats).map(([category, stats]) => stats.total > 0 && (
                <div key={category} className={`p-6 rounded-lg text-center ${
                  category === 'Logical' ? 'bg-blue-50' : category === 'Reasoning' ? 'bg-indigo-50' : 'bg-pink-50'
                }`}>
                  <div className="flex justify-center mb-2">
                    {category === 'Logical' && <Brain size={32} className="text-blue-600" />}
                    {category === 'Reasoning' && <Lightbulb size={32} className="text-indigo-600" />}
                    {category === 'Soft Skills' && <Users size={32} className="text-pink-600" />}
                  </div>
                  <div className={`text-3xl font-bold ${
                    category === 'Logical' ? 'text-blue-600' : category === 'Reasoning' ? 'text-indigo-600' : 'text-pink-600'
                  }`}>{stats.correct}/{stats.total}</div>
                  <div className="font-medium text-gray-700">{category}</div>
                  <div className="text-sm text-gray-500">{((stats.correct / stats.total) * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 text-center">
              <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center justify-center">
                <FileText size={20} className="mr-2" /> Next Step: Complete Online Test Form
              </h3>
              <p className="text-yellow-700 mb-4">Click below to complete the official Google Form for your submission.</p>
              <button
                onClick={() => window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition flex items-center justify-center mx-auto"
              >
                <Send size={18} className="mr-2" />Complete Google Form<ExternalLink size={14} className="ml-2" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={resetTest} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition flex items-center justify-center">
                <ClipboardList size={18} className="mr-2" />Take Test Again
              </button>
              <button onClick={() => window.print()} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition flex items-center justify-center">
                <Printer size={18} className="mr-2" />Print Results
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