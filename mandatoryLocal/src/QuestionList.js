import React, {Component} from 'react';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Link } from "react-router-dom";


class QuestionList extends Component {

    render() {
        let list = [];

        this.props.questions.forEach((elm) => {
            list.push(<li id="liste">

                <Link to={`/question/${elm._id}`}><h5>{elm.title}</h5></Link>
                <p>{elm.created}</p>

            </li>)
        });

        return (
            <div>
                <div className="createQuestionbtn">
                    <Link to={`/question/create`}>Create QA</Link>

                </div>

                <h3>{this.props.header}</h3>

                <div class="nobull">
                    {list}
                </div>

                </div>


        );


    }
}

export default QuestionList;
