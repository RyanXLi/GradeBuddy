import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid/v4';
import Switch from 'react-switch';

import { AssignmentRow } from './AssignmentRow';
import { CollapseWithHeading } from '../CollapseWithHeader';
import { HabitPage } from '../HabitPage/HabitPage';
import { AnalyticsPage } from '../AnalyticsPage/AnalyticsPage';
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
        onCourseEdited: PropTypes.func
    };

    static defaultProps = {
        onCourseEdited: _.noop
    };

    constructor(props) {
        super(props);
        this.state = {
            prevCourseId: props.selectedCourse.id,
            habitBeingEdited: '', // ID of the assignment whose habits are being edited
            isShowingAnalytics: false
        };
        this.handleAssignmentAdd = this.handleAssignmentAdd.bind(this);
        this.handleAssignmentSave = this.handleAssignmentSave.bind(this);
        this.handleAssignmentDelete = this.handleAssignmentDelete.bind(this);
        this.setHabitBeingEdited = this.setHabitBeingEdited.bind(this);
        this.handleHabitSave = this.handleHabitSave.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.selectedCourse.id !== state.prevCourseId) {
            return {
                prevCourseId: props.selectedCourse.id,
                habitBeingEdited: ''
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

        return <CollapseWithHeading className='categoryHeading' key={category.name} headingText={category.name} titleBackground={true}>
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

    handleChange(checked) {
        this.setState({ habitBeingEdited:this.state.habitBeingEdited, enabled:checked });
    }

    render() {
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
                <label style={{display: 'flex'}}>
                    <span style={{marginRight: '1ch'}}>Toggle course active status</span>
                    <Switch onChange={this.toggleActive} checked={course.isActive} />
                </label>
            </div>
        }

        return <div className='CourseHomePage'>
            <div className='topBar'>
                {this.props.selectedCourse.shortName} : {this.props.selectedCourse.longName}
                <div className="percentage"></div>
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
