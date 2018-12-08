import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CollapseWithHeading } from './CollapseWithHeader';
import { NothingSelectedPane } from './NothingSelectedPane';
import { NewCoursePage } from './NewCoursePage/NewCoursePage';
import { CourseHomePage } from './CourseHomePage/CourseHomePage';
import bulbImage from './single_bulb_logo.png';

import './Navigation.css';

/**
 * Top level navigation for the app.  Includes nav bar and side bar, and renders the main content pane.
 * 
 * @author Silas Hsu
 */
export class Navigation extends React.Component {
    static propTypes = {
        courses: PropTypes.arrayOf(PropTypes.object), // Array of Course objects to manage
        /**
         * Callback when a course is added, or courses are changed.  Signature (newCourses: Course[]): void
         * 
         * @param {Course[]} newCourses - new courses
         */
        onCoursesChanged: PropTypes.func
    };

    static defaultProps = {
        courses: [],
        onCoursesChanged: _.noop
    };

    constructor(props) {
        super(props);
        this.state = {
            isAddingCourse: false,
            selectedCourse: '',
            isSidebarOpen: true,
        };

        this.showAddCoursesPane = this.showAddCoursesPane.bind(this);
        this.handleCourseAdd = this.handleCourseAdd.bind(this);
        this.handleCourseEdit = this.handleCourseEdit.bind(this);
        this.handleCourseDelete = this.handleCourseDelete.bind(this);
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
     * Handles adding a new course.  Sets the selected course to be the new one and calls the `onCourseAdded` callback.
     * 
     * @param {Course} course - course data that was added
     */
    handleCourseAdd(course) {
        this.setSelectedCourse(course);
        const coursesCopy = this.props.courses.slice();
        coursesCopy.push(course);
        this.props.onCoursesChanged(coursesCopy);
    }

    handleCourseEdit(course) {
        const index = this.props.courses.findIndex(course => course.id === this.state.selectedCourse);
        const coursesCopy = this.props.courses.slice();
        coursesCopy[index] = course;
        this.props.onCoursesChanged(coursesCopy);
    }

    handleCourseDelete() {
        const index = this.props.courses.findIndex(course => course.id === this.state.selectedCourse);
        const coursesCopy = this.props.courses.slice();
        coursesCopy.splice(index, 1);
        this.props.onCoursesChanged(coursesCopy);
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
            contentPane = <CourseHomePage
                courses={this.props.courses}
                selectedCourse={selectedCourse}
                onCourseEdited={this.handleCourseEdit}
                onCourseDeleteRequested={this.handleCourseDelete}
            />;
        } else if (this.state.isAddingCourse) {
            contentPane = <NewCoursePage
                onCourseSaved={this.handleCourseAdd}
                onCancelClicked={() => this.setState({isAddingCourse: false})}
            />;
        } else {
            contentPane = <NothingSelectedPane />;
        }

        return <div className='Navigation'>
            <nav className='navbar navbar-expand-lg navbar-light Navigation-navbar'>
                <div className='navbar-brand' style={{display: 'flex'}} onClick={() => this.setState({selectedCourse: ''})}>
                    <img src={bulbImage} className="my-img" alt="logo" />
                    <span className="app-title">Grade Buddy</span>
                </div>
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
