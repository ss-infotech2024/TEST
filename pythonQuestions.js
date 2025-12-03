// Python Questions Data - 45 Questions
export const pythonQuestions = [
    // Basic Syntax (5 questions)
    {
        id: 1,
        question: "What is the output of: print(2 ** 3 ** 2)",
        options: ["64", "512", "256", "Syntax Error"],
        correctAnswer: "512",
        category: "Basic Syntax",
        difficulty: "medium",
        explanation: "Exponentiation is right-associative in Python, so 3**2=9, then 2**9=512"
    },
    {
        id: 2,
        question: "What will be the output of: print(3 * 'ab' + 'c')",
        options: ["abababc", "abababcc", "abcabcabc", "Error"],
        correctAnswer: "abababc",
        category: "Basic Syntax",
        difficulty: "easy",
        explanation: "String multiplication repeats the string, so 3 * 'ab' = 'ababab', then + 'c' = 'abababc'"
    },
    {
        id: 3,
        question: "What is the output of: print([x**2 for x in range(5)])",
        options: ["[0, 1, 4, 9, 16]", "[1, 4, 9, 16, 25]", "[0, 1, 4, 9, 16, 25]", "Error"],
        correctAnswer: "[0, 1, 4, 9, 16]",
        category: "Basic Syntax",
        difficulty: "easy",
        explanation: "range(5) generates [0,1,2,3,4] and each element is squared"
    },
    {
        id: 4,
        question: "What does the 'pass' statement do in Python?",
        options: ["Stops the program", "Skips the current iteration", "Does nothing, used as placeholder", "Passes variables between functions"],
        correctAnswer: "Does nothing, used as placeholder",
        category: "Basic Syntax",
        difficulty: "easy",
        explanation: "'pass' is a null operation - it's used when a statement is required syntactically but you don't want any command to execute"
    },
    {
        id: 5,
        question: "What is the output of: print(len('Python\\n'))",
        options: ["6", "7", "5", "Error"],
        correctAnswer: "7",
        category: "Basic Syntax",
        difficulty: "medium",
        explanation: "\\n is a single character (newline), so 'Python\\n' has 7 characters"
    },

    // Data Types (5 questions)
    {
        id: 6,
        question: "Which of the following is mutable in Python?",
        options: ["Tuple", "String", "List", "Frozenset"],
        correctAnswer: "List",
        category: "Data Types",
        difficulty: "easy",
        explanation: "Lists are mutable while tuples, strings, and frozensets are immutable"
    },
    {
        id: 7,
        question: "What is the difference between a list and a tuple?",
        options: ["Lists are immutable, tuples are mutable", "Tuples are faster than lists", "Lists are mutable, tuples are immutable", "There is no difference"],
        correctAnswer: "Lists are mutable, tuples are immutable",
        category: "Data Types",
        difficulty: "easy",
        explanation: "Lists can be modified after creation, tuples cannot be modified"
    },
    {
        id: 8,
        question: "Which of these is NOT a built-in data structure in Python?",
        options: ["List", "Dictionary", "Array", "Set"],
        correctAnswer: "Array",
        category: "Data Types",
        difficulty: "medium",
        explanation: "Array is not a built-in data structure; it's available through the array module or numpy"
    },
    {
        id: 9,
        question: "How do you create a dictionary in Python?",
        options: ["{key: value}", "(key: value)", "[key: value]", "<key: value>"],
        correctAnswer: "{key: value}",
        category: "Data Types",
        difficulty: "easy",
        explanation: "Dictionaries are created using curly braces {} with key-value pairs"
    },
    {
        id: 10,
        question: "Which method is used to add an element to a set?",
        options: ["add()", "append()", "insert()", "push()"],
        correctAnswer: "add()",
        category: "Data Types",
        difficulty: "easy",
        explanation: "Sets use add() method to add elements, unlike lists which use append()"
    },

    // Functions (6 questions)
    {
        id: 11,
        question: "What does the 'yield' keyword do in Python?",
        options: ["Returns a value and terminates the function", "Creates a generator function", "Used for exception handling", "Imports a module"],
        correctAnswer: "Creates a generator function",
        category: "Functions",
        difficulty: "medium",
        explanation: "The yield keyword is used to create generator functions that can pause and resume execution"
    },
    {
        id: 12,
        question: "What does the 'lambda' keyword create in Python?",
        options: ["A named function", "An anonymous function", "A class method", "A generator"],
        correctAnswer: "An anonymous function",
        category: "Functions",
        difficulty: "medium",
        explanation: "Lambda functions are small anonymous functions defined with the lambda keyword"
    },
    {
        id: 13,
        question: "What is the purpose of *args in Python function definitions?",
        options: ["To accept keyword arguments", "To accept any number of positional arguments", "To accept only integer arguments", "To accept variable-length keyword arguments"],
        correctAnswer: "To accept any number of positional arguments",
        category: "Functions",
        difficulty: "medium",
        explanation: "*args allows a function to accept any number of positional arguments"
    },
    {
        id: 14,
        question: "What is the purpose of **kwargs in Python function definitions?",
        options: ["To accept positional arguments", "To accept any number of keyword arguments", "To accept only string arguments", "To accept variable-length positional arguments"],
        correctAnswer: "To accept any number of keyword arguments",
        category: "Functions",
        difficulty: "medium",
        explanation: "**kwargs allows a function to accept any number of keyword arguments"
    },
    {
        id: 15,
        question: "What is a decorator in Python?",
        options: ["A function that modifies another function", "A special type of variable", "A way to comment code", "A module import statement"],
        correctAnswer: "A function that modifies another function",
        category: "Functions",
        difficulty: "hard",
        explanation: "Decorators are functions that take another function and extend its behavior without explicitly modifying it"
    },
    {
        id: 16,
        question: "What is the difference between a function and a method in Python?",
        options: ["There is no difference", "Methods are defined inside classes, functions are not", "Functions can take parameters, methods cannot", "Methods are faster than functions"],
        correctAnswer: "Methods are defined inside classes, functions are not",
        category: "Functions",
        difficulty: "medium",
        explanation: "Methods are functions that are associated with a class and have access to the class instance via 'self'"
    },

    // OOP (6 questions)
    {
        id: 17,
        question: "What does the __init__ method do in a Python class?",
        options: ["Destroys the object", "Initializes the class attributes", "Imports dependencies", "Handles exceptions"],
        correctAnswer: "Initializes the class attributes",
        category: "OOP",
        difficulty: "easy",
        explanation: "__init__ is the constructor method that initializes new object instances"
    },
    {
        id: 18,
        question: "What is the purpose of the 'self' parameter in Python class methods?",
        options: ["It refers to the class itself", "It refers to the instance of the class", "It's optional and can be omitted", "It refers to the parent class"],
        correctAnswer: "It refers to the instance of the class",
        category: "OOP",
        difficulty: "medium",
        explanation: "'self' represents the instance of the class and is used to access variables and methods associated with the current object"
    },
    {
        id: 19,
        question: "What is inheritance in Python?",
        options: ["A way to hide data", "A mechanism where a class derives properties from another class", "A way to create multiple instances", "A method to import modules"],
        correctAnswer: "A mechanism where a class derives properties from another class",
        category: "OOP",
        difficulty: "medium",
        explanation: "Inheritance allows a class to inherit attributes and methods from another class"
    },
    {
        id: 20,
        question: "What is polymorphism in Python?",
        options: ["The ability to use a common interface for different data types", "The process of hiding implementation details", "The ability to create multiple classes", "The process of inheriting from multiple classes"],
        correctAnswer: "The ability to use a common interface for different data types",
        category: "OOP",
        difficulty: "medium",
        explanation: "Polymorphism allows methods to do different things based on the object it is acting upon"
    },
    {
        id: 21,
        question: "What is encapsulation in Python?",
        options: ["The process of inheriting properties", "The bundling of data and methods that operate on that data", "The ability to take many forms", "The process of creating objects"],
        correctAnswer: "The bundling of data and methods that operate on that data",
        category: "OOP",
        difficulty: "medium",
        explanation: "Encapsulation is the concept of wrapping data and the methods that work on data within one unit"
    },
    {
        id: 22,
        question: "How do you create a private variable in a Python class?",
        options: ["Using single underscore _variable", "Using double underscore __variable", "Using the private keyword", "Python doesn't support private variables"],
        correctAnswer: "Using double underscore __variable",
        category: "OOP",
        difficulty: "medium",
        explanation: "Double underscore prefix makes a variable name-mangled, which is Python's way of making it private"
    },

    // List Comprehension (3 questions)
    {
        id: 23,
        question: "What will be the output of: [x for x in range(10) if x % 2 == 0]",
        options: ["[0, 2, 4, 6, 8]", "[1, 3, 5, 7, 9]", "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]", "[2, 4, 6, 8]"],
        correctAnswer: "[0, 2, 4, 6, 8]",
        category: "List Comprehension",
        difficulty: "easy",
        explanation: "This list comprehension generates even numbers from 0 to 8"
    },
    {
        id: 24,
        question: "How would you create a list of tuples using list comprehension? Example: [(1,1), (2,4), (3,9)]",
        options: ["[(x, x**2) for x in range(1,4)]", "[x, x**2 for x in range(1,4)]", "[(x, x*2) for x in range(1,4)]", "list((x, x**2) for x in range(1,4))"],
        correctAnswer: "[(x, x**2) for x in range(1,4)]",
        category: "List Comprehension",
        difficulty: "medium",
        explanation: "This creates tuples of numbers and their squares for range 1 to 3"
    },
    {
        id: 25,
        question: "What is the difference between [x for x in range(5)] and (x for x in range(5))?",
        options: ["First is list, second is tuple", "First is list, second is generator", "First is tuple, second is list", "Both are the same"],
        correctAnswer: "First is list, second is generator",
        category: "List Comprehension",
        difficulty: "medium",
        explanation: "Square brackets create a list comprehension, parentheses create a generator expression"
    },

    // Libraries (3 questions)
    {
        id: 26,
        question: "Which module is used for regular expressions in Python?",
        options: ["regex", "re", "regexp", "pattern"],
        correctAnswer: "re",
        category: "Libraries",
        difficulty: "easy",
        explanation: "The 're' module provides regular expression matching operations"
    },
    {
        id: 27,
        question: "Which library is commonly used for numerical computations in Python?",
        options: ["NumPy", "Math", "Calc", "Compute"],
        correctAnswer: "NumPy",
        category: "Libraries",
        difficulty: "easy",
        explanation: "NumPy is the fundamental package for scientific computing with Python"
    },
    {
        id: 28,
        question: "Which library is used for data manipulation and analysis?",
        options: ["Pandas", "NumPy", "Matplotlib", "SciPy"],
        correctAnswer: "Pandas",
        category: "Libraries",
        difficulty: "easy",
        explanation: "Pandas provides data structures and data analysis tools for Python"
    },

    // String Operations (4 questions)
    {
        id: 29,
        question: "What is the output of: 'hello'.upper()",
        options: ["HELLO", "Hello", "hello", "Error"],
        correctAnswer: "HELLO",
        category: "String Operations",
        difficulty: "easy",
        explanation: "upper() method converts all characters to uppercase"
    },
    {
        id: 30,
        question: "What does the string method split() do?",
        options: ["Combines strings", "Splits string into list of substrings", "Removes whitespace", "Converts to lowercase"],
        correctAnswer: "Splits string into list of substrings",
        category: "String Operations",
        difficulty: "easy",
        explanation: "split() method splits a string into a list where each word is a list item"
    },
    {
        id: 31,
        question: "What is the output of: ' python '.strip()",
        options: ["python", " python", "python ", " python "],
        correctAnswer: "python",
        category: "String Operations",
        difficulty: "easy",
        explanation: "strip() method removes any leading and trailing whitespace"
    },
    {
        id: 32,
        question: "How do you check if a string contains only digits?",
        options: ["string.isdigit()", "string.contains_digits()", "string.has_digits()", "string.check_digits()"],
        correctAnswer: "string.isdigit()",
        category: "String Operations",
        difficulty: "easy",
        explanation: "isdigit() method returns True if all characters in the string are digits"
    },

    // Error Handling (3 questions)
    {
        id: 33,
        question: "How do you handle exceptions in Python?",
        options: ["using error: ... catch:", "using try: ... except:", "using catch: ... try:", "using handle: ... exception:"],
        correctAnswer: "using try: ... except:",
        category: "Error Handling",
        difficulty: "easy",
        explanation: "Python uses try-except blocks for exception handling"
    },
    {
        id: 34,
        question: "What is the purpose of the 'finally' clause in exception handling?",
        options: ["To handle specific exceptions", "To execute code regardless of whether an exception occurred", "To raise new exceptions", "To skip exception handling"],
        correctAnswer: "To execute code regardless of whether an exception occurred",
        category: "Error Handling",
        difficulty: "medium",
        explanation: "The finally block always executes, whether an exception occurred or not"
    },
    {
        id: 35,
        question: "What does the 'else' clause do in try-except blocks?",
        options: ["Handles any uncaught exceptions", "Executes if no exception occurred", "Executes only if an exception occurred", "Is required for try-except to work"],
        correctAnswer: "Executes if no exception occurred",
        category: "Error Handling",
        difficulty: "medium",
        explanation: "The else clause executes only if the try block doesn't raise an exception"
    },

    // Advanced Concepts (4 questions)
    {
        id: 36,
        question: "What are context managers in Python?",
        options: ["Functions that manage class contexts", "Objects that define runtime context", "Modules for context switching", "Variables with context scope"],
        correctAnswer: "Objects that define runtime context",
        category: "Advanced Concepts",
        difficulty: "hard",
        explanation: "Context managers allow you to allocate and release resources precisely when you want to using the 'with' statement"
    },
    {
        id: 37,
        question: "What is the Global Interpreter Lock (GIL) in Python?",
        options: ["A lock that allows multiple threads", "A mutex that protects access to Python objects", "A global variable lock", "An interpreter optimization"],
        correctAnswer: "A mutex that protects access to Python objects",
        category: "Advanced Concepts",
        difficulty: "hard",
        explanation: "GIL is a mutex that allows only one thread to execute Python bytecode at a time"
    },
    {
        id: 38,
        question: "What are metaclasses in Python?",
        options: ["Classes of classes", "Special types of methods", "Advanced class decorators", "Module-level classes"],
        correctAnswer: "Classes of classes",
        category: "Advanced Concepts",
        difficulty: "hard",
        explanation: "Metaclasses are classes that define the behavior of other classes"
    },
    {
        id: 39,
        question: "What is duck typing in Python?",
        options: ["A type of inheritance", "A way to handle exceptions", "An object's type is determined by its methods and properties", "A method for type conversion"],
        correctAnswer: "An object's type is determined by its methods and properties",
        category: "Advanced Concepts",
        difficulty: "medium",
        explanation: "Duck typing focuses on what an object can do rather than what it is"
    },

    // List Slicing (3 questions)
    {
        id: 40,
        question: "What will be the output of: print([1, 2, 3, 4, 5][1:4])",
        options: ["[1, 2, 3]", "[2, 3, 4]", "[1, 2, 3, 4]", "[2, 3, 4, 5]"],
        correctAnswer: "[2, 3, 4]",
        category: "List Slicing",
        difficulty: "easy",
        explanation: "Slicing [1:4] means from index 1 to index 3 (4 is exclusive)"
    },
    {
        id: 41,
        question: "What does [::-1] do to a list?",
        options: ["Reverses the list", "Sorts the list", "Removes the first element", "Duplicates the list"],
        correctAnswer: "Reverses the list",
        category: "List Slicing",
        difficulty: "medium",
        explanation: "[::-1] is a common idiom to reverse a list or string"
    },
    {
        id: 42,
        question: "What is the output of: 'python'[1:4]",
        options: ["yth", "pyt", "thon", "python"],
        correctAnswer: "yth",
        category: "List Slicing",
        difficulty: "easy",
        explanation: "String slicing works the same as list slicing, so indices 1 to 3 give 'yth'"
    },

    // Modules (3 questions)
    {
        id: 43,
        question: "What is the purpose of 'if __name__ == \"__main__\":' in Python?",
        options: ["It's required for all Python scripts", "It makes the code run faster", "It prevents code from running when imported", "It imports the main module"],
        correctAnswer: "It prevents code from running when imported",
        category: "Modules",
        difficulty: "medium",
        explanation: "This idiom allows code to run only when the script is executed directly, not when imported as a module"
    },
    {
        id: 44,
        question: "How do you import a specific function from a module?",
        options: ["import function from module", "from module import function", "import module.function", "include function from module"],
        correctAnswer: "from module import function",
        category: "Modules",
        difficulty: "easy",
        explanation: "The 'from module import function' syntax imports a specific function from a module"
    },
    {
        id: 45,
        question: "What is the purpose of the __init__.py file in a Python package?",
        options: ["It makes the directory a Python package", "It initializes all variables", "It contains package documentation", "It's required for all Python files"],
        correctAnswer: "It makes the directory a Python package",
        category: "Modules",
        difficulty: "medium",
        explanation: "__init__.py files are required to make Python treat directories containing them as packages"
    }
];