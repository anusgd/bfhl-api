const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
function isLetter(char) {
    return /^[a-zA-Z]$/.test(char);
}

function isDigit(char) {
    return /^[0-9]$/.test(char);
}

function createConcatString(alphabets) {
    let allChars = [];
    
    // Extract all characters from alphabets
    for (let item of alphabets) {
        for (let char of item) {
            if (isLetter(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    }
    
    // Reverse the array
    allChars.reverse();
    
    // Apply alternating caps
    let result = '';
    for (let i = 0; i < allChars.length; i++) {
        if (i % 2 === 0) {
            result += allChars[i].toLowerCase();
        } else {
            result += allChars[i].toUpperCase();
        }
    }
    
    return result;
}

// Main API endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Data should be an array"
            });
        }

        let oddNumbers = [];
        let evenNumbers = [];
        let alphabets = [];
        let specialCharacters = [];
        let sum = 0;

        // Process each item
        for (let item of data) {
            const itemStr = String(item);
            
            // If it's a number
            if (/^-?\d+$/.test(itemStr)) {
                const num = parseInt(itemStr);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(itemStr);
                } else {
                    oddNumbers.push(itemStr);
                }
            }
            // If it's only letters
            else if (/^[a-zA-Z]+$/.test(itemStr)) {
                alphabets.push(itemStr.toUpperCase());
            }
            // If it's a special character
            else if (itemStr.length === 1 && !isLetter(itemStr) && !isDigit(itemStr)) {
                specialCharacters.push(itemStr);
            }
        }

        const concatString = createConcatString(alphabets);

        // IMPORTANT: Replace these with YOUR details
        const response = {
            is_success: true,
            user_id: "anupama_nachi_15062004", // Change this to: yourname_ddmmyyyy
            email: "anupama.nachiappan2022@vitstudent.ac.in", // Change to your email
            roll_number: "22BCT0220", // Change to your roll number
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "Server error"
        });
    }
});

// GET endpoint for testing
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Home page
app.get('/', (req, res) => {
    res.json({ message: "API is working! Use POST /bfhl" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;