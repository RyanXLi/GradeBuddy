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
        return <div>
            <div className="habit-title"> Edit study habits</div>

            <div className='form-group'>
                <label htmlFor='Question_startDate' className="question">Q1: Date started</label>
                <input onChange={event => this.handleChange(event, 'dateStarted')} type='date' className='form-control' id='Question_startDate' placeholder='mm/dd/yyyy' />
            </div>

            <div className='form-group'>
                <label htmlFor='Question_due' className="question">Q2: Due date</label>
                <input onChange={event => this.handleChange(event, 'dateDue')} type='date' className='form-control' id='Question_due' placeholder='mm/dd/yyyy' />
            </div>

            <div className='form-group'>
                <label htmlFor='Question_hours' className="question">Q3: Total hours spent on this assignment/review? </label>
                <input onChange={event => this.handleChange(event, 'hoursSpent', true)} type='number' className='form-control' id='Question_hours' placeholder='Enter hours' />
            </div>

            <div className='form-group'>
                <label htmlFor='Question_lecture' className="question">Q4: What % of lectures did you attend for this
                    assignment/review? </label>
                <div className="lecture-slider" style={{display: 'flex', alignItems: 'center'}}>
                    <input type='range' className='form-control' id='Question_lecture' min='0' max='100' value={this.state.lecturePercentage}
                            onChange={event => this.handleChange(event, 'lecturePercentage', true)}/>
                    <div className="lecture-number">{this.state.lecturePercentage}</div>
                </div>
            </div>

            <div className='form-group'>
                <label htmlFor='Question_classmates' className="question">Q5: Did you work with classmate(s)?</label>
                <select className='form-control' id='Question_classmates'
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
