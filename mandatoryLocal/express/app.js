const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');           // Log all HTTP requests to the console
const app = express();
const checkJwt = require('express-jwt');    // Check for access tokens automatically
const bcrypt = require('bcrypt');          // Used for hashing passwords!


/****** Configuration *****/

app.use(bodyParser.json());                 // Make sure all json data is parsed
/*app.use(morgan('combined'));   */      // Log all requests to the console

const port = (process.env.PORT || 8080);

/*if (!process.env.JWT_SECRET) {
    console.error('You need to put a secret in the JWT_SECRET env variable!');
    process.exit(1);
}*/

/** Middleware **/

// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});


let mongoose = require('mongoose');
let dbUrl = 'mongodb://localhost/question';

mongoose.connect(dbUrl, {useNewUrlParser: true}, (err) => {
    console.log('mongo db connection', err)
});

let commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    vote: Number,
});

let questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    created: Date,
    comments: [commentSchema]
});

let Question = mongoose.model('Question', questionSchema);
let Comment = mongoose.model('Comment', commentSchema);

let Question1 = new Question({

    title: 'How to fix this problem?',
    description: 'I have this problem',
    author: "Isabel Christensen",
    created: Date.now(),


});

Question1.save(function (err, Question1) {

    if (err) return console.error(err)

});


/****** Routes *****/

//GET all the questions

app.get('/question/', (req, res) => {

    Question.find({}, (err, question) => {

        res.json(question)

    });
});


//GET questions by ID

app.get('/question/:id', (req, res) => {

    Question.findOne({

        _id: req.params.id}, (err, question) => {
        res.json(question);

    })


});


//POST storing a new Question

app.post('/question' ,(req, res) => {

    console.log("we are in the post");

    //let c1 = new Comment({name: 'Hanne' ,comment: 'DETTE ER EN TEST', vote: 32});
    //let c2 = new Comment({name: 'Jens', comment: 'DETTE ER EN TEST', vote: 32});

    let newQuestion = new Question({
        title: req.body.title,
        description:req.body.description,
        author: req.body.author,
        created: Date.now(),
        //comments: [c1,c2]
    });

    newQuestion.save();

    res.json({
        msg: `You have posted this data: ${req.body.title}`,
        newQuestion: newQuestion});
});


//POST create a new comment for a Question


app.post('/question/create/comment/:id',(req, res) => {

    console.log("we are in the post");

    let c1 = new Comment({name: req.body.name, comment: req.body.comment, vote: 0});

    console.log(req.params.id)

    Question.findOne({
        _id: req.params.id}, (err, question) => {
        question.comments.push(c1);
        question.save();
    });

    res.json({
        msg: `You have posted this data: ${req.body.comment}`});
});


//PUT updating question

app.put('/question/update/:id/', (req, res) => {


    const {id} = req.params;
    let {title} = req.body;
    let {description} = req.body;
    let {author} = req.body;
    let {created} = req.body;

    let c2 = new Comment({name: 'Hanne', comment: 'DETTE ER EN TEST', vote: 32});
    Question.findOne({
        _id: req.params.id}, (err, question) => {
        question.title = title;
        question.description = description;
        question.author = author;
        question.created = created;
        question.comments.push(c2);
        question.save();
    });

    res.json({ msg: `You have put this data:`});
});

//Update the comments vote - this is for the plus vote

app.put('/question/update/plus/comment/:id/', (req, res) => {


    Question.find({}, (err, question) => {

        question.forEach(function (elm) {
            elm.comments.forEach(function (comment) {
                if(comment._id == req.params.id) {
                    console.log("DETTE ER DIN KOMMENTAR" + comment.comment);
                    comment.vote++;
                    elm.save();

                }
            })
        })
    });


    res.json({ msg: `You have put this data:`});
});

//Update the comments vote - this is for the minus vote


app.put('/question/update/minus/comment/:id/', (req, res) => {
    console.log("DETTE ER DIN ID FRA API: " + req.params.id);


    Question.find({}, (err, question) => {

        question.forEach(function (elm) {
            elm.comments.forEach(function (comment) {
                if(comment._id == req.params.id) {
                    console.log("DETTE ER DIN KOMMENTAR" + comment.comment);
                    comment.vote--;
                    elm.save();
                }
            })
        })
    });


    res.json({ msg: `You have put this data:`});
});


app.listen(port, () => console.log(`Isabel´s QA running on port ${port}!`));

