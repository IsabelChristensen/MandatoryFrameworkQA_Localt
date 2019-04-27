import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class AddQuestion extends Component{

    constructor(props) {

        super(props);

        this.state = {
            Title: "",
            Description: "",
            Author: ""
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
        event.preventDefault();
        this.props.addQuestion(
            this.state.Title,
            this.state.Description,
            this.state.Author
        );
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">

                            <h1>Add new question</h1>
                            <div><label htmlFor="itemText">Title</label>
                                <input type="text" className="form-control" id="titleText" name="Title"
                                       placeholder="write title here...."
                                       onChange={this.onChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="addquestionText">Description</label>

                                <textarea type="textarea" className="form-control" id="descriptionText" name="Description"
                                          placeholder="write description here...."
                                          onChange={this.onChange}/>
                            </div>

                            <div>
                                <label htmlFor="addquestionText">Author</label>
                                <input type="text" className="form-control" id="authorText" name="Author"
                                       placeholder="write author here...."
                                       onChange={this.onChange}
                                />
                            </div>


                        </div>


                        <button onClick={this.handleInput}
                                type="submit" id="submitItemBtn" className="btn btn-primary">Add
                        </button>
                    </form>
                </div>

                <button id="backbutton"><Link id="goback" to={`/`}>Go back to QA overview</Link></button>
            </div>


        );
    }

}