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
 * @author Alex Blacketor
 */
export class CourseHomePage extends React.Component {
    static propTypes = {
        selectedCourse: PropTypes.object.isRequired,
        onCourseEdited: PropTypes.func
    };

    static defaultProps = {
        onCourseEdited: _.noop
    };

    constructor(props) {
        super(props);
        this.state = {
            habitBeingEdited: '', // ID of the assignment whose habits are being edited
            enabled: false
        };
        this.handleAssignmentAdd = this.handleAssignmentAdd.bind(this);
        this.handleAssignmentSave = this.handleAssignmentSave.bind(this);
        this.handleAssignmentDelete = this.handleAssignmentDelete.bind(this);
        this.setHabitBeingEdited = this.setHabitBeingEdited.bind(this);
        this.handleHabitSave = this.handleHabitSave.bind(this);
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
                onAssignmentDeleted={() => this.handleAssignmentDelete(assignment)}
            />
        ));

        return <CollapseWithHeading className='categoryHeading' key={category.name} headingText={category.name}>
            <table className="table table-hover">
                <thead>
                    <tr className='tableRow'>
                        <th>Assignment</th><th>Grade</th><th>Habits</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {assignmentRows}
                    <tr onClick={() => this.handleAssignmentAdd(category.name)}>
                        <td colSpan={4}><i className="fa fa-plus"/></td>
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
            <div className='topBar'>
                <button className='classHomeButton'>Class Home</button>
                <button className='analyticsButton'>Analytics</button>
            </div>
            <div className='courseName'>{this.props.selectedCourse.shortName}</div>
            {course.categories.map(
                category => this.renderCategoryTable(category, assignmentsForCategory[category.name])
            )}
            
        </div>;
    }
}
