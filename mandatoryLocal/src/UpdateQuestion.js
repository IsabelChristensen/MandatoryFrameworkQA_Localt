import React, {Component} from 'react';
import {Link} from "react-router-dom";


export default class UpdateRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Title: this.props.question.title,
            Description: this.props.question.description,
            Author: this.props.question.author,
            id: this.props.question._id
        };

        this.onChange = this.onChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleInput(event) {

        console.log(this.state.Title);
        console.log(this.state.Description);
        console.log(this.state.Author);
        console.log(this.state.id);


        event.preventDefault();
        this.props.updateQuestion(
            this.state.Title,
            this.state.Description,
            this.state.Author,
            this.state.id
        );
    }


    render() {

        let question = this.props.question;

        return (

            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">

                            <div><label htmlFor="questionText">Title</label>
                                <input defaultValue={question.title} type="text" className="form-control" id="itemText" name="Title"
                                       placeholder="Add recipe"
                                       onChange={this.onChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="questionText">Description</label>
                                <input defaultValue={question.description} type="text" className="form-control" id="recipeText" name="Description"
                                       placeholder="Add description"
                                       onChange={this.onChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="questionText">Author</label>
                                <input defaultValue={question.author} type="text" className="form-control" id="recipeText" name="Author"
                                       placeholder="Add ingredients"
                                       onChange={this.onChange}
                                />
                            </div>


                        </div>

                        <button onClick={this.handleInput}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Update task
                        </button>

                    </form>
                </div>

                <button id="backbutton"><Link id="goback" to={`/`}>Go back to recipe</Link></button>
            </div>

        );
    }
}
