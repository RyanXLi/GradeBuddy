/**
 * Created by RyanX on 2018/11/16.
 */

import React, { Component } from 'react';
import InlineEdit from 'react-edit-inline';
import './AssignmentRow.css'

export class AssignmentRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
        this.nameChanged = this.nameChanged.bind(this);
        this.pointsEarnedChanged = this.pointsEarnedChanged.bind(this);
    }

    nameChanged(data) {
        this.setState({
            name: data
        });
        console.log(this.state.name);
    }

    pointsEarnedChanged(data) {
        this.setState({
            pointsEarned: Number(data)
        });
        console.log(this.state.pointsEarned);
    }

    validateText(text) {
        return (text.length > 0 && text.length < 256);
    }

    validateNumber(number) {
        return (isNaN(number));
    }

    render() {

        const assignment = this.props.assignment;
        return(
            <tr className='assignmentRow' key={assignment.id}>

                <td>
                    <InlineEdit
                    text={this.state.name}
                    paramName="name"
                    change={this.nameChanged}
                    validate={this.validateText}
                    activeClassName="nameEditing"
                    />
                </td>
                <td>
                    <InlineEdit
                        text={this.state.pointsEarned}
                        paramName="pointsEarned"
                        change={this.pointsEarnedChanged}
                        validate={this.validateNumber}
                        activeClassName="pointsEarnedEditing"
                    />
                    /{this.state.pointsPossible}
                </td>
                <td>
                    <span className='btn-link' onClick={() => this.props.setHabitBeingEdited(assignment)}>
                        Add habits
                    </span>
                </td>
                <td><i className="fa fa-trash" onClick={this.props.onAssignmentDeleted}/></td>
            </tr>
        );
    }
}



