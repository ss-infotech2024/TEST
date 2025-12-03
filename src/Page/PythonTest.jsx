import React, { useState, useEffect } from 'react';

// Python Questions Data - 45 Questions (40 MCQ + 5 Coding)
export const pythonQuestions = [
    // MCQ Questions (1-40)
    {
        id: 1,
        question: "What is the output of print(2 ** 3 ** 2)?",
        options: ["64", "512", "256", "1024"],
        correctAnswer: "512",
        category: "Basic Syntax",
        difficulty: "medium",
        explanation: "Exponentiation is right-associative in Python, so 3**2=9, then 2**9=512"
    },
    {
        id: 2,
        question: "Which of these is NOT a valid variable name?",
        options: ["_private_var", "2nd_variable", "variable_name", "VAR_NAME"],
        correctAnswer: "2nd_variable",
        category: "Basic Syntax",
        difficulty: "easy",
        explanation: "Variable names cannot start with a number in Python"
    },
    {
        id: 3,
        question: "What does \"hello\" * 3 return?",
        options: ["\"hellohellohello\"", "\"hello3\"", "Error", "\"hello hello hello\""],
        correctAnswer: "\"hellohellohello\"",
        category: "Basic Syntax",
        difficulty: "easy",
        explanation: "String multiplication repeats the string the specified number of times"
    },
    {
        id: 4,
        question: "What is the result of [1, 2, 3] + [4, 5, 6]?",
        options: ["[1, 2, 3, 4, 5, 6]", "[5, 7, 9]", "[[1, 2, 3], [4, 5, 6]]", "Error"],
        correctAnswer: "[1, 2, 3, 4, 5, 6]",
        category: "Data Structures",
        difficulty: "easy",
        explanation: "The + operator concatenates lists in Python"
    },
    {
        id: 5,
        question: "Which method is used to remove and return the last element from a list?",
        options: ["remove()", "pop()", "delete()", "clear()"],
        correctAnswer: "pop()",
        category: "Data Structures",
        difficulty: "easy",
        explanation: "pop() removes and returns the last element by default, or the element at specified index"
    },
    {
        id: 6,
        question: "What does \"python\".upper() return?",
        options: ["\"PYTHON\"", "\"Python\"", "\"python\"", "Error"],
        correctAnswer: "\"PYTHON\"",
        category: "String Operations",
        difficulty: "easy",
        explanation: "upper() method converts all characters to uppercase"
    },
    {
        id: 7,
        question: "Which operator is used for floor division?",
        options: ["/", "//", "%", "**"],
        correctAnswer: "//",
        category: "Basic Syntax",
        difficulty: "easy",
        explanation: "// is the floor division operator which rounds down to the nearest integer"
    },
    {
        id: 8,
        question: "What is the output of bool(\"False\")?",
        options: ["False", "True", "Error", "None"],
        correctAnswer: "True",
        category: "Basic Syntax",
        difficulty: "medium",
        explanation: "Any non-empty string is truthy in Python, even if it contains the word 'False'"
    },
    {
        id: 9,
        question: "What is the output of: x = 10; if x > 5: print(\"A\"); elif x > 8: print(\"B\"); else: print(\"C\")",
        options: ["A", "B", "C", "A and B"],
        correctAnswer: "A",
        category: "Control Flow",
        difficulty: "easy",
        explanation: "The first condition x > 5 is True, so 'A' is printed and the rest are skipped"
    },
    {
        id: 10,
        question: "How many times will \"Hello\" be printed: for i in range(3): for j in range(2): print(\"Hello\")",
        options: ["3", "2", "6", "5"],
        correctAnswer: "6",
        category: "Control Flow",
        difficulty: "easy",
        explanation: "Outer loop runs 3 times, inner loop runs 2 times each, so 3 * 2 = 6"
    },
    {
        id: 11,
        question: "What does range(5) generate?",
        options: ["[0, 1, 2, 3, 4]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4, 5]", "[1, 2, 3, 4]"],
        correctAnswer: "[0, 1, 2, 3, 4]",
        category: "Control Flow",
        difficulty: "easy",
        explanation: "range(5) generates numbers from 0 to 4 (exclusive of 5)"
    },
    {
        id: 12,
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for loop", "while loop", "do-while loop (Python doesn't have this)", "Both a and b"],
        correctAnswer: "while loop (with proper condition)",
        category: "Control Flow",
        difficulty: "medium",
        explanation: "A while loop with a condition that's initially True will execute at least once"
    },
    {
        id: 13,
        question: "What is the output of: def func(x, y=2): return x * y; print(func(3))",
        options: ["6", "3", "Error", "None"],
        correctAnswer: "6",
        category: "Functions",
        difficulty: "easy",
        explanation: "y has default value 2, so func(3) uses x=3, y=2, returning 3*2=6"
    },
    {
        id: 14,
        question: "What does *args represent in a function definition?",
        options: ["Keyword arguments", "Variable-length positional arguments", "Required arguments", "Default arguments"],
        correctAnswer: "Variable-length positional arguments",
        category: "Functions",
        difficulty: "medium",
        explanation: "*args allows a function to accept any number of positional arguments"
    },
    {
        id: 15,
        question: "Which keyword is used to return a value from a function?",
        options: ["break", "continue", "return", "yield"],
        correctAnswer: "return",
        category: "Functions",
        difficulty: "easy",
        explanation: "return is used to return a value from a function"
    },
    {
        id: 16,
        question: "What is the scope of a variable defined inside a function?",
        options: ["Global", "Local", "Both global and local", "Module level"],
        correctAnswer: "Local",
        category: "Functions",
        difficulty: "easy",
        explanation: "Variables defined inside a function have local scope and are not accessible outside"
    },
    {
        id: 17,
        question: "Which data structure is mutable and ordered?",
        options: ["Tuple", "String", "List", "Set"],
        correctAnswer: "List",
        category: "Data Structures",
        difficulty: "easy",
        explanation: "Lists are mutable (can be changed) and ordered (maintain insertion order)"
    },
    {
        id: 18,
        question: "What is the output of {1, 2, 3} & {3, 4, 5}?",
        options: ["{1, 2, 3, 4, 5}", "{3}", "{1, 2}", "Error"],
        correctAnswer: "{3}",
        category: "Data Structures",
        difficulty: "easy",
        explanation: "The & operator performs set intersection, returning common elements"
    },
    {
        id: 19,
        question: "How do you access the value for key 'name' in a dictionary person?",
        options: ["person['name']", "person.name", "person('name')", "person:name"],
        correctAnswer: "person['name']",
        category: "Data Structures",
        difficulty: "easy",
        explanation: "Dictionary values are accessed using square brackets and the key"
    },
    {
        id: 20,
        question: "Which method removes all elements from a list?",
        options: ["remove()", "delete()", "clear()", "empty()"],
        correctAnswer: "clear()",
        category: "Data Structures",
        difficulty: "easy",
        explanation: "clear() method removes all elements from a list"
    },
    {
        id: 21,
        question: "Which mode opens a file for both reading and writing?",
        options: ["'r'", "'w'", "'a'", "'r+'"],
        correctAnswer: "'r+'",
        category: "File Handling",
        difficulty: "medium",
        explanation: "'r+' mode opens a file for both reading and writing"
    },
    {
        id: 22,
        question: "What does the finally block do in exception handling?",
        options: ["Executes only if no exception occurs", "Executes only if an exception occurs", "Always executes", "Never executes"],
        correctAnswer: "Always executes",
        category: "Error Handling",
        difficulty: "medium",
        explanation: "The finally block always executes, whether an exception occurred or not"
    },
    {
        id: 23,
        question: "Which exception is raised when dividing by zero?",
        options: ["ValueError", "TypeError", "ZeroDivisionError", "ArithmeticError"],
        correctAnswer: "ZeroDivisionError",
        category: "Error Handling",
        difficulty: "easy",
        explanation: "ZeroDivisionError is raised when dividing by zero"
    },
    {
        id: 24,
        question: "What is the correct way to create a class in Python?",
        options: ["class MyClass:", "class MyClass()", "class MyClass{}", "class MyClass[]"],
        correctAnswer: "class MyClass:",
        category: "OOP",
        difficulty: "easy",
        explanation: "Classes are defined using the class keyword followed by the class name and colon"
    },
    {
        id: 25,
        question: "Which method is called when an object is created?",
        options: ["__init__", "__start__", "__create__", "__new__"],
        correctAnswer: "__init__",
        category: "OOP",
        difficulty: "easy",
        explanation: "__init__ is the constructor method that initializes new object instances"
    },
    {
        id: 26,
        question: "What does inheritance allow?",
        options: ["A class to inherit properties from another class", "Multiple classes to have the same name", "Functions to be called without objects", "Variables to change their types"],
        correctAnswer: "A class to inherit properties from another class",
        category: "OOP",
        difficulty: "easy",
        explanation: "Inheritance allows a class to inherit attributes and methods from another class"
    },
    {
        id: 27,
        question: "What is encapsulation?",
        options: ["Binding data and methods together", "Creating multiple instances", "Inheriting from multiple classes", "Hiding implementation details"],
        correctAnswer: "Binding data and methods together",
        category: "OOP",
        difficulty: "medium",
        explanation: "Encapsulation is the concept of wrapping data and the methods that work on data within one unit"
    },
    {
        id: 28,
        question: "Which keyword is used for inheritance?",
        options: ["implements", "extends", "inherits", "No specific keyword, just put parent class in parentheses"],
        correctAnswer: "No specific keyword, just put parent class in parentheses",
        category: "OOP",
        difficulty: "easy",
        explanation: "Inheritance is specified by putting the parent class in parentheses after the child class name"
    },
    {
        id: 29,
        question: "What is polymorphism?",
        options: ["Same interface for different data types", "Hiding data", "Creating multiple classes", "Inheriting properties"],
        correctAnswer: "Same interface for different data types",
        category: "OOP",
        difficulty: "medium",
        explanation: "Polymorphism allows methods to do different things based on the object it is acting upon"
    },
    {
        id: 30,
        question: "What does self represent in a class method?",
        options: ["The class itself", "The current object instance", "The parent class", "The module"],
        correctAnswer: "The current object instance",
        category: "OOP",
        difficulty: "medium",
        explanation: "self represents the instance of the class and is used to access variables and methods associated with the current object"
    },
    {
        id: 31,
        question: "How do you make a method private in Python?",
        options: ["Using private keyword", "Prefixing with double underscore __", "Prefixing with single underscore _", "Using the private decorator"],
        correctAnswer: "Prefixing with double underscore __",
        category: "OOP",
        difficulty: "medium",
        explanation: "Double underscore prefix makes a method name-mangled, which is Python's way of making it private"
    },
    {
        id: 32,
        question: "What is method overriding?",
        options: ["Creating a new method with same name in child class", "Deleting a method from parent class", "Calling parent class method", "Making a method private"],
        correctAnswer: "Creating a new method with same name in child class",
        category: "OOP",
        difficulty: "medium",
        explanation: "Method overriding allows a child class to provide a specific implementation of a method that is already provided by its parent class"
    },
    {
        id: 33,
        question: "What is the output of: class A: def __init__(self): self.x = 1; class B(A): def __init__(self): super().__init__(); self.y = 2; obj = B(); print(obj.x, obj.y)",
        options: ["1 2", "Error", "None None", "2 1"],
        correctAnswer: "1 2",
        category: "OOP",
        difficulty: "medium",
        explanation: "super().__init__() calls the parent class constructor, initializing x=1, then y=2 is set"
    },
    {
        id: 34,
        question: "Which decorator is used to define a class method?",
        options: ["@classmethod", "@staticmethod", "@instancemethod", "@method"],
        correctAnswer: "@classmethod",
        category: "OOP",
        difficulty: "medium",
        explanation: "@classmethod decorator is used to define a method that operates on the class rather than instances"
    },
    {
        id: 35,
        question: "What is the difference between class and instance variables?",
        options: ["Class variables are shared, instance variables are per object", "Class variables are per object, instance variables are shared", "Both are the same", "Class variables are constant"],
        correctAnswer: "Class variables are shared, instance variables are per object",
        category: "OOP",
        difficulty: "medium",
        explanation: "Class variables are shared by all instances, while instance variables are unique to each object"
    },
    {
        id: 36,
        question: "What does isinstance() function do?",
        options: ["Checks if object is instance of a class", "Checks if class is subclass of another", "Creates an instance", "Deletes an instance"],
        correctAnswer: "Checks if object is instance of a class",
        category: "OOP",
        difficulty: "easy",
        explanation: "isinstance() returns True if the specified object is of the specified type"
    },
    {
        id: 37,
        question: "How do you import a specific function from a module?",
        options: ["import function from module", "from module import function", "import module.function", "include function from module"],
        correctAnswer: "from module import function",
        category: "Modules",
        difficulty: "easy",
        explanation: "The 'from module import function' syntax imports a specific function from a module"
    },
    {
        id: 38,
        question: "What is __name__ when a script is run directly?",
        options: ["\"__main__\"", "The filename", "None", "\"main\""],
        correctAnswer: "\"__main__\"",
        category: "Modules",
        difficulty: "medium",
        explanation: "When a script is run directly, __name__ is set to \"__main__\""
    },
    {
        id: 39,
        question: "What does list comprehension [x**2 for x in range(5)] create?",
        options: ["[0, 1, 4, 9, 16]", "[1, 4, 9, 16, 25]", "[0, 1, 4, 9]", "[1, 2, 3, 4, 5]"],
        correctAnswer: "[0, 1, 4, 9, 16]",
        category: "List Comprehension",
        difficulty: "easy",
        explanation: "range(5) generates [0,1,2,3,4] and each element is squared"
    },
    {
        id: 40,
        question: "Which built-in function returns the length of an object?",
        options: ["count()", "size()", "len()", "length()"],
        correctAnswer: "len()",
        category: "Built-in Functions",
        difficulty: "easy",
        explanation: "len() returns the length (number of items) of an object"
    },

    // Coding Questions (41-45)
    {
        id: 41,
        question: "Write a function that takes a list of numbers and returns the sum of all even numbers.",
        type: "coding",
        category: "Coding - Easy",
        difficulty: "easy",
        template: `def sum_even_numbers(numbers):
    # Your code here
    pass

# Test
print(sum_even_numbers([1, 2, 3, 4, 5, 6]))  # Should return 12`,
        solution: `def sum_even_numbers(numbers):
    total = 0
    for num in numbers:
        if num % 2 == 0:
            total += num
    return total

# Test
print(sum_even_numbers([1, 2, 3, 4, 5, 6]))  # Should return 12`
    },
    {
        id: 42,
        question: "Create a class Rectangle with methods to calculate area and perimeter.",
        type: "coding",
        category: "Coding - Easy",
        difficulty: "easy",
        template: `class Rectangle:
    # Your code here
    pass

# Test
rect = Rectangle(5, 3)
print(rect.area())      # Should return 15
print(rect.perimeter()) # Should return 16`,
        solution: `class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width
    
    def area(self):
        return self.length * self.width
    
    def perimeter(self):
        return 2 * (self.length + self.width)

# Test
rect = Rectangle(5, 3)
print(rect.area())      # Should return 15
print(rect.perimeter()) # Should return 16`
    },
    {
        id: 43,
        question: "Write a function that counts the frequency of each character in a string.",
        type: "coding",
        category: "Coding - Easy",
        difficulty: "easy",
        template: `def char_frequency(text):
    # Your code here
    pass

# Test
print(char_frequency("hello"))  # Should return {'h':1, 'e':1, 'l':2, 'o':1}`,
        solution: `def char_frequency(text):
    freq = {}
    for char in text:
        if char in freq:
            freq[char] += 1
        else:
            freq[char] = 1
    return freq

# Test
print(char_frequency("hello"))  # Should return {'h':1, 'e':1, 'l':2, 'o':1}`
    },
    {
        id: 44,
        question: "Implement a banking system with classes for Account and Bank.",
        type: "coding",
        category: "Coding - Medium",
        difficulty: "medium",
        template: `class Account:
    # Your code here
    pass

class Bank:
    # Your code here
    pass

# Test
bank = Bank()
acc1 = bank.create_account("John", 1000)
acc2 = bank.create_account("Jane", 500)

acc1.deposit(200)
acc1.withdraw(100)
acc1.transfer(acc2, 300)

print(acc1.get_balance())  # Should show updated balance
print(acc2.get_balance())  # Should show updated balance`,
        solution: `class Account:
    def __init__(self, account_holder, initial_balance=0):
        self.account_holder = account_holder
        self.balance = initial_balance
        self.account_number = id(self)
    
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return True
        return False
    
    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return True
        return False
    
    def transfer(self, other_account, amount):
        if self.withdraw(amount):
            other_account.deposit(amount)
            return True
        return False
    
    def get_balance(self):
        return self.balance

class Bank:
    def __init__(self):
        self.accounts = []
    
    def create_account(self, account_holder, initial_balance=0):
        account = Account(account_holder, initial_balance)
        self.accounts.append(account)
        return account

# Test
bank = Bank()
acc1 = bank.create_account("John", 1000)
acc2 = bank.create_account("Jane", 500)

acc1.deposit(200)
acc1.withdraw(100)
acc1.transfer(acc2, 300)

print(acc1.get_balance())  # Should show updated balance
print(acc2.get_balance())  # Should show updated balance`
    },
    {
        id: 45,
        question: "Create a decorator that measures and prints the execution time of a function.",
        type: "coding",
        category: "Coding - Medium",
        difficulty: "medium",
        template: `import time

def timer_decorator(func):
    # Your code here
    pass

@timer_decorator
def example_function(n):
    time.sleep(n)
    return f"Slept for {n} seconds"

# Test
print(example_function(2))`,
        solution: `import time

def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print(f"Function {func.__name__} took {execution_time:.4f} seconds to execute")
        return result
    return wrapper

@timer_decorator
def example_function(n):
    time.sleep(n)
    return f"Slept for {n} seconds"

# Test
print(example_function(2))`
    }
];

const PythonTest = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour (3600 seconds)
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [fullscreen, setFullscreen] = useState(false);
    const [violationCount, setViolationCount] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState('');
    const [backendStatus, setBackendStatus] = useState('checking');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [codingAnswers, setCodingAnswers] = useState({});

    const filteredQuestions = categoryFilter === 'all'
        ? pythonQuestions
        : pythonQuestions.filter(q => q.category === categoryFilter);

    const generateSubmissionId = () => {
        return 'python-sub-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    };

    const SUBMIT_ENDPOINT = 'https://ssinfotech-backend-k03q.onrender.com/api/submissions/submit';
    const HEALTH_ENDPOINTS = [
        'https://ssinfotech-backend-k03q.onrender.com/health',
        'https://ssinfotech-backend-k03q.onrender.com/api/health'
    ];

    // Google Form URL for Python test submission
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfYourPythonFormID/viewform";

    const submitTestToBackend = async (submissionData) => {
        try {
            setSubmissionLoading(true);
            setSubmissionError('');
            setSubmissionSuccess('');

            console.log('Submitting Python test data:', submissionData);

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
                setSubmissionSuccess('Your Python test results have been successfully recorded!');
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
            const existing = JSON.parse(localStorage.getItem('pythonTestSubmissions') || '[]');

            const existingSubmission = existing.find(sub =>
                sub.submissionId === submission.submissionId
            );

            if (existingSubmission) {
                console.log('Python submission already exists in localStorage, updating...');
                const updated = existing.map(sub =>
                    sub.submissionId === submission.submissionId
                        ? { ...submission, localSaveTime: new Date().toISOString(), syncedToBackend: synced }
                        : sub
                );
                localStorage.setItem('pythonTestSubmissions', JSON.stringify(updated));
            } else {
                const newEntry = {
                    ...submission,
                    submissionId: submission.submissionId || generateSubmissionId(),
                    localSaveTime: new Date().toISOString(),
                    syncedToBackend: synced
                };
                existing.unshift(newEntry);
                localStorage.setItem('pythonTestSubmissions', JSON.stringify(existing));
                console.log('New Python submission saved to localStorage:', newEntry);
            }
        } catch (e) {
            console.error('localStorage error:', e);
        }
    };

    const syncPendingSubmissions = async () => {
        const pending = JSON.parse(localStorage.getItem('pythonTestSubmissions') || '[]')
            .filter(s => !s.syncedToBackend);

        for (const sub of pending) {
            const result = await submitTestToBackend(sub);
            if (result.synced) {
                const updated = JSON.parse(localStorage.getItem('pythonTestSubmissions') || '[]')
                    .map(s => s.submissionId === sub.submissionId ? { ...s, syncedToBackend: true } : s);
                localStorage.setItem('pythonTestSubmissions', JSON.stringify(updated));
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
        setCodingAnswers({});
    };

    const handleAnswerSelect = (answer) => setSelectedAnswer(answer);

    const handleCodingAnswerChange = (questionId, code) => {
        setCodingAnswers(prev => ({
            ...prev,
            [questionId]: code
        }));
    };

    const handleNextQuestion = () => {
        const currentQ = filteredQuestions[currentQuestion];

        if (currentQ.type === 'coding') {
            // For coding questions, store the code
            setUserAnswers(prev => [...prev, {
                questionId: currentQ.id,
                question: currentQ.question,
                type: 'coding',
                userCode: codingAnswers[currentQ.id] || currentQ.template,
                solution: currentQ.solution,
                category: currentQ.category,
                difficulty: currentQ.difficulty
            }]);
        } else {
            // For MCQ questions
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
        }

        if (currentQuestion < filteredQuestions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer('');
        } else {
            handleTestCompletion();
        }
    };

    const handleTestCompletion = async () => {
        if (hasSubmitted) {
            console.log('Python test already submitted, skipping duplicate submission');
            return;
        }

        setHasSubmitted(true);

        const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 3600 - timeLeft;

        const submissionData = {
            testType: 'python',
            userName: userName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            score,
            totalQuestions: filteredQuestions.length,
            userAnswers,
            codingAnswers,
            violationCount,
            categoryFilter,
            timeTaken,
            submittedAt: new Date().toISOString(),
            submissionId: generateSubmissionId()
        };

        console.log('Submitting Python test with ID:', submissionData.submissionId);

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
        setUserName(''); setEmail(''); setPhone('');
        setTestStarted(false); setTestCompleted(false);
        setCurrentQuestion(0); setSelectedAnswer(''); setScore(0);
        setUserAnswers([]); setTimeLeft(3600); setCategoryFilter('all');
        setViolationCount(0); setSubmissionError(''); setSubmissionSuccess('');
        setBackendStatus('checking'); setCodingAnswers({});
        setHasSubmitted(false);
        testBackendConnection();
    };

    const getDifficultyColor = (d) => {
        return d === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            d === 'hard' ? 'bg-red-100 text-red-800' :
                'bg-green-100 text-green-800';
    };

    const getCategoryColor = (c) => {
        return c === 'Basic Syntax' ? 'bg-blue-100 text-blue-800' :
            c === 'Data Types' ? 'bg-purple-100 text-purple-800' :
                c === 'Functions' ? 'bg-indigo-100 text-indigo-800' :
                    c === 'OOP' ? 'bg-pink-100 text-pink-800' :
                        c === 'Data Structures' ? 'bg-teal-100 text-teal-800' :
                            c.includes('Coding') ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800';
    };

    const getBackendStatusColor = () => {
        return backendStatus === 'connected' ? 'bg-green-100 text-green-800' :
            backendStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' :
                backendStatus === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800';
    };

    const getBackendStatusText = () => {
        return backendStatus === 'connected' ? '' :
            backendStatus === 'disconnected' ? 'Backend Offline' :
                backendStatus === 'error' ? 'Connection Error' :
                    'Checking Status...';
    };

    const handleGoogleFormClick = () => {
        window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    };

    // Get category counts
    const getCategoryCounts = () => {
        const counts = {};
        pythonQuestions.forEach(q => {
            counts[q.category] = (counts[q.category] || 0) + 1;
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    // === UI: START SCREEN ===
    if (!testStarted && !testCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-6">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                Python Programming Test
                            </h1>
                            <p className="text-gray-600">Test your Python programming skills - 40 MCQs + 5 Coding Questions</p>
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
                                    placeholder="+1234567890" />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Test Category</label>
                                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="all">All Categories ({pythonQuestions.length} Questions)</option>
                                    {Object.entries(categoryCounts).map(([category, count]) => (
                                        <option key={category} value={category}>
                                            {category} ({count} Questions)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-red-800 mb-2">Security Measures:</h3>
                            <ul className="list-disc list-inside text-red-700 space-y-1">
                                <li>Fullscreen mode will be enforced</li>
                                <li>Tab/window switching is prohibited</li>
                                <li>Right-click and developer tools are disabled</li>
                                <li>3 security violations will auto-submit your test</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">Test Information:</h3>
                            <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Total Questions: {filteredQuestions.length} (40 MCQ + 5 Coding)</li>
                                <li>Time Limit: 60 minutes (1 hour)</li>
                                <li>MCQ Questions: Basic Syntax, Data Types, OOP, Functions, Data Structures</li>
                                <li>Coding Questions: Functions, Classes, Algorithms, Problem Solving</li>
                                <li>No negative marking for MCQs</li>
                                <li>Coding questions will be evaluated manually</li>
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
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={backendStatus === 'checking'}
                        >
                            {backendStatus === 'checking' ? 'Checking Connection...' : 'Start Python Test'}
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
        const currentQ = filteredQuestions[currentQuestion];
        const isCodingQuestion = currentQ.type === 'coding';

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Test Content - 3/4 width */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Python Programming Test</h2>
                                        <p className="text-gray-600">Candidate: {userName}</p>
                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBackendStatusColor()}`}>
                                            {getBackendStatusText()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-gray-700">
                                            Time Left: <span className={timeLeft < 600 ? "text-red-600 font-bold" : "text-gray-800"}>
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
                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}></div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentQ.category)}`}>
                                                {currentQ.category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
                                                {currentQ.difficulty.toUpperCase()}
                                            </span>
                                            {isCodingQuestion && (
                                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                                    CODING QUESTION
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            Q{currentQ.id}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                                        {currentQ.question}
                                    </h3>

                                    {isCodingQuestion ? (
                                        <div className="space-y-4">
                                            <div className="bg-gray-50 rounded-lg p-4 border">
                                                <h4 className="font-semibold text-gray-700 mb-2">Write your code below:</h4>
                                                <textarea
                                                    value={codingAnswers[currentQ.id] || currentQ.template}
                                                    onChange={(e) => handleCodingAnswerChange(currentQ.id, e.target.value)}
                                                    className="w-full h-64 font-mono text-sm p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Write your Python code here..."
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {currentQ.options.map((option, index) => (
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
                                    )}
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
                                        disabled={!isCodingQuestion && !selectedAnswer}
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

                        {/* Advertisement Sidebar - 1/4 width */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* SS SKILL 2 SUCCESS Ad */}
                            <div className="bg-gradient-to-b from-blue-600 to-purple-700 rounded-2xl shadow-lg p-4 text-white">
                                <div className="text-center mb-3">
                                    <h3 className="font-bold text-sm mb-1">SS Traning Center</h3>
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

                                <div className="text-xs space-y-1 mb-3">
                                    <p className="font-semibold text-yellow-300">PERKS:</p>
                                    <p>• Industry Experts</p>
                                    <p>• Placement Assistance</p>
                                    <p>• Internship Certificate</p>
                                </div>

                                <div className="bg-white text-blue-600 text-center py-1 rounded-lg text-xs font-bold mb-2">
                                    GRAB YOUR SEAT NOW!
                                </div>

                                <div className="text-center text-xs">
                                    <p className="font-semibold">Contact:</p>
                                    <p>9422129534</p>
                                    <p>7719927774</p>
                                </div>
                            </div>

                            {/* ANSWERCRAFT Ad */}
                            <div className="bg-gradient-to-b from-green-600 to-blue-700 rounded-2xl shadow-lg p-4 text-white">
                                <div className="text-center mb-3">
                                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-1">
                                        LAUNCHING
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">ANSWERCRAFT</h3>
                                    <p className="text-xs mb-2">Get "HIRED" Skills</p>
                                </div>

                                <div className="text-xs space-y-1 mb-3">
                                    <p className="font-semibold text-yellow-300">YOU GET:</p>
                                    <p>• STAR+ Strategy</p>
                                    <p>• HR Question Handling</p>
                                    <p>• Interview Practice</p>
                                    <p>• Negotiation Skills</p>
                                </div>

                                <div className="bg-yellow-400 text-black text-center py-1 rounded-lg text-xs font-bold mb-2">
                                    JOIN NOW!
                                </div>

                                <div className="text-center text-xs">
                                    <p className="font-semibold">Contact:</p>
                                    <p>7719927774</p>
                                    <p>7720846048</p>
                                    <p className="text-xs mt-1">skill2success.in</p>
                                </div>

                                <div className="text-center mt-2 pt-2 border-t border-white/30">
                                    <p className="font-bold text-xs">ALLAN ABHRAHAM</p>
                                    <p className="text-xs">14+ Years Experience</p>
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
        const categoryStats = {};
        pythonQuestions.forEach(q => {
            categoryStats[q.category] = { total: 0, correct: 0, coding: 0 };
        });

        userAnswers.forEach(a => {
            if (categoryStats[a.category]) {
                categoryStats[a.category].total++;
                if (a.type === 'coding') {
                    categoryStats[a.category].coding++;
                } else if (a.isCorrect) {
                    categoryStats[a.category].correct++;
                }
            }
        });

        const mcqQuestions = userAnswers.filter(a => a.type !== 'coding');
        const codingQuestions = userAnswers.filter(a => a.type === 'coding');
        const mcqScore = mcqQuestions.filter(a => a.isCorrect).length;

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
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Python Test Completed</h1>
                            <p className="text-gray-600">Congratulations {userName} on completing the Python programming test</p>

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
                            <h2 className="text-2xl font-bold mb-4">Your Python Test Score</h2>
                            <div className="text-5xl font-bold mb-2">{mcqScore}/{mcqQuestions.length}</div>
                            <div className="text-xl">
                                MCQ Score: {((mcqScore / mcqQuestions.length) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm mt-2">
                                Coding Questions: {codingQuestions.length} | Time Taken: {formatTime(3600 - timeLeft)}
                            </div>
                        </div>



                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Results</h3>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div><div className="text-2xl font-bold text-green-600">{mcqScore}</div><div className="text-gray-600">Correct MCQs</div></div>
                                    <div><div className="text-2xl font-bold text-red-600">{mcqQuestions.length - mcqScore}</div><div className="text-gray-600">Incorrect MCQs</div></div>
                                    <div><div className="text-2xl font-bold text-blue-600">{codingQuestions.length}</div><div className="text-gray-600">Coding Questions</div></div>
                                    <div><div className="text-2xl font-bold text-purple-600">{userAnswers.length}</div><div className="text-gray-600">Total Attempted</div></div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Question Review</h3>
                            <div className="space-y-6">
                                {userAnswers.map((answer, index) => (
                                    <div key={index} className={`border rounded-lg p-4 ${answer.type === 'coding' ? 'border-orange-200 bg-orange-50' : answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-semibold">Q{index + 1}: {answer.question}</span>
                                            <span className={`px-2 py-1 rounded text-xs ${answer.type === 'coding' ? 'bg-orange-200 text-orange-800' : answer.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                {answer.type === 'coding' ? 'CODING' : answer.isCorrect ? 'CORRECT' : 'INCORRECT'}
                                            </span>
                                        </div>

                                        {answer.type === 'coding' ? (
                                            <div className="text-sm">
                                                <p className="font-semibold mb-2">Your Code:</p>
                                                <pre className="bg-white p-3 rounded border overflow-x-auto text-xs">
                                                    <code>{answer.userCode}</code>
                                                </pre>
                                            </div>
                                        ) : (
                                            <div className="text-sm">
                                                <p><strong>Your answer:</strong> {answer.selectedAnswer}</p>
                                                <p><strong>Correct answer:</strong> {answer.correctAnswer}</p>
                                                {answer.explanation && (
                                                    <p className="mt-2 text-gray-600"><strong>Explanation:</strong> {answer.explanation}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Google Form Button Section */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-yellow-800 mb-3">Next Step: Complete Online Test Form</h3>
                                <p className="text-yellow-700 mb-4">
                                    Please click the button below to complete the official Google Form for your Python test submission.
                                    This is required to finalize your application process.
                                </p>
                                <button
                                    onClick={handleGoogleFormClick}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center mx-auto"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.4 12.8H12v2.4h2.4V12.8zM21.6 12c0-1.2-.4-2.4-1.2-3.2l-2.4 2.4c.4.8.4 1.6.4 2.4 0 .8-.4 1.6-.4 2.4l2.4 2.4c.8-.8 1.2-2 1.2-3.2zM12 7.2c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4-2-4.4-4.4-4.4zM2.4 12c0-1.2.4-2.4 1.2-3.2l2.4 2.4c-.4.8-.4 1.6-.4 2.4 0 .8.4 1.6.4 2.4l-2.4 2.4c-.8-.8-1.2-2-1.2-3.2z" />
                                    </svg>
                                    Complete Google Form
                                </button>
                                <p className="text-yellow-600 text-sm mt-3">
                                    Note: If you are giving this test online, please fill the Google Form only. You don't need to take the test again.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={resetTest}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
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
                                    Your Python test results are saved in your browser's local storage.
                                    They will be available until you clear your browser data.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default PythonTest;