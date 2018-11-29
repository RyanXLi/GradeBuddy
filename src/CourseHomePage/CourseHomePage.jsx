import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { CollapseWithHeading } from '../CollapseWithHeader';
import { HabitPage } from '../HabitPage/HabitPage';
import { AssignmentRow } from './AssignmentRow';
import './CourseHomePage.css';


/**
 * Content pane displaying the assignment details of course selected.
 * 
 * @author Srilakshmi Prasad
 */
export class CourseHomePage extends React.Component {
    static propTypes = {
        selectedCourse: PropTypes.object.isRequired,
        onCourseEdited: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            habitBeingEdited: '' // ID of the assignment whose habits are being edited
        };
        this.handleAssignmentAdd = this.handleAssignmentAdd.bind(this);
        this.handleAssignmentSave = this.handleAssignmentSave.bind(this);
        this.setHabitBeingEdited = this.setHabitBeingEdited.bind(this);
        this.handleHabitSave = this.handleHabitSave.bind(this);
    }

    handleAssignmentAdd(category) {
        const copy = _.clone(this.props.selectedCourse);
        copy.assignments = this.props.selectedCourse.assignments.slice();
        copy.assignments.push({
            id: uuid(),
            name: 'New assignment',
            weight: 0, // If 0, use default weight
            pointsEarned: 0,
            pointsPossible: 0,
            category: category,
            habits: {}
        });
    }

    handleAssignmentSave(newAssignment) {

    }

    handleAssignmentDelete(assignment) {

    }

    setHabitBeingEdited(assignment) {
        this.setState({habitBeingEdited: assignment.id});
    }

    handleHabitSave(habits) {
        const copy = _.clone(this.props.selectedCourse);
        copy.habits = habits;
        this.props.onCourseEdited(copy);
        this.setState({habitBeingEdited: ''});
    }

    renderCategoryTable(category, assignments=[]) {
        const assignmentRows = assignments.map(assignment => (
            <AssignmentRow
                key={assignment.id}
                assignment={assignment}
                onEditHabitPressed={() => this.setHabitBeingEdited(assignment)}
                onAssignmentSaved={this.handleAssignmentSave}
                onAssignmentDeleted={this.handleAssignmentDelete}
            />
        ));

        return <CollapseWithHeading key={category.name} headingText={category.name}>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Assignment</th><th>Grade</th><th>Habits</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {assignmentRows}
                    <tr><td colSpan={4}><i className="fa fa-plus"/></td></tr>
                </tbody>
            </table>
        </CollapseWithHeading>
    }

    render() {
        const course = this.props.selectedCourse;
        const habitBeingEdited = this.state.habitBeingEdited
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

        return <div className='CourseHomePage'>
            <div className='CourseHomePage-title'>
                {this.props.selectedCourse.longName}
                <button>Class home</button>
                <button>Analytics</button>
            </div>
            {course.categories.map(
                category => this.renderCategoryTable(category, assignmentsForCategory[category.name])
            )}
            {this.renderCategoryTable({name: 'Uncategorized'}, assignmentsForCategory[false])}
        </div>;
    }
}
