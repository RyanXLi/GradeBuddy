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
            longName: '',
            shortName: '',
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
            newACName: '',
            newACWeight: 0.0,
        };
        this.setItem = this.setItem.bind(this);
        this.onModalSaved = this.onModalSaved.bind(this);
        this.onSaved = this.onSaved.bind(this);
    }

    updateCourseTitle(evt) {
        this.setState({
            courseTitle: evt.target.value
        });
        // console.log(this.state.courseTitle);
    }

    updateShortName(evt) {
        this.setState({
            shortName: evt.target.value
        });

    }

    updateACName(evt) {
        this.setState({
            newACName: evt.target.value
        });

    }

    setItem(i, obj) {
        const copy = this.state.categories.slice();
        copy[i] = obj;
        this.setState({
            categories: copy
        });
    }

    onModalSaved() {
        const copy = this.state.categories.slice();
        copy.push({
            name: this.state.newACName,
            weight: 0.0,
        });
        this.setState({
            categories: copy,
            newACName: '',
            newACWeight: ''
        });
    }

    onSaved() {
        let valid = true;

        let sum = 0.0;
        for (let i = 0; i < this.state.categories.length; i++) {
            if (isNaN(this.state.categories[i]['weight'])) {
                console.log("nan");
                valid = false;
                break;
            }
            sum +=  this.state.categories[i]['weight'];
        }

        const err = 0.00001;
        console.log(sum);
        if (sum < 100 - err || sum > 100 + err) {
            valid = false;
        }

        console.log(valid);

        if (this.state.shortName === undefined || this.state.shortName === '') {
            valid = false;
        }

        if (!valid) {
            alert("Data incomplete or weight does not sum to 100");
            return;
        }

        this.props.onCourseSaved(this.state);
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


                        <form className="section class-info-div">
                            <div >
                                <label htmlFor="shortName">Course Name *</label>
                                <input className="form-control" id="shortName"
                                       value={this.state.shortName}
                                       onChange={evt => this.updateShortName(evt)}
                                       placeholder="CS241" />
                            </div>
                            <div >
                                <label htmlFor="courseTitle">Course Title</label>
                                <input className="form-control" id="courseTitle"
                                       value={this.state.courseTitle}
                                       onChange={evt => this.updateCourseTitle(evt)}
                                       placeholder="System Programming"/>
                            </div>


                        </form>

                    </CollapseWithHeading>



                    <CollapseWithHeading
                        headingText='Assignment Categories'
                        headingClassName='Navigation-sidebar-heading Navigation-sidebar-active-heading'
                    >
                        <div className="assignment-category-grid-container section">
                            {assCategoryItems}
                            <div className="assignment-category-grid-item">
                                <button type="submit" 
                                        className="add-button btn btn-primary save-button" 
                                        data-toggle="modal" 
                                        data-target="#exampleModalCenter">
                                    <div className="inner-box">+</div>
                                </button>
                                
                                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">New Assignment Category</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">

                                                <form>
                                                    <div >
                                                        <label htmlFor="courseTitle">Name</label>
                                                        <input className="form-control"
                                                               id="courseTitle"
                                                               value={this.state.newACName}
                                                               onChange={evt => this.updateACName(evt)}
                                                               placeholder="MPs"/>
                                                    </div>
                                                    {/*<div >*/}
                                                        {/*<label htmlFor="courseSubject">Weight</label>*/}
                                                        {/*<input className="form-control" id="courseSubject"*/}

                                                               {/*onChange={evt => this.updateACWeight(evt)}*/}
                                                               {/*placeholder="20" />*/}
                                                    {/*</div>*/}

                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={() => this.onModalSaved()} data-dismiss="modal">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapseWithHeading>


                    <div className="buttons">

                        <button type="submit" className="submit-button btn btn-primary save-button"
                                onClick={this.onSaved}>SAVE</button>

                        <button type="cancel" className="cancel-button btn btn-light cancel-button">CANCEL</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
