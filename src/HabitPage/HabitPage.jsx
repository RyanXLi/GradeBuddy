import React, { Component } from 'react';
import './HabitPage.css'

export class HabitPage extends Component {

    constructor() {
        super();
        this.state = {
            dateDue: '',
            dateStarted: '',
            hourSpent: 0,
            lecturePercentage: 50,
            workedWithPeers: false,
        }
        this.handleSlide = this.handleSlide.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSlide(evt) {
        this.setState({
            lecturePercentage: evt.target.value,
        })
    }

    handleChange(event, statePropName, isNumber=false) {
        console.log(event.target.value);
        const newValue = isNumber ? Number(event.target.value) : event.target.value;
        this.setState({[statePropName]: newValue});
    }

    render() {
        return (<div>

            <h1> Edit study habits</h1>

            <form>
                <div className="form-group">
                    <label htmlFor="Question_startDate">Q1: Date started</label>
                    <input onChange={event => this.handleChange(event, 'dateStarted')} type="date" className="form-control" id="Question_startDate" placeholder="mm/dd/yyyy" />
                </div>

                <div className="form-group">
                    <label htmlFor="Question_due">Q2: Due date</label>
                    <input onChange={event => this.handleChange(event, 'dateDue')} type="date" className="form-control" id="Question_due" placeholder="mm/dd/yyyy" />
                </div>

                <div className="form-group">
                    <label htmlFor="Question_hours">Q3: Total hours spent on this assignment/review? </label>
                    <input onChange={event => this.handleChange(event, 'hourSpent', true)} type="number" className="form-control" id="Question_hours" placeholder="Enter hours" />
                </div>

                <div className="form-group">
                    <label htmlFor="Question_lecture">Q4: What % of lectures did you attend for this
                        assignment/review? </label>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input type="range" className="form-control" id="Question_lecture" min="0" max="100" value={this.state.lecturePercentage}
                                onChange={this.handleSlide}/>
                        <div>{this.state.lecturePercentage}</div>
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="Question_classmates">Q5: Did you work with classmate(s)?</label>
                    <select className="form-control" id="Question_classmates"
                            onChange={event => this.handleChange(event, 'workedWithPeers')}>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>);
    }
}
