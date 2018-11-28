import React from 'react';
import { CollapseWithHeading } from '../CollapseWithHeader';
import './CourseHomePage.css';
import { HabitPage } from '../HabitPage/HabitPage';

/**
 * Content pane displaying the assignment details of course selected.
 * 
 * @author Srilakshmi Prasad
 */
export class CourseHomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			habitBeingEdited: ''
		};
	}

	render() {
		if (this.state.habitBeingEdited) {
			return <HabitPage />;
		}

		//EDIT HABIT should be clickable and lead to HabitPage, passing correct params
		return <div className='CourseHomePage' style={{flexDirection: 'column', alignItems: 'flex-start'}}>
	    	<div style={{marginBottom:50}}>
	    		{this.props.selectedCourse.shortName}
	    	</div>
	        <CollapseWithHeading headingText='Homework'>
	            <table class="table table-hover">
				  <tbody>
				    <tr>
				      <th scope="row">Homework 1 (33%)</th>
				      <td>80/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Homework 1'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				    <tr>
				      <th scope="row">Homework 2 (33%)</th>
				      <td>70/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Homework 2'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				    <tr>
				      <th scope="row">Homework 3 (33%)</th>
				      <td>100/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Homework 3'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				  </tbody>
				</table>
	        </CollapseWithHeading>
	        <CollapseWithHeading headingText='Exam'>
	            <table class="table table-hover">
				  <tbody>
				    <tr>
				      <th scope="row">Exam 1 (33%)</th>
				      <td>80/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Exam 1'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				    <tr>
				      <th scope="row">Exam 2 (33%)</th>
				      <td>70/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Exam 2'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				    <tr>
				      <th scope="row">Exam 3 (33%)</th>
				      <td>100/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Exam 3'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				  </tbody>
				</table>
	        </CollapseWithHeading>
	        <CollapseWithHeading headingText='Quiz'>
	            <table class="table table-hover">
				  <tbody>
				    <tr>
				      <th scope="row">Quiz 1 (33%)</th>
				      <td>80/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Quiz 1'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				    <tr>
				      <th scope="row">Quiz 2 (33%)</th>
				      <td>70/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Quiz 2'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				    <tr>
				      <th scope="row">Quiz 3 (33%)</th>
				      <td>100/100</td>
				      <td onClick={() => this.setState({habitBeingEdited: 'Quiz 3'})}>Edit Habit</td>
				      <td>Trash</td>
				    </tr>
				  </tbody>
				</table>
	        </CollapseWithHeading>
    	</div>;
	}
}
