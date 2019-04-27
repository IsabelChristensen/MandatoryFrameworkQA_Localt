import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import QuestionList from "./QuestionList";
import Question from "./Question";
import NotFound from "./NotFound";
import AddQuestion from "./AddQuestion";
import UpdateRecipe from "./UpdateQuestion";



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions: [

            ]}

            this.addQuestion = this.addQuestion.bind(this);
            this.updateQuestion = this.updateQuestion.bind(this);
    }

    componentDidMount() {
        console.log("App component has mounted");
        this.getData();
    }


    getData() {

        fetch('http://localhost:8080/question')
            .then(response => response.json())
            .then(questions => this.setState({ questions}))
    }


    addQuestion(title, description, author){

        let newQuestion = {
            title: title,
            description: description,
            author: author,
        };

        console.log(title + description + author );

        fetch('http://localhost:8080/question', {

            method: 'POST',
            body: JSON.stringify(newQuestion),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                console.log("test");
                this.getData()

            });

        console.log("End of init()")


    }

    updateQuestion(title, description, author, id){

        console.log("WE R INSIDE HALLO");
        console.log("THIS IS THE ID " + id);


        let newQuestion = {
            title: title,
            description: description,
            author: author

        };

        fetch(`http://localhost:8080/question/update/${id}`, {

            method: 'PUT',
            body: JSON.stringify(newQuestion),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                console.log("test");
                this.getData();
                //this.red
                console.log("HELLO");
            });

        console.log("End of init()")

    }


    // TODO: Remove these two methods
    getQuestionFromId(id) {

        return this.state.questions.find((elm) => elm._id === id);

    }

    votePlusForQuestion(id) {


        fetch(`http://localhost:8080/question/update/plus/comment/${id}`, {



            method: 'PUT',
            //body: JSON.stringify(id),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                window.location.reload(); //refresher siden
                console.log("test");
                console.log("HELLO");
            });

        console.log("End of init()");
    }

    voteMinusForQuestion(id) {


        fetch(`http://localhost:8080/question/update/minus/comment/${id}`, {
            //'/question/update/comment/:id/',


            method: 'PUT',
            //body: JSON.stringify(id),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                window.location.reload(); //refresher siden

            });

        console.log("End of init()");
    }

    addComment(comment, id , name){

        let newComment = {
            name: name,
            comment: comment
        };


        fetch(`http://localhost:8080/question/create/comment/${id}`, {

            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                console.log("test");
                window.location.reload(); //refresher siden

            });

        console.log("End of init()")


    }

    render() {
        return (
            <Router>
                <header>
                <div className="frontpagelogo">
                    <Link id="linktofront" to={'/'}>Frontpage</Link></div></header>


                <div className="container">

                    <div className="headlineboks">
                        <center><h1>Isabel QA</h1></center></div>

                    <Switch>
                        <Route exact path={'/'}
                               render={(props) =>
                                   <QuestionList {...props}
                                                 questions={this.state.questions}
                                                 header={'All questions'}/>}
                        />

                        <Route exact path={'/question/create'}
                               render={(props) => <AddQuestion {...props}
                                                               addQuestion = {this.addQuestion}/>}
                        />


                        <Route exact path={'/question/:id'}
                               render={(props) => <Question {...props}
                                                            question = {this.getQuestionFromId(props.match.params.id)}
                                                            id={props.match.params.id}
                                                            votePlusForQuestion = {this.votePlusForQuestion}
                                                            voteMinusForQuestion = {this.voteMinusForQuestion}
                                                            addComment = {this.addComment}
                               />}
                        />

                        <Route exact path={'/question/update/:id'}
                                        render={(props)=><UpdateRecipe{...props}
                                                                      question={this.getQuestionFromId(props.match.params.id)}
                                                                      updateQuestion={this.updateQuestion}/>}
                        />



                        <Route component={NotFound} />



                    </Switch>


                </div>
            </Router>
        );
    }
}

export default App;
