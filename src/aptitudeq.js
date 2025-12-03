export const aptitudeQuestions = [
    // ==================== 15 LOGICAL REASONING (1-15) ====================
    {
        id: 1,
        question: "Nine people A,B,C,D,E,F,G,H,I sit around a circular table (not necessarily in order). A and B are opposite. C is second to the left of D. E is third to the right of F and not adjacent to B. G sits between H and I. H is to the immediate left of A. Who is third to the left of B?",
        options: ["G", "E", "I", "C"],
        correctAnswer: "E",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 2,
        question: "In a queue, P is 8th from front, Q is 15th from back. When they exchange positions, P becomes 20th from back. How many people are in the queue?",
        options: ["28", "31", "33", "36"],
        correctAnswer: "31",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 3,
        question: "A man walks 10m south, turns right walks 6m, turns right walks 4m, turns left walks 8m, turns right walks 6m. How far and in which direction is he from starting point?",
        options: ["10m North", "8m South", "6m North", "10m South"],
        correctAnswer: "10m South",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 4,
        question: "'Good boys do fine always' is coded as 'nik ta re pa du', 'boys always get reward' as 'du pa zo ki', 'fine work get good rank' as 're ki sa ta zo'. What is the code for 'reward'?",
        options: ["ki", "zo", "sa", "nik"],
        correctAnswer: "ki",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 5,
        question: "P×Q means P is father of Q, P-Q means P is sister of Q, P+Q means P is mother of Q, P÷Q means P is brother of Q. Which of the following means R is daughter of T?",
        options: ["T×M+R-S", "T×R+M-S", "T+R×M-S", "T×S-R+M"],
        correctAnswer: "T×M+R-S",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 6,
        question: "Six friends A,B,C,D,E,F face north in two rows of three. A is left of B but not adjacent to C. D is opposite E. F is not adjacent to C or D. Who is opposite A?",
        options: ["F", "C", "D", "E"],
        correctAnswer: "F",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 7,
        question: "In a family of 8: A is father of B, C is mother of D, E is brother of F, G is wife of A, D is sister of B. How is F related to G?",
        options: ["Grandson", "Granddaughter", "Son", "Cannot be determined"],
        correctAnswer: "Cannot be determined",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 8,
        question: "If 'APPLE' is coded as 'ZKKOV' and 'ORANGE' is 'LIZMTV', how is 'MANGO' coded?",
        options: ["NZMTL", "NZMTN", "NZMTM", "NZMTJ"],
        correctAnswer: "NZMTN",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 9,
        question: "Eight boxes P to W are stacked. P is above Q, R is below S, T is above U but below V. W is at bottom. Q is not adjacent to U. Which box is exactly in the middle?",
        options: ["R", "T", "U", "V"],
        correctAnswer: "T",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 10,
        question: "A clock loses 3 minutes per hour. It is set right at 9 AM Monday. When will it show the correct time again?",
        options: ["9 AM Tuesday", "12 PM Tuesday", "3 PM Tuesday", "Never in 24 hrs"],
        correctAnswer: "Never in 24 hrs",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 11,
        question: "In a row, A is 12th from left, B is 18th from right. If 5 persons sit between them, total persons = ?",
        options: ["33", "34", "35", "36"],
        correctAnswer: "34",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 12,
        question: "A person pointing to a lady said, 'She is the only daughter of the woman who is mother of my mother's only son.' How is the lady related to the person?",
        options: ["Sister", "Daughter", "Niece", "Mother"],
        correctAnswer: "Sister",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 13,
        question: "Six persons entered a lift on ground floor. Floors are 1 to 10. Two got down at odd floors below 7, three at even floors above 4. One at 9th. Who got down at 6th floor?",
        options: ["Only one possible", "Two possible", "None", "Cannot be determined"],
        correctAnswer: "Only one possible",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 14,
        question: "If every 4th day a bus runs on Route A and every 6th day on Route B, on how many days in a year (365 days) will both routes run together?",
        options: ["15", "16", "17", "18"],
        correctAnswer: "17",
        difficulty: "hard",
        category: "Logical"
    },
    {
        id: 15,
        question: "In a tournament, 7 teams play each other once. A team gets 3 points for win, 1 for draw, 0 for loss. Total points = 39. How many draws occurred?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "6",
        difficulty: "hard",
        category: "Logical"
    },

    // ==================== 15 TECHNICAL (16-30) ====================
    {
        id: 16,
        question: "What is the output of the following C code?\n\n```c\n#include<stdio.h>\nint main() {\n    int x = 5;\n    printf(\"%d\", ++x > 5 ? x++ : --x);\n    printf(\" %d\", x);\n    return 0;\n}\n```",
        options: ["6 6", "5 5", "6 7", "5 4"],
        correctAnswer: "6 7",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 17,
        question: "In a binary search tree, which traversal produces sorted order?",
        options: ["Level order", "Preorder", "Inorder", "Postorder"],
        correctAnswer: "Inorder",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 18,
        question: "A system uses 3-level page table. Page size 4KB, logical address 32-bit, each page table entry 4 bytes. How much memory is used by page tables for a process with 4MB memory?",
        options: ["4 KB", "16 KB", "20 KB", "24 KB"],
        correctAnswer: "20 KB",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 19,
        question: "Which scheduling algorithm can cause starvation?",
        options: ["FCFS", "Round Robin", "SJF (non-preemptive)", "Priority (non-preemptive)"],
        correctAnswer: "Priority (non-preemptive)",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 20,
        question: "The minimum number of queues needed to implement priority queue using only queues is:",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 21,
        question: "In DBMS, if a transaction T1 has read a value written by T2 which later aborts, this is:",
        options: ["Dirty read", "Unrepeatable read", "Phantom read", "Lost update"],
        correctAnswer: "Dirty read",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 22,
        question: "What is the time complexity of matrix chain multiplication using dynamic programming for n matrices?",
        options: ["O(n)", "O(n²)", "O(n³)", "O(n log n)"],
        correctAnswer: "O(n³)",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 23,
        question: "In OSI model, which layer is responsible for dialog control and synchronization?",
        options: ["Transport", "Session", "Presentation", "Application"],
        correctAnswer: "Session",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 24,
        question: "A hash table with 10 slots uses linear probing. Keys 14, 24, 34, 44, 54, 64 are inserted. How many collisions occur?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "3",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 25,
        question: "What will be the output?\n\n```java\npublic class Test {\n    public static void main(String[] args) {\n        int x = 10;\n        System.out.println(x++ + ++x + x++);\n    }\n}\n```",
        options: ["30", "31", "32", "33"],
        correctAnswer: "33",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 26,
        question: "In a graph with n vertices, the maximum number of edges in a bipartite graph is:",
        options: ["n(n-1)/2", "floor(n²/4)", "n²", "n-1"],
        correctAnswer: "floor(n²/4)",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 27,
        question: "Which of the following is NOT a stable sorting algorithm?",
        options: ["Merge Sort", "Insertion Sort", "Quick Sort", "Bubble Sort"],
        correctAnswer: "Quick Sort",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 28,
        question: "In deadlock prevention, which condition is removed by spooling?",
        options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"],
        correctAnswer: "Hold and Wait",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 29,
        question: "The subnet mask 255.255.255.224 has how many usable hosts per subnet?",
        options: ["30", "32", "62", "64"],
        correctAnswer: "30",
        difficulty: "hard",
        category: "Technical"
    },
    {
        id: 30,
        question: "What is the worst-case time complexity of finding the kth smallest element using QuickSelect (randomized)?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: "O(n²)",
        difficulty: "hard",
        category: "Technical"
    },

    // ==================== 15 PURE REASONING (31-45) ====================
    {
        id: 31,
        question: "If all bloops are bleeps and some bleeps are blips, which must be true?",
        options: ["All bloops are blips", "Some bloops are blips", "No bloop is blip", "Cannot be determined"],
        correctAnswer: "Cannot be determined",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 32,
        question: "Find the missing number: 7, 15, 32, 66, 134, ?",
        options: ["270", "272", "268", "274"],
        correctAnswer: "270",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 33,
        question: "Statement: All successful people are hardworking. Some hardworking people fail. Conclusion: I. Some successful people fail. II. Some who fail are hardworking.",
        options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
        correctAnswer: "Only II follows",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 34,
        question: "In a certain code, 'RIVER' is written as '12345' and 'WATER' as '67849'. What is 'WINTER'?",
        options: ["628945", "628941", "628947", "628946"],
        correctAnswer: "628946",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 35,
        question: "A is twice as efficient as B. B alone takes 12 days more than A and B together. How many days does A alone take?",
        options: ["8", "9", "10", "12"],
        correctAnswer: "9",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 36,
        question: "If the 5th term of an AP is 20 and 12th term is 48, what is the 20th term?",
        options: ["76", "80", "84", "88"],
        correctAnswer: "80",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 37,
        question: "Data: X > Y > Z, W < Y, X > V. Which of the following is definitely false?",
        options: ["V > Z", "W < X", "Y > V", "W > Z"],
        correctAnswer: "W > Z",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 38,
        question: "Analogy: Doctor : Hospital :: Teacher : ?",
        options: ["School", "Student", "Book", "Classroom"],
        correctAnswer: "School",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 39,
        question: "A cube is painted red on all faces and cut into 125 smaller identical cubes. How many small cubes have exactly one face painted?",
        options: ["36", "48", "54", "60"],
        correctAnswer: "54",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 40,
        question: "If A + B means A is father of B, A × B means A is brother of B, A ÷ B means A is mother of B, then P × Q + R ÷ S means?",
        options: ["P is uncle of S", "P is father of S", "P is brother of S", "P is grandfather of S"],
        correctAnswer: "P is uncle of S",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 41,
        question: "Find the odd one out: 8, 27, 64, 125, 216, 343, 512, 729 (based on a different pattern)",
        options: ["216", "343", "512", "729"],
        correctAnswer: "216",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 42,
        question: "If 64 people are in a room and each shakes hands with exactly 32 others, how many handshakes occur?",
        options: ["992", "1008", "1024", "1088"],
        correctAnswer: "1024",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 43,
        question: "Statement: Some cats are rats. All rats are bats. Conclusion: I. Some cats are bats. II. No cat is bat.",
        options: ["Only I", "Only II", "Either I or II", "Neither"],
        correctAnswer: "Only I",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 44,
        question: "A train leaves at 13:00 hrs and reaches at 17:30 hrs covering 240 km. Another train leaves at 14:30 hrs in same direction at 80 km/h. When will second train overtake the first?",
        options: ["16:30", "17:00", "17:30", "18:00"],
        correctAnswer: "17:00",
        difficulty: "hard",
        category: "Reasoning"
    },
    {
        id: 45,
        question: "How many triangles are in a complete pentagram (star inside pentagon with all intersections)?",
        options: ["30", "32", "35", "40"],
        correctAnswer: "35",
        difficulty: "hard",
        category: "Reasoning"
    }
];

export default aptitudeQuestions;