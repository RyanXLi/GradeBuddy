/**
 * Created by RyanX on 2018/11/16.
 */

import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { AssignmentCategoryItem } from './AssignmentCategoryItem';
import { CollapseWithHeading } from '../CollapseWithHeader';
import './NewCoursePage.css';

export class NewCoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uuid(),
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
                <AssignmentCategoryItem className="assignment-category-grid-item"
                                        key={i.toString()}
                                        index={i}
                                        item={this.state.categories[i]}
                                        setItem={this.setItem}/>
            );
        }

        return (
            <div>
            <div className="NewClassPage">
                <div className="title">Add new class</div>
                <div className="content">


                    <CollapseWithHeading
                        headingText='Class Information'
                        headingClassName='Navigation-sidebar-heading Navigation-sidebar-active-heading'
                    >


                        <form className="assignment-category-grid-container class-info-div">
                            <div className="form-group two-column">
                                <label htmlFor="courseTitle">Course Title *</label>
                                <input className="form-control" id="courseTitle"
                                       value={this.state.courseTitle}
                                       onChange={evt => this.updateCourseTitle(evt)}
                                       placeholder="System Programming"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="courseSubject">Course Subject</label>
                                <input className="form-control" id="courseSubject"
                                       value={this.state.courseSubject}
                                       onChange={evt => this.updateCourseSubject(evt)}
                                       placeholder="CS" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="courseCode">Course Code</label>
                                <input className="form-control" id="courseCode"
                                       value={this.state.courseCode}
                                       onChange={evt => this.updateCourseCode(evt)}
                                       placeholder="241" />
                            </div>
                        </form>

                    </CollapseWithHeading>



                    <CollapseWithHeading
                        headingText='Assignment Categories'
                        headingClassName='Navigation-sidebar-heading Navigation-sidebar-active-heading'
                    >
                        <div className="assignment-category-grid-container">
                            {assCategoryItems}
                            <div className="assignment-category-grid-item">
                                <button type="submit" className="add-button btn btn-primary save-button">
                                    <div className="inner-box">+</div>
                                </button>
                            </div>
                        </div>
                    </CollapseWithHeading>


                    <div className="buttons">
                        <button type="submit" className="submit-button btn btn-primary save-button"
                                onClick={() => this.props.onCourseSaved(this.state)}>SAVE</button>

                        <button type="cancel" className="cancel-button btn btn-light cancel-button">CANCEL</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
