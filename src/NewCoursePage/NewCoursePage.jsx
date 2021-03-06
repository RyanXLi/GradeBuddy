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
            firstTime: true,
            modelFirstTime: true,
            editing: false,
            oldSet: null,
            ...props.initalState
        };
        if (props.initalState) {

            this.state.oldSet = new Set();
            for (const category of this.state.categories) {
                if (category['weight'] > 0) {
                    this.state.oldSet.add(category['name']);
                }
            }

            this.state.editing = true;
            let sum = 0.0;
            for (const category of this.state.categories) {
                sum += category['weight'];
            }
            if (sum !== 100.0) {
                let ratio = 100.0 / sum;
                for (const category of this.state.categories) {
                    category['weight'] *= ratio;
                }
            }

        }
        this.setItem = this.setItem.bind(this);
        this.onModalSaved = this.onModalSaved.bind(this);
        this.onSaved = this.onSaved.bind(this);
    }

    updateCourseTitle(evt) {
        this.setState({
            longName: evt.target.value
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
        if (this.state.newACName === '') {
            return;
        }
        this.setState({modelFirstTime: false});

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
        this.setState({firstTime: false});

        let valid = true;

        let sum = 0.0;
        for (let i = 0; i < this.state.categories.length; i++) {
            if (isNaN(this.state.categories[i]['weight'])) {
                valid = false;
                break;
            }
            sum +=  this.state.categories[i]['weight'];
        }

        const err = 0.00001;
        if (sum < 100 - err || sum > 100 + err) {
            valid = false;
        }


        if (this.state.shortName === undefined || this.state.shortName === '') {
            valid = false;
        }

        if (!valid) {
            alert("Data incomplete or weight does not sum to 100");
            return;
        }

        // alert when categories change
        if (this.state.editing) {
            let newSet = new Set();
            for (const category of this.state.categories) {
                if (category['weight'] > 0) {
                    newSet.add(category['name']);
                }
            }

            let difference = new Set(
                [...this.state.oldSet].filter(x => !newSet.has(x)));

            if (difference.size !== 0) {
                // alert user

                if (!window.confirm('A category will be deleted and the assignments in it will be removed. Do you want to proceed?')) {
                    return;
                }
            }
        }

        const copy = this.state.categories.slice();
        const newcat = copy.filter(item => item['weight'] > 0);
        const stateCopy = {...this.state};
        stateCopy.categories = newcat;
        this.props.onCourseSaved(stateCopy);
    }


    render() {

        let assCategoryItems = [];
        for (let i = 0; i < this.state.categories.length; i++) {
            assCategoryItems.push(
                <AssignmentCategoryItem className="assignment-category-grid-item"
                                        key={i.toString()}
                                        index={i}
                                        item={this.state.categories[i]}
                                        setItem={this.setItem}
                                        firstTime={this.state.firstTime}/>
            );
        }


        const warn = !this.state.firstTime && this.state.shortName === '' ? " error-style" : "";
        const modelWarn = !this.state.modelFirstTime && this.state.newACName === '' ? " error-style" : "";
        return (

            <div>
            <div className="NewClassPage">
                <div className="title">{this.state.editing ? 'Editing class' : 'Add new class'}</div>
                <div className="content">


                    <CollapseWithHeading
                        className="collapse class-info"
                        headingText='Class Information'
                        headingClassName='collapse-title'
                    >


                        <form className="section class-info-div">
                            <div >
                                <label htmlFor="shortName">Course Name (shows up on sidebar)*</label>
                                <input className={"form-control" + warn} id="shortName"
                                       value={this.state.shortName}
                                       onChange={evt => this.updateShortName(evt)}
                                       placeholder="CS241" />
                            </div>
                            <div className="course-title-section">
                                <label htmlFor="courseTitle">Course Title</label>
                                <input className="form-control" id="courseTitle"
                                       value={this.state.longName}
                                       onChange={evt => this.updateCourseTitle(evt)}
                                       placeholder="System Programming"/>
                            </div>


                        </form>

                    </CollapseWithHeading>



                    <CollapseWithHeading
                        className="class-info"
                        headingText='Assignment Categories'
                        headingClassName='collapse-title'
                    >
                        <div className="newcoursepage-wholenote">
                            <span className="newcoursepage-note">Note</span>
                            {": setting a weight of 0 or unchecking a category will effectively remove the category. Weights must sum to 100."}
                        </div>
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
                                                        <input className={"form-control"+modelWarn}
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

                        <button
                            type="cancel"
                            className="cancel-button btn btn-light cancel-button"
                            onClick={this.props.onCancelClicked}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
