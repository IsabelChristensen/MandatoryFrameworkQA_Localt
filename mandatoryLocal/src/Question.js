import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Question extends Component {

    constructor(props) {
        super(props);
        //let list = [];

        this.state = {
            question: "",
            comment:""
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);

        fetch('http://localhost:8080/question/'+ props.match.params.id)
            .then(response => response.json())
            .then(json =>
                this.setState({question:json}))
            .then(console.log('iyguyguyguyguyuyguy ' + props.match.params.id))
    }


    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleInputplus(event, data) {

        console.log("WE R LOGGIND THE ID: " + data);

        event.preventDefault();
        this.props.votePlusForQuestion(
            data
        );
    }

    handleInputminus(event, data) {

        console.log("WE R LOGGIND THE ID: " + data);

        event.preventDefault();
        this.props.voteMinusForQuestion(
            data
        );
    }




    handleSubmitComment(event) {
        event.preventDefault();
        this.props.addComment(
            this.state.comment,
            this.state.question._id,
            this.state.name,
        );
    }



    render() {

        let content = "LOAD";

        if(this.state.question) {
            let question = this.state.question;
            console.log(question);

            let list = [];
            this.state.question.comments.forEach((elm) => {
                list.push(<li class="nobull">


                    <div className="row commentsboks">

                        <div className="col-md-8">

                            <p>Name: {elm.name}</p>
                            <p>Kommentar: {elm.comment}</p>
                        </div>
                        <div className="col-md-4">

                            <p>vote: {elm.vote}</p>
                            <button onClick={((e) => this.handleInputplus(e, elm._id))}>Vote up</button>
                            <button onClick={((e) => this.handleInputminus(e, elm._id))}>Vote down</button>
                        </div>

                    </div>

                </li>)
            });

            content =
                <div>

                    <div className="questionBoks">

                    <h3>{this.state.question.title}</h3>

                    <p>Description: {this.state.question.description}</p>

                    <p>Author: {this.state.question.author}</p>
                        <p>Created: {this.state.question.created}</p>
                    </div>

                    <div className="container">
                    <form>
                        <div className="form-group">

                            <div><label htmlFor="questionText">Name</label>
                                <input defaultValue={question.name} type="text" className="form-control" id="itemText" name="name"
                                       placeholder="name"
                                       onChange={this.onChange}
                                />
                            </div>

                            <div><label htmlFor="questionText">Title</label>
                                <input defaultValue={question.comment} type="text" className="form-control" id="itemText" name="comment"
                                       placeholder="comment"
                                       onChange={this.onChange}
                                />
                            </div>


                            <button onClick={this.handleSubmitComment}
                                    type="submit" id="submitItemBtn" className="btn btn-primary">Add</button>

                        </div>
                    </form>
                    </div>
                    <h1>Comments</h1>
                        <ul>
                            {list}
                        </ul>
                    <div className="updateQuestionbtn">
                        <Link to={`/question/update/${question._id}`}>Update QA</Link></div>

                </div>;

        }

        return content;


    }
}

export default Question;
