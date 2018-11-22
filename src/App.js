import React, { Component } from 'react';
import _ from 'lodash';
import { Navigation } from './Navigation';
import uuid from 'uuid/v4';

const COURSE = {
    id: uuid(),
    shortName: "CS125",
    longName: "CS125 Intro to Computer Science",
    isActive: true,
    categories: [],
    assignments: [ // Array of objects with this schema, empty at first
        {
            name: "HW1",
            weight: 0, // If 0, use default weight
            pointsEarned: 80,
            pointsPossible: 100,
            category: "Homeworks",
            habits: {
                stat1: 0,
                stat2: 0,
            }
        }
    ]
};
const COURSE2 = _.clone(COURSE);
COURSE2.id = uuid();
COURSE2.isActive = false;
const COURSE3 = _.clone(COURSE);
COURSE3.id = uuid();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [COURSE, COURSE2, COURSE3]
        };
        this.handleCourseAdd = this.handleCourseAdd.bind(this);
    }

    /**
     * Sets state to add a course.
     * 
     * @param {Course} course - course object to add
     */
    handleCourseAdd(course) {
        this.setState(prevState => {
            const nextCourses = prevState.courses.slice();
            nextCourses.push(course);
            return {courses: nextCourses};
        });
    }

    render() {
        return <Navigation courses={this.state.courses} onCourseAdded={this.handleCourseAdd} />;
    }
}

export default App;
