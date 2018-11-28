import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CollapseWithHeading } from '../CollapseWithHeader';
import { HabitPage } from '../HabitPage/HabitPage';
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
    }

    setHabitBeingEdited(assignment) {
        this.setState({habitBeingEdited: assignment.id});
    }

    renderCategoryTable(category, assignments=[]) {
        const assignmentRows = assignments.map(assignment => (
            <tr key={assignment.id}>
                <td>{assignment.name}</td>
                <td>{assignment.pointsEarned}/{assignment.pointsPossible}</td>
                <td>
                    <span className='btn-link' onClick={() => this.setHabitBeingEdited(assignment)}>
                        Add habits
                    </span>
                </td>
                <td><i className="fa fa-trash"/></td>
            </tr>
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
            return <HabitPage habits={assignment.habits} onDataSaved={_.noop} onCancel={_.noop} />;
        }

        const categoryNames = new Set(course.categories.map(category => category.name));
        const assignmentsForCategory = _.groupBy(course.assignments,
            assignment => categoryNames.has(assignment.category) && assignment.category);

        return <div className='CourseHomePage'>
            <div style={{marginBottom:50}}>
                {this.props.selectedCourse.shortName}
            </div>
            {course.categories.map(
                category => this.renderCategoryTable(category, assignmentsForCategory[category.name])
            )}
            {this.renderCategoryTable({name: 'Uncategorized'}, assignmentsForCategory[false])}
        </div>;
    }
}
