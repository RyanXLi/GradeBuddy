import React, { Component } from 'react';
import { Navigation } from './Navigation';
import uuid from 'uuid/v4';

const COURSE = {
    id: uuid(),
    shortName: "CS125",
    longName: "Intro to Computer Science",
    isActive: true,
    categories: [
        {
            name: 'Homework',
            weight: 30
        },
        {
            name: 'Exams',
            weight: 50
        },
        {
            name: 'Quizzes',
            weight: 20
        }
    ],
    assignments: [ // Array of objects with this schema, empty at first
        {
            id: uuid(),
            name: "HW1",
            weight: 0, // If 0, use default weight
            pointsEarned: 7,
            pointsPossible: 8,
            category: "Homework",
            habits: {
                dateStarted: '2018-05-05',
                dateDue: '2018-05-06',
                hoursSpent: 2,
                lecturePercentage: 75,
                workedWithPeers: true
            }
        },
        {
            id: uuid(),
            name: "HW2",
            weight: 0, // If 0, use default weight
            pointsEarned: 11,
            pointsPossible: 12,
            category: "Homework",
            habits: {
                dateStarted: '2018-05-05',
                dateDue: '2018-05-07',
                hoursSpent: 3,
                lecturePercentage: 100,
                workedWithPeers: true
            }
        },
        {
            id: uuid(),
            name: "Exam 1",
            weight: 0, // If 0, use default weight
            pointsEarned: 100,
            pointsPossible: 100,
            category: "Exams",
            habits: {
                dateStarted: '2018-05-05',
                dateDue: '2018-05-10',
                hoursSpent: 5,
                lecturePercentage: 90,
                workedWithPeers: false
            }
        },
    ]
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [COURSE]
        };
        this.handleCoursesChanged = this.handleCoursesChanged.bind(this);
    }

    /**
     * Sets state to change course data
     * 
     * @param {Course[]} courses - course array that will replace state
     */
    handleCoursesChanged(newCourses) {
        this.setState({courses: newCourses});
    }

    render() {
        return <Navigation courses={this.state.courses} onCoursesChanged={this.handleCoursesChanged} />;
    }
}

export default App;
