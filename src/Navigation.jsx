import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CollapseWithHeading } from './CollapseWithHeader';
import { NothingSelectedPane } from './NothingSelectedPane';

import './Navigation.css';

export class Navigation extends React.Component {
    static propTypes = {
        courses: PropTypes.arrayOf(PropTypes.object)
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

        this.toggleBooleanState = this.toggleBooleanState.bind(this);
    }

    toggleBooleanState(stateName) {
        this.setState(prevState => {
            return {[stateName]: !prevState[stateName]}
        });
    }

    setSelectedCourse(course) {
        this.setState({selectedCourse: course.id});
    }

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
        return <div className='btn-group-vertical'>{courseElements}</div>
    }

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

            <button className='btn btn-primary btn-block Navigation-add-course-button'>Add new class</button>
        </div>;
    }

    render() {
        return <div className='Navigation'>
            <nav className='navbar navbar-expand-lg navbar-light Navigation-navbar'>
                <div className='navbar-brand'>Grade buddy</div>
            </nav>
            <div className='Navigation-main-container'>
                {this.renderSidebar()}
                <div
                    className='Navigation-sidebar-opener hoverable'
                    onClick={() => this.toggleBooleanState('isSidebarOpen')}
                >
                    {this.state.isSidebarOpen ? '‹' : '›'}
                </div>
                <div className='Navigation-content-pane'>
                    <NothingSelectedPane />
                </div>
            </div>
        </div>
    }
}
