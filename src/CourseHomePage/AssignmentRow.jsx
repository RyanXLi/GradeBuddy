/**
 * Created by RyanX on 2018/11/16.
 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { InlineEdit } from './InlineEdit';
import './AssignmentRow.css'

export class AssignmentRow extends React.Component {
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
        if (data.length <= 0) {
            return;
        }

        const newValue = isNumber ? Number(data) : data;
        if (isNumber && !isFinite(newValue)) {
            return;
        }

        const copy = _.clone(this.props.assignment);
        copy[propName] = newValue;
        this.props.onAssignmentSaved(copy);
    }

    render() {
        const {name, pointsEarned, pointsPossible, habits} = this.props.assignment;
        return (
            <tr className='AssignmentRow'>
                <td>
                    <InlineEdit
                        text={name}
                        staticClassName='AssignmentRow-editable'
                        onFocusOut={data => this.handleChange(data, 'name')}
                    />
                </td>
                <td>
                    <InlineEdit
                        text={String(pointsEarned)}
                        staticClassName='AssignmentRow-editable'
                        onFocusOut={data => this.handleChange(data, 'pointsEarned', true)}
                        size={5}
                    />
                    /
                    <InlineEdit
                        text={String(pointsPossible)}
                        staticClassName='AssignmentRow-editable'
                        onFocusOut={data => this.handleChange(data, 'pointsPossible', true)}
                        size={5}
                    />
                </td>
                <td>
                    <span className='btn-link' onClick={this.props.onEditHabitPressed}>
                        {_.isEmpty(habits) ? 'Add habits' : 'Edit habits'}
                    </span>
                </td>
                <td><i className='fa fa-trash' onClick={this.props.onAssignmentDeleted}/></td>
            </tr>
        );
    }
}
