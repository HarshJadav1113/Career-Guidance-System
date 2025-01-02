    // server.js

    // Import necessary modules
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const path = require('path');
    const bcrypt = require('bcrypt');

    // Create an Express application
    const app = express();
    const PORT = 3000;

    // Sample users data (you may replace this with a database)
    let users = [];

    // Middleware for parsing JSON bodies
    app.use(bodyParser.json());

    // Middleware for serving static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Middleware for session management
    app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: true
    }));

    // Middleware for checking if the user is authenticated
    const isAuthenticated = (req, res, next) => {
        // Check if the user is authenticated (you may implement more sophisticated logic here)
        const isLoggedIn = req.session.isLoggedIn;

        // If the user is authenticated, proceed to the next middleware or route handler
        if (isLoggedIn) {
            return next();
        }

        // If the user is not authenticated, redirect to the login page
        res.redirect('/login.html');
    };

    // Registration route
    app.post('/register', async (req, res) => {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.json({ success: false, message: 'Passwords do not match' });
        }

        const userExists = users.some(user => user.email === email);
        if (userExists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ email, password: hashedPassword });

        // Set the 'isLoggedIn' session variable to true after successful registration
        req.session.isLoggedIn = true;

        res.json({ success: true, message: 'User registered successfully' });
    });

    // Login route
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;

        const user = users.find(user => user.email === email);

        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        // Set the 'isLoggedIn' session variable to true after successful login
        req.session.isLoggedIn = true;

        res.json({ success: true, message: 'Login successful' });
    });

    // Logout route
    app.post('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.json({ success: false, message: 'Failed to logout' });
            }
            res.json({ success: true, message: 'Logout successful' });
        });
    });

    // Route to serve main.html for authenticated users
    app.get('/main', isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'main.html'));
    });

    // Route to handle initial career guidance upon page load
    app.get('/initial-career-guidance', isAuthenticated, (req, res) => {
        // Mock data for initial career guidance
        const suggestions = [
            {
                career: 'Software Developer',
                interests: ['technology'],
                skills: ['programming', 'analysis']
            },
            {
                career: 'Graphic Designer',
                interests: ['arts'],
                skills: ['design']
            },
            {
                career: 'Financial Analyst',
                interests: ['finance'],
                skills: ['analysis', 'financial-planning']
            },
            // Add more mock data as needed
        ];

        res.json({ suggestions });
    });

    // Route to handle career assessment
    app.post('/career-assessment', isAuthenticated, (req, res) => {
        const { interests, skills } = req.body;

        // Mock data for career suggestions based on interests and skills
        const careerSuggestions = [
            {
                career: 'Software Developer',
                interests: ['technology'],
                skills: ['programming', 'analysis']
            },
            {
                career: 'Graphic Designer',
                interests: ['arts'],
                skills: ['design']
            },
            {
                career: 'Financial Analyst',
                interests: ['finance'],
                skills: ['analysis', 'financial-planning']
            },
            // Add more mock data as needed
        ];

        // Filter suggestions based on user input
        const suggestions = careerSuggestions.filter(suggestion =>
            interests.some(interest => suggestion.interests.includes(interest)) &&
            skills.some(skill => suggestion.skills.includes(skill))
        );

        res.json({ suggestions });
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
