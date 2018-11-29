/**
 * Created by RyanX on 2018/11/16.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InlineEdit from 'react-edit-inline2';
import './AssignmentRow.css'

export class AssignmentRow extends Component {
    static propTypes = {
        assignment: PropTypes.object.isRequired,
        onEditHabitPressed: PropTypes.func,
        onAssignmentSaved: PropTypes.func,
        onAssignmentDeleted: PropTypes.func,
    };

    static defaultProps = {
        onEditHabitPressed: _.noop,
        onAssignmentSaved: _.noop,
        onAssignmentDeleted: _.noop,
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(data, propName, isNumber=false) {
        const copy = _.clone(this.props.assignment);
        copy[propName] = isNumber ? Number(data[propName]) : data[propName];
        this.props.onAssignmentSaved(copy);
    }

    validateText(text) {
        return (text.length > 0 && text.length < 256);
    }

    render() {
        const {name, pointsEarned, pointsPossible} = this.props.assignment;
        return (
            <tr>
                <td>
                    <InlineEdit
                        text={name}
                        paramName="name"
                        change={data => this.handleChange(data, 'name')}
                        validate={this.validateText}
                        activeClassName="nameEditing"
                    />
                </td>
                <td>
                    <InlineEdit
                        text={String(pointsEarned)}
                        paramName="pointsEarned"
                        change={data => this.handleChange(data, 'pointsEarned', true)}
                        validate={isFinite}
                        activeClassName="pointsEarnedEditing"
                    />
                    /
                    <InlineEdit
                        text={String(pointsPossible)}
                        paramName="pointsPossible"
                        change={data => this.handleChange(data, 'pointsPossible', true)}
                        validate={isFinite}
                        activeClassName="pointsEarnedEditing"
                    />
                </td>
                <td>
                    <span className='btn-link' onClick={this.props.onEditHabitPressed}>
                        Add habits
                    </span>
                </td>
                <td><i className="fa fa-trash" onClick={this.props.onAssignmentDeleted}/></td>
            </tr>
        );
    }
}
