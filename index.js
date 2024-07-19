const exp = require("constants");
const express=require("express");
const path=require("path");
const ejs=require('ejs')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { differenceInMonths } = require('date-fns');

dotenv.config();

const app=express();

const questions = require('./questions');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// mongoose.connect('mongodb://localhost:27017/express_app', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/express_app' })
}));


app.use(express.static(path.join(__dirname, "Public")));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname,"/views"));

app.use('/', require('./routes/index'));


app.get('/fund', (req, res) => {
    res.render('fund.ejs');
});

// Form Route
app.get('/form1', (req, res) => {
    res.render('form1.ejs');
});



// saving goals 

let goals = [];

// Calculate monthly savings
function calculateMonthlySaving(goalCost, targetDate) {
    const today = new Date();
    const endDate = new Date(targetDate);
    const monthsLeft = differenceInMonths(endDate, today);
    return goalCost / (monthsLeft > 0 ? monthsLeft : 1); // Prevent division by zero
}

app.get('/saving', (req, res) => {
    res.render('saving', { goals });
});

app.get('/add-goal', (req, res) => {
    res.render('add-goal');
});

app.post('/add-goal', (req, res) => {
    const { name, cost, date } = req.body;
    const monthlySaving = calculateMonthlySaving(cost, date);
    goals.push({ name, cost, date, monthlySaving, saved: 0 });
    res.redirect('/progress');
});

app.get('/update-goal/:name', (req, res) => {
    const goal = goals.find(g => g.name === req.params.name);
    res.render('update-goal', { goal });
});

app.post('/update-goal/:name', (req, res) => {
    const goal = goals.find(g => g.name === req.params.name);
    if (goal) {
        goal.saved = parseFloat(req.body.saved);
    }
    res.redirect('/');
});

app.get('/progress', (req, res) => {
    res.render('progress', { goals });
});



// Get today's question
function getTodayQuestion() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return questions[dayOfYear % questions.length];
}

app.get('/quiz', (req, res) => {
    const questionData = getTodayQuestion();
    res.render('quiz', { questionData });
});

app.post('/quiz', (req, res) => {
    const { answer } = req.body;
    const questionData = getTodayQuestion();
    const isCorrect = parseInt(answer) === questionData.correct;

    res.render('quiz', { questionData, answer: parseInt(answer), isCorrect });
});

// Error handling
app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});



app.get("/",(req,res)=>{
res.render("home.ejs")
});

app.get("/exprense",(req,res)=>{
    res.render("home.ejs")
});
app.get("/exprense",(req,res)=>{
    res.render("home.ejs")
});

app.get("/scholarship",(req,res)=>{
    res.render("home.ejs")
});
    

    



app.listen(5000);