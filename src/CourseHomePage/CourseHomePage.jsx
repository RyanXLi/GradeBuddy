import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid/v4';
import Switch from 'react-switch';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { AssignmentRow } from './AssignmentRow';
import { CollapseWithHeading } from '../CollapseWithHeader';
import { HabitPage } from '../HabitPage/HabitPage';
import { AnalyticsPage } from '../AnalyticsPage/AnalyticsPage';
import { NewCoursePage } from '../NewCoursePage/NewCoursePage';
import './CourseHomePage.css';

/**
 * Content pane displaying the assignment details of course selected.
 * 
 * @author Srilakshmi Prasad
 * @author Alex Blacketor
 */
export class CourseHomePage extends React.Component {
    static propTypes = {
        courses: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedCourse: PropTypes.object.isRequired,
        onCourseEdited: PropTypes.func,
        onCourseDeleteRequested: PropTypes.func
    };

    static defaultProps = {
        onCourseEdited: _.noop
    };

    constructor(props) {
        super(props);
        this.state = {
            isCourseBeingEdited: false,
            prevCourseId: props.selectedCourse.id,
            habitBeingEdited: '', // ID of the assignment whose habits are being edited
            isShowingAnalytics: false,
            isShowingDeleteWarning: false,
        };
        this.handleAssignmentAdd = this.handleAssignmentAdd.bind(this);
        this.handleAssignmentSave = this.handleAssignmentSave.bind(this);
        this.handleAssignmentDelete = this.handleAssignmentDelete.bind(this);
        this.setHabitBeingEdited = this.setHabitBeingEdited.bind(this);
        this.handleHabitSave = this.handleHabitSave.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.toggleWarningModal = this.toggleWarningModal.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.selectedCourse.id !== state.prevCourseId) {
            return {
                prevCourseId: props.selectedCourse.id,
                habitBeingEdited: '',
                isCourseBeingEdited: false,
                isShowingDeleteWarning: false,
            };
        } else {
            return { prevCourseId: props.selectedCourse.id };
        }
    }

    setNewAssignments(newAssignments) {
        const courseCopy = _.clone(this.props.selectedCourse);
        courseCopy.assignments = newAssignments;
        this.props.onCourseEdited(courseCopy);
    }

    handleAssignmentAdd(category) {
        const newAssignments = this.props.selectedCourse.assignments.slice();
        newAssignments.push({
            id: uuid(),
            name: 'New assignment',
            weight: 0, // If 0, use default weight
            pointsEarned: 0,
            pointsPossible: 0,
            category: category,
            habits: {}
        });
        this.setNewAssignments(newAssignments);
    }

    handleAssignmentSave(newAssignment) {
        const assignmentsCopy = this.props.selectedCourse.assignments.slice();
        const index = assignmentsCopy.findIndex(assignment => assignment.id === newAssignment.id);
        if (index < 0) {
            return;
        }
        assignmentsCopy[index] = newAssignment;
        this.setNewAssignments(assignmentsCopy);
    }

    handleAssignmentDelete(assignmentToDelete) {
        const assignmentsCopy = this.props.selectedCourse.assignments.slice();
        const index = assignmentsCopy.findIndex(assignment => assignment.id === assignmentToDelete.id);
        if (index < 0) {
            return;
        }
        assignmentsCopy.splice(index, 1);
        this.setNewAssignments(assignmentsCopy);
    }

    setHabitBeingEdited(assignment) {
        this.setState({habitBeingEdited: assignment.id});
    }

    handleHabitSave(habits) {
        const assignmentsCopy = this.props.selectedCourse.assignments.slice();
        const index = assignmentsCopy.findIndex(assignment => assignment.id === this.state.habitBeingEdited);
        if (index < 0) {
            return;
        }
        const assignment = _.clone(assignmentsCopy[index]);
        assignment.habits = habits;
        assignmentsCopy[index] = assignment;
        this.setNewAssignments(assignmentsCopy);
        this.setState({habitBeingEdited: ''});
    }

    toggleActive() {
        const courseCopy = _.clone(this.props.selectedCourse);
        courseCopy.isActive = !courseCopy.isActive;
        this.props.onCourseEdited(courseCopy);
    }

    renderCategoryTable(category, assignments=[]) {
        const assignmentRows = assignments.map(assignment => (
            <AssignmentRow
                key={assignment.id}
                assignment={assignment}
                onEditHabitPressed={() => this.setHabitBeingEdited(assignment)}
                onAssignmentSaved={this.handleAssignmentSave}
                onAssignmentDeleted={() => this.handleAssignmentDelete(assignment)}
            />
        ));

        return <CollapseWithHeading className='categoryHeading' key={category.name} headingText={`${category.name} (${category.weight}%)`} titleBackground={true}>
            <table className="table table-hover">
                <thead>
                    <tr className='tableRow'>
                        <th>Assignment</th><th>Grade</th><th>Habits</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {assignmentRows}
                    <tr onClick={() => this.handleAssignmentAdd(category.name)}>
                        <td className="addRow" colSpan={4}><i className="fa fa-plus fa-plus2"/></td>
                    </tr>
                </tbody>
            </table>
        </CollapseWithHeading>
    }

    toggleWarningModal() {
        this.setState(prevState => {
            return {isShowingDeleteWarning: !prevState.isShowingDeleteWarning}
        });
    }

    renderWarningModal() {
        return <Modal isOpen={this.state.isShowingDeleteWarning} toggle={this.toggleWarningModal} >
            <ModalHeader toggle={this.toggleWarningModal}>Delete {this.props.selectedCourse.shortName}?</ModalHeader>
            <ModalBody>
                All assignments will be <b>PERMANENTLY lost</b>.  This <b>CANNOT be undone</b>!
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={this.props.onCourseDeleteRequested}>
                    Delete
                </button>
                <button type="button" className="btn" onClick={this.toggleWarningModal}>Cancel</button>
            </ModalFooter>
        </Modal>;
    }

    render() {
        if (this.state.isCourseBeingEdited) { // TODO Ryan: move this if statement somewhere better
            return <NewCoursePage
                initalState={this.props.selectedCourse}
                onCourseSaved={data => {
                    this.props.onCourseEdited(data);
                    this.setState({isCourseBeingEdited: false});
                }}
                onCancelClicked={() => this.setState({isCourseBeingEdited: false})}
            />;
        }
        const course = this.props.selectedCourse;
        const {habitBeingEdited, isShowingAnalytics} = this.state;
        if (habitBeingEdited) {
            const assignment = course.assignments.find(assignment => assignment.id === habitBeingEdited);
            return <HabitPage
                habits={assignment.habits}
                onDataSaved={this.handleHabitSave}
                onCancel={() => this.setState({habitBeingEdited: ''})}
            />;
        }

        const categoryNames = new Set(course.categories.map(category => category.name));
        const assignmentsForCategory = _.groupBy(course.assignments,
            assignment => categoryNames.has(assignment.category) && assignment.category);

        let bottomContent;
        if (isShowingAnalytics) {
            bottomContent = <AnalyticsPage selectedCourse={course} courses={this.props.courses} />
        } else {
            bottomContent = <div>
                {course.categories.map(
                    category => this.renderCategoryTable(category, assignmentsForCategory[category.name])
                )}
                <div style={{float: 'right', marginRight: '30px'}}>
                    <label style={{display: 'flex'}}>
                        <span style={{marginRight: '1ch'}}>Status: <b>{course.isActive ? 'active' : 'inactive'}</b></span>
                        <Switch onChange={this.toggleActive} checked={course.isActive} />
                    </label>
                    <div>
                        <span>Delete class</span>
                        <button className='btn-sm btn-danger' style={{float: 'right', width: 56}} onClick={this.toggleWarningModal} >
                            <i className='fa fa-trash' />
                        </button>
                    </div>
                    
                </div>
                {this.renderWarningModal()}
            </div>
        }

        let title = course.shortName;
        if (course.longName) {
            title += ": " + course.longName;
        }
        return <div className='CourseHomePage'>
            <div className='topBar'>
                <span className={"class-name-title"}>{title}</span>
                <i className="fas fa-cog my-cog" onClick={() => this.setState({isCourseBeingEdited: true})} />
                <div className="btn-group btn-group-toggle my-group" data-toggle="buttons">
                    <label
                        className="btn btn-outline-primary active"
                        onClick={() => this.setState({isShowingAnalytics: false})}
                    >
                        <input type="radio" name="options" id="option1" autoComplete="off" checked/> Class Home
                    </label>
                    <label
                        className="btn btn-outline-primary"
                        onClick={() => this.setState({isShowingAnalytics: true})}
                    >
                        <input type="radio" name="options" id="option2" autoComplete="off"/>Analytics
                    </label>
                </div>
            </div>
            {bottomContent}
        </div>;
    }
}
