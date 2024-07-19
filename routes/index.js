const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Message = require('../models/message');
const userName = require('../models/user.js');
const Scholarship = require('../models/Scholarship');
const Project = require('../models/Project'); // Adjust the path as needed

const { getExpensePercentages } = require('../models/expenseHelper'); // Adjust the path if necessary


router.get('/Scholarship', async (req, res) => {
    try {
        // Fetch some scholarships to display on the left side
        const scholarships = await Scholarship.find().limit(5);
        res.render('form', { scholarships });
    } catch (err) {
        console.error('Error fetching scholarships:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/recommend', async (req, res) => {
    const { name, educationQualification, cgpa, gender, type } = req.body;

    try {
        // Find matching scholarships
        const scholarships = await Scholarship.find({ 
            educationQualification, 
            gender, 
            type, 
            cgpa: { $lte: cgpa } 
        });

        res.render('result', { scholarships });
    } catch (err) {
        console.error('Error finding scholarships:', err);
        res.status(500).send('Internal Server Error');
    }
});











// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
}

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { name ,username, password, } = req.body;
        const user = new User({ name, username, password });
        await user.save();
        res.redirect('/messages');
    } catch (error) {
        res.status(400).send(`Allready Registered User `);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});




router.get('/addexpence', isAuthenticated, async (req, res) => {
    const messages = await Message.find({ userId: req.session.userId });
    res.render('addexpence', { messages });
});

router.get('/add', (req, res) => {
    res.render('login');
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await user.comparePassword(password)) {
            req.session.userId = user._id;
            res.redirect('/messages');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(400).send('Error logging in');
    }
});

router.get('/messages', isAuthenticated, async (req, res) => {
    const messages = await Message.find({ userId: req.session.userId });
    const namee = await userName.findOne({ userId: req.session.userId });
    const scholarships = await Scholarship.find().limit(2);


    const percentages= await getExpensePercentages;
    res.render('messages', { messages,namee, scholarships,percentages});
}); 

router.post('/messages', isAuthenticated, async (req, res) => {
    const { food, travel, rent } = req.body;
    const message = new Message({ userId: req.session.userId, food, travel, rent });
    await message.save();
    res.redirect('/messages');
});

router.get('/messages/edit/:id', isAuthenticated, async (req, res) => {
    const message = await Message.findById(req.params.id);
    if (message.userId.equals(req.session.userId)) {
        res.render('edit', { message });
    } else {
        res.status(403).send('Unauthorized');
    }
});

router.post('/messages/edit/:id', isAuthenticated, async (req, res) => {
    const { content } = req.body;
    const message = await Message.findById(req.params.id);
    if (message.userId.equals(req.session.userId)) {
        message.content = content;
        await message.save();
        res.redirect('/messages');
    } else {
        res.status(403).send('Unauthorized');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
