/**
 * Created by RyanX on 2018/11/16.
 */

import React, { Component } from 'react';
import AssCategoryItem from "./AssCategoryItem";


class NewClassPage extends Component {

    constructor() {
        super();
        this.state = {
            courseTitle: '',
            courseSubject: '',
            courseCode: '',
            // shortName: null, // string
            // longName: null, // string
            isActive: true, // boolean
            categories: [
                {name: 'Homework', weight: 0.0},
                {name: 'Project', weight: 0.0},
                {name: 'Midterm', weight: 0.0},
                {name: 'Final', weight: 0.0},
                {name: 'Quizzes', weight: 0.0},
            ],
            // Array of objects with this schema, empty at first
            //     {
            //         name: string,
            //         weight: number
            //     }
            assignments: [ ],
        };
        this.setItem = this.setItem.bind(this);
    }

    updateCourseTitle(evt) {
        this.setState({
            courseTitle: evt.target.value
        });
        // console.log(this.state.courseTitle);
    }

    updateCourseSubject(evt) {
        this.setState({
            courseSubject: evt.target.value
        });
        // console.log(this.state.courseSubject);
    }

    updateCourseCode(evt) {
        this.setState({
            courseCode: evt.target.value
        });
        // console.log(this.state.courseCode);
    }


    setItem(i, obj) {
        const copy = this.state.categories.slice();
        copy[i] = obj;
        this.setState({
            categories: copy
        });
    }


    render() {

        let assCategoryItems = [];
        for (let i = 0; i < this.state.categories.length; i++) {
            assCategoryItems.push(
                <AssCategoryItem key={i.toString()} index={i} item={this.state.categories[i]} setItem={this.setItem}/>
            );
        }

        return (
            <div>
            <div className="NewClassPage">
                <div className="title">Add new class</div>
                <div className="content">
                    <div className="accordions">
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Class Information
                                        </button>
                                    </h5>
                                </div>

                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" >
                                    <div className="card-body">



                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="courseTitle">Course Title</label>
                                                <input className="form-control" id="courseTitle" value={this.state.courseTitle} onChange={evt => this.updateCourseTitle(evt)} placeholder="System Programming"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="courseSubject">Course Subject</label>
                                                <input className="form-control" id="courseSubject" value={this.state.courseSubject} onChange={evt => this.updateCourseSubject(evt)} placeholder="CS" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="courseCode">Course Code</label>
                                                <input className="form-control" id="courseCode" value={this.state.courseCode} onChange={evt => this.updateCourseCode(evt)} placeholder="241" />
                                            </div>
                                        </form>





                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            Assignment Categories
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" >
                                    <div className="card-body">



                                        {assCategoryItems}
                                        <button type="submit" className="btn btn-primary save-button">Add</button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="buttons">
                        <button type="submit" className="btn btn-primary save-button">SAVE</button>
                        <button type="cancel" className="btn btn-light cancel-button">CANCEL</button>
                    </div>
                </div>
            </div>
            </div>
    );
    }
    }

    // TODO: silas please add export where appropriate, note that
    // TODO: `this.state` is close to the object described in the schema
    export default NewClassPage;