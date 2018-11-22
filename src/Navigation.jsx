import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CollapseWithHeading } from './CollapseWithHeader';
import { NothingSelectedPane } from './NothingSelectedPane';
import { NewCoursePage } from './NewCoursePage/NewCoursePage';

import './Navigation.css';

/**
 * Top level navigation for the app.  Includes nav bar and side bar, and renders the main content pane.
 * 
 * @author Silas Hsu
 */
export class Navigation extends React.Component {
    static propTypes = {
        courses: PropTypes.arrayOf(PropTypes.object) // Array of Course objects to manage
    };

    static defaultProps = {
        courses: []
    };

    constructor(props) {
        super(props);
        this.state = {
            isAddingCourse: false,
            selectedCourse: '',
            isSidebarOpen: true,
        };

        this.showAddCoursesPane = this.showAddCoursesPane.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    /**
     * Sets state to deselects any selected class and show the new class pane.
     */
    showAddCoursesPane() {
        this.setState({
            isAddingCourse: true,
            selectedCourse: ''
        });
    }

    /**
     * Sets state to select a course.
     * 
     * @param {Course} course - course object
     */
    setSelectedCourse(course) {
        this.setState({
            isAddingCourse: false,
            selectedCourse: course.id
        });
    }

    /**
     * Sets state to toggle visibility of the sidebar.
     */
    toggleSidebar() {
        this.setState(prevState => {
            return {isSidebarOpen: !prevState.isSidebarOpen};
        });
    }

    /**
     * Renders a selectable list of courses.
     * 
     * @param {Course[]} courses - array of courses to render
     * @return {JSX.Element} elements to render
     */
    renderCourseGroup(courses) {
        const courseElements = courses.map(course => {
            let className;
            if (course.id === this.state.selectedCourse) {
                className = 'btn btn-success Navigation-sidebar-course';
            } else {
                className = 'btn btn-light hoverable Navigation-sidebar-course';
            }

            return <button
                key={course.id}
                className={className}
                title={course.shortName}
                onClick={() => this.setSelectedCourse(course)}
            >
                {course.shortName}
            </button>;
        });
        return <div className='btn-group-vertical'>{courseElements}</div>;
    }

    /**
     * Renders the sidebar of the app.
     * 
     * @return {JSX.Element} element to render
     */
    renderSidebar() {
        const [activeCourses, inactiveCourses] = _.partition(this.props.courses, course => course.isActive);
        return <div className='Navigation-sidebar' style={{display: this.state.isSidebarOpen ? undefined : 'none'}}>
            <CollapseWithHeading
                headingText='Active courses'
                headingClassName='Navigation-sidebar-heading Navigation-sidebar-active-heading'
            >
                {this.renderCourseGroup(activeCourses)}
            </CollapseWithHeading>

            <CollapseWithHeading
                headingText='Inactive courses'
                headingClassName='Navigation-sidebar-heading Navigation-sidebar-inactive-heading'
                initialIsOpen={false}
            >
                {this.renderCourseGroup(inactiveCourses)}
            </CollapseWithHeading>

            <button
                className='btn btn-primary btn-block Navigation-add-course-button'
                onClick={this.showAddCoursesPane}
            >
                <i className="fas fa-plus" /> Add new class
            </button>
        </div>;
    }

    render() {
        const selectedCourse = this.props.courses.find(course => course.id === this.state.selectedCourse);
        let contentPane;
        if (selectedCourse) {
            contentPane = 'Course pane for ' + selectedCourse.longName;
        } else if (this.state.isAddingCourse) {
            contentPane = <NewCoursePage />;
        } else {
            contentPane = <NothingSelectedPane />;
        }

        return <div className='Navigation'>
            <nav className='navbar navbar-expand-lg navbar-light Navigation-navbar'>
                <div className='navbar-brand'>Grade buddy</div>
            </nav>
            <div className='Navigation-main-container'>
                {this.renderSidebar()}
                <div className='Navigation-sidebar-opener hoverable' onClick={this.toggleSidebar}>
                    {this.state.isSidebarOpen ? '‹' : '›'}
                </div>
                <div className='Navigation-content-pane'>{contentPane}</div>
            </div>
        </div>
    }
}
