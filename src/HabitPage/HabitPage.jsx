import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './HabitPage.css'

export class HabitPage extends Component {
    static propTypes = {
        habits: PropTypes.object.isRequired,
        onDataSaved: PropTypes.func,
        onCancel: PropTypes.func
    };

    static defaultProps = {
        onDataSaved: _.noop,
        onCancel: _.noop
    };

    constructor(props) {
        super(props);
        this.state = {
            dateDue: '',
            dateStarted: '',
            hoursSpent: 0,
            lecturePercentage: 50,
            workedWithPeers: false,
            ...props.habits,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSavedPressed = this.handleSavedPressed.bind(this);
        this.handleCancelPressed = this.handleCancelPressed.bind(this);
    }

    handleChange(event, statePropName, isNumber=false) {
        const newValue = isNumber ? Number(event.target.value) : event.target.value;
        this.setState({[statePropName]: newValue});
    }

    handleSavedPressed() {
        this.props.onDataSaved(this.state);
    }

    handleCancelPressed() {
        this.props.onCancel();
    }

    render() {
        const {dateDue, dateStarted, hoursSpent, lecturePercentage, workedWithPeers} = this.state;
        return <div>
            <div className="habit-title"> Edit study habits</div>

            <div className='form-group'>
                <label htmlFor='Question_startDate'>Q1: Date started</label>
                <input value={dateStarted} onChange={event => this.handleChange(event, 'dateStarted')} type='date' className='form-control' id='Question_startDate' placeholder='mm/dd/yyyy' />
            </div>

            <div className='form-group'>
                <label htmlFor='Question_due'>Q2: Due date</label>
                <input value={dateDue} onChange={event => this.handleChange(event, 'dateDue')} type='date' className='form-control' id='Question_due' placeholder='mm/dd/yyyy' />
            </div>

            <div className='form-group'>
                <label htmlFor='Question_hours'>Q3: Total hours spent on this assignment/review? </label>
                <input value={hoursSpent} onChange={event => this.handleChange(event, 'hoursSpent', true)} type='number' className='form-control' id='Question_hours' placeholder='Enter hours' />
            </div>

            <div className='form-group'>
                <label htmlFor='Question_lecture'>Q4: What % of lectures did you attend for this
                    assignment/review? </label>
                <div className="lecture-slider" style={{display: 'flex', alignItems: 'center'}}>
                    <input type='range' className='form-control' id='Question_lecture' min='0' max='100' value={lecturePercentage}
                            onChange={event => this.handleChange(event, 'lecturePercentage', true)}/>
                    <div className="lecture-number">{lecturePercentage}</div>
                </div>
            </div>

            <div className='form-group'>
                <label htmlFor='Question_classmates'>Q5: Did you work with classmate(s)?</label>
                <select value={workedWithPeers} className='form-control' id='Question_classmates'
                        onChange={event => this.handleChange(event, 'workedWithPeers')}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </div>

            <button className='btn btn-primary' onClick={this.handleSavedPressed}>Save</button>
            <button className='btn btn-light' onClick={this.handleCancelPressed}>Cancel</button>
        </div>;
    }
}
