const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate input (basic validation)
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Save data to file (simple JSON storage)
    const data = { email, password };

    fs.readFile('data.json', (err, fileData) => {
        let jsonData = [];
        if (!err) {
            jsonData = JSON.parse(fileData);
        }
        jsonData.push(data);
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error saving data:', err);
                return res.status(500).json({ message: 'Error saving data' });
            }
            res.status(200).json({ message: 'Problem solved successfully!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
