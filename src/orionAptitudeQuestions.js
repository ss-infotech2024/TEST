// orionAptitudeQuestions.js
const orionAptitudeQuestions = [
    // ==================== RFID TECHNOLOGY QUESTIONS (1-15) ====================
    {
        id: 1,
        question: "What does RFID stand for?",
        options: [
            "Radio Frequency Identification",
            "Radio Frequency Information Device",
            "Remote Field Identification",
            "Radio Field Information Data"
        ],
        correctAnswer: "Radio Frequency Identification",
        difficulty: "easy",
        category: "RFID Technology"
    },
    {
        id: 2,
        question: "Which frequency range is typically used for UHF RFID tags according to Orion RFID's products?",
        options: [
            "125-134 kHz",
            "13.56 MHz",
            "860-960 MHz",
            "2.45 GHz"
        ],
        correctAnswer: "860-960 MHz",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 3,
        question: "What is the primary advantage of RFID over barcode technology?",
        options: [
            "Lower cost per tag",
            "Line of sight not required",
            "Smaller tag size",
            "Simpler encoding process"
        ],
        correctAnswer: "Line of sight not required",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 4,
        question: "According to Orion RFID's offerings, which type of RFID tag is best for metal surfaces?",
        options: [
            "Paper tags",
            "Ceramic tags",
            "Metal mount tags",
            "Plastic tags"
        ],
        correctAnswer: "Metal mount tags",
        difficulty: "hard",
        category: "RFID Technology"
    },
    {
        id: 5,
        question: "What year was Orion RFID Solutions established?",
        options: ["2015", "2016", "2017", "2018"],
        correctAnswer: "2017",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 6,
        question: "Who is the mentor guiding Orion RFID Solutions according to their profile?",
        options: [
            "Mr. Ravi Sharma",
            "Mr. Satish Mangal Masih",
            "Mr. Anil Kumar",
            "Mr. Vikram Patel"
        ],
        correctAnswer: "Mr. Satish Mangal Masih",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 7,
        question: "What is the main application of RFID in retail according to Orion RFID's solutions?",
        options: [
            "Temperature monitoring",
            "Inventory management",
            "Employee tracking",
            "Power consumption"
        ],
        correctAnswer: "Inventory management",
        difficulty: "medium",
        category: "RFID Applications"
    },
    {
        id: 8,
        question: "Which of the following is NOT a product offered by Orion RFID?",
        options: [
            "RFID Tags",
            "UHF RFID Tags",
            "RFID Cards",
            "RFID Satellites"
        ],
        correctAnswer: "RFID Satellites",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 9,
        question: "What does EPC stand for in RFID context?",
        options: [
            "Electronic Product Code",
            "Electronic Price Code",
            "Energy Power Control",
            "Electronic Processing Chip"
        ],
        correctAnswer: "Electronic Product Code",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 10,
        question: "What is the typical read range of UHF RFID tags according to Orion's specifications?",
        options: [
            "1-3 meters",
            "3-10 meters",
            "10-15 meters",
            "15-20 meters"
        ],
        correctAnswer: "3-10 meters",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 11,
        question: "What manufacturing approach does Orion RFID emphasize in their profile?",
        options: [
            "Mass production with automation",
            "Handcrafted traditional methods",
            "Using latest technology with market norms",
            "Outsourced manufacturing"
        ],
        correctAnswer: "Using latest technology with market norms",
        difficulty: "medium",
        category: "Company Profile"
    },
    {
        id: 12,
        question: "Which of these is a key feature of Orion RFID products mentioned in their profile?",
        options: [
            "High power consumption",
            "Complex installation",
            "Long service life",
            "Limited compatibility"
        ],
        correctAnswer: "Long service life",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 13,
        question: "What is the main business model of Orion RFID Solutions?",
        options: [
            "Only manufacturing",
            "Only retailing",
            "Manufacturing, retailing and wholesaling",
            "Only consulting services"
        ],
        correctAnswer: "Manufacturing, retailing and wholesaling",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 14,
        question: "What is passive RFID?",
        options: [
            "Tags with battery for transmission",
            "Tags powered by reader's signal",
            "Tags with solar panels",
            "Tags that work only in sunlight"
        ],
        correctAnswer: "Tags powered by reader's signal",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 15,
        question: "Which industry application is NOT typically mentioned for RFID by companies like Orion?",
        options: [
            "Logistics and supply chain",
            "Healthcare patient tracking",
            "Library book management",
            "Food taste enhancement"
        ],
        correctAnswer: "Food taste enhancement",
        difficulty: "easy",
        category: "RFID Applications"
    },

    // ==================== TECHNICAL & LOGICAL QUESTIONS (16-30) ====================
    {
        id: 16,
        question: "If a warehouse uses RFID to track 1000 items, and each tag costs ₹20, but reduces inventory counting time by 80% (saving ₹5000 monthly), what is the ROI period?",
        options: [
            "2 months",
            "4 months",
            "6 months",
            "8 months"
        ],
        correctAnswer: "4 months",
        difficulty: "hard",
        category: "Business Logic"
    },
    {
        id: 17,
        question: "A manufacturing defect rate is 2% for RFID tags. If Orion produces 50,000 tags monthly, how many are defective on average?",
        options: ["100", "500", "1000", "2000"],
        correctAnswer: "1000",
        difficulty: "medium",
        category: "Business Logic"
    },
    {
        id: 18,
        question: "Which standard governs UHF RFID globally?",
        options: [
            "ISO 9001",
            "EPCglobal Gen2",
            "IEEE 802.11",
            "Bluetooth 5.0"
        ],
        correctAnswer: "EPCglobal Gen2",
        difficulty: "hard",
        category: "RFID Technology"
    },
    {
        id: 19,
        question: "If 5 RFID readers can cover 5000 sq ft, how many readers needed for 20000 sq ft warehouse?",
        options: ["15", "20", "25", "30"],
        correctAnswer: "20",
        difficulty: "medium",
        category: "Business Logic"
    },
    {
        id: 20,
        question: "What does 'read rate' refer to in RFID systems?",
        options: [
            "Speed of data transfer",
            "Percentage of tags successfully read",
            "Number of reads per second",
            "Distance of reading"
        ],
        correctAnswer: "Percentage of tags successfully read",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 21,
        question: "Orion RFID mentions getting 'repeat orders'. What does this indicate about their business?",
        options: [
            "High customer dissatisfaction",
            "Customer loyalty and satisfaction",
            "Limited product range",
            "Poor marketing"
        ],
        correctAnswer: "Customer loyalty and satisfaction",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 22,
        question: "What is the primary material used in RFID antenna manufacturing?",
        options: ["Copper", "Aluminum", "Silver", "All of the above"],
        correctAnswer: "All of the above",
        difficulty: "hard",
        category: "RFID Technology"
    },
    {
        id: 23,
        question: "If RFID reduces inventory shrinkage by 30% from previous ₹100,000 loss, what is new shrinkage amount?",
        options: ["₹30,000", "₹50,000", "₹70,000", "₹90,000"],
        correctAnswer: "₹70,000",
        difficulty: "medium",
        category: "Business Logic"
    },
    {
        id: 24,
        question: "Which department at Orion RFID handles tag design according to their profile?",
        options: [
            "Separate manufacturing department",
            "Marketing department",
            "Sales department",
            "Finance department"
        ],
        correctAnswer: "Separate manufacturing department",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 25,
        question: "What is 'anti-collision' in RFID terminology?",
        options: [
            "Preventing physical tag damage",
            "Multiple tags responding simultaneously",
            "Reader interference avoidance",
            "Signal encryption"
        ],
        correctAnswer: "Multiple tags responding simultaneously",
        difficulty: "hard",
        category: "RFID Technology"
    },
    {
        id: 26,
        question: "Orion RFID is described as 'client-centric'. What does this mean?",
        options: [
            "Focus on cheapest products",
            "Work dedicatedly to please clients",
            "Only serve large corporations",
            "Ignore customer feedback"
        ],
        correctAnswer: "Work dedicatedly to please clients",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 27,
        question: "Which frequency is used for animal tracking RFID?",
        options: [
            "Low frequency (125-134 kHz)",
            "High frequency (13.56 MHz)",
            "UHF (860-960 MHz)",
            "Microwave (2.45 GHz)"
        ],
        correctAnswer: "Low frequency (125-134 kHz)",
        difficulty: "hard",
        category: "RFID Technology"
    },
    {
        id: 28,
        question: "If Orion increases production by 15% monthly from 50,000 tags, what will be production after 3 months?",
        options: [
            "57,500 tags",
            "65,000 tags",
            "76,000 tags",
            "87,000 tags"
        ],
        correctAnswer: "76,000 tags",
        difficulty: "hard",
        category: "Business Logic"
    },
    {
        id: 29,
        question: "What is 'write endurance' in RFID tags?",
        options: [
            "Number of read cycles",
            "Number of write/rewrite cycles",
            "Battery life",
            "Physical durability"
        ],
        correctAnswer: "Number of write/rewrite cycles",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 30,
        question: "According to Orion's profile, what guides their innovative ideas?",
        options: [
            "Market trends only",
            "Customer suggestions only",
            "Mentor's guidance and employee collaboration",
            "Competitor copying"
        ],
        correctAnswer: "Mentor's guidance and employee collaboration",
        difficulty: "medium",
        category: "Company Profile"
    },

    // ==================== REASONING & PROBLEM SOLVING (31-45) ====================
    {
        id: 31,
        question: "If RFID implementation reduces manual counting from 8 hours to 2 hours daily for 5 employees, what is weekly time saving?",
        options: [
            "120 hours",
            "150 hours",
            "180 hours",
            "210 hours"
        ],
        correctAnswer: "150 hours",
        difficulty: "hard",
        category: "Business Logic"
    },
    {
        id: 32,
        question: "Which is NOT a benefit mentioned in Orion RFID's profile?",
        options: [
            "Easy to use",
            "Lightweight",
            "Fine finishing",
            "High power consumption"
        ],
        correctAnswer: "High power consumption",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 33,
        question: "What is the main challenge for RFID implementation in liquid containers?",
        options: [
            "Signal absorption by liquid",
            "High cost",
            "Large tag size",
            "Government regulations"
        ],
        correctAnswer: "Signal absorption by liquid",
        difficulty: "hard",
        category: "RFID Technology"
    },
    {
        id: 34,
        question: "If a retail store has 10,000 items with RFID tags costing ₹15 each, and implementation cost is ₹50,000, what is total investment?",
        options: [
            "₹1,50,000",
            "₹2,00,000",
            "₹2,50,000",
            "₹3,00,000"
        ],
        correctAnswer: "₹2,00,000",
        difficulty: "medium",
        category: "Business Logic"
    },
    {
        id: 35,
        question: "What does 'ISO 18000-6C' refer to?",
        options: [
            "Quality management standard",
            "UHF RFID air interface standard",
            "Environmental standard",
            "Safety standard"
        ],
        correctAnswer: "UHF RFID air interface standard",
        difficulty: "hard",
        category: "RFID Technology"
    },
    {
        id: 36,
        question: "Orion RFID mentions 'array of products'. What does this indicate?",
        options: [
            "Limited product selection",
            "Wide variety of products",
            "Only one product type",
            "Custom products only"
        ],
        correctAnswer: "Wide variety of products",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 37,
        question: "If tag readability is 98% and you scan 1000 items, how many might not be read?",
        options: ["2", "20", "50", "100"],
        correctAnswer: "20",
        difficulty: "medium",
        category: "Business Logic"
    },
    {
        id: 38,
        question: "What is 'RFID middleware'?",
        options: [
            "Physical layer between tag and reader",
            "Software that connects RFID hardware to business applications",
            "Type of antenna",
            "Power management system"
        ],
        correctAnswer: "Software that connects RFID hardware to business applications",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 39,
        question: "Which quality is emphasized about Orion's mentor Mr. Satish Mangal Masih?",
        options: [
            "Creative and skillful",
            "Strict and demanding",
            "Hands-off approach",
            "Technical only"
        ],
        correctAnswer: "Creative and skillful",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 40,
        question: "If RFID reduces stockouts from 10% to 2% for ₹10 lakh inventory, what is value of improvement?",
        options: [
            "₹20,000",
            "₹40,000",
            "₹60,000",
            "₹80,000"
        ],
        correctAnswer: "₹80,000",
        difficulty: "hard",
        category: "Business Logic"
    },
    {
        id: 41,
        question: "What is the purpose of 'kill password' in RFID tags?",
        options: [
            "To increase read range",
            "To permanently disable tag",
            "To change frequency",
            "To improve durability"
        ],
        correctAnswer: "To permanently disable tag",
        difficulty: "hard",
        category: "RFID Technology"
    },
    {
        id: 42,
        question: "Orion RFID operates in which business domains?",
        options: [
            "Only manufacturing",
            "Only services",
            "Retailing, wholesaling and manufacturing",
            "Only consulting"
        ],
        correctAnswer: "Retailing, wholesaling and manufacturing",
        difficulty: "easy",
        category: "Company Profile"
    },
    {
        id: 43,
        question: "What is typical data storage capacity of UHF RFID tags?",
        options: [
            "96 bits to 512 bits",
            "1 KB to 4 KB",
            "64 MB to 128 MB",
            "500 GB to 1 TB"
        ],
        correctAnswer: "96 bits to 512 bits",
        difficulty: "medium",
        category: "RFID Technology"
    },
    {
        id: 44,
        question: "If Orion receives repeat orders, what metric does this improve?",
        options: [
            "Customer acquisition cost",
            "Customer lifetime value",
            "Marketing spend",
            "Product development time"
        ],
        correctAnswer: "Customer lifetime value",
        difficulty: "medium",
        category: "Business Logic"
    },
    {
        id: 45,
        question: "What environmental factor MOST affects RFID performance?",
        options: [
            "Temperature",
            "Metal interference",
            "Humidity",
            "Light intensity"
        ],
        correctAnswer: "Metal interference",
        difficulty: "hard",
        category: "RFID Technology"
    }
];

export default orionAptitudeQuestions;