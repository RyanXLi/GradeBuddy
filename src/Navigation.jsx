import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import _ from 'lodash';
import uuid from 'uuid/v4';

import './Navigation.css';

const SIDEBAR_ID = uuid();

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
            isActiveOpen: true,
            isInactiveOpen: true,
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
        return courses.map(course => {
            let className;
            if (course.id === this.state.selectedCourse) {
                className = 'Navigation-sidebar-course-selected';
            } else {
                className = 'Navigation-sidebar-course hoverable';
            }
            return <div
                key={course.id}
                className={className}
                onClick={() => this.setSelectedCourse(course)}
            >
                {course.shortName}
            </div>;
        });
    }

    renderSidebar() {
        const [activeCourses, inactiveCourses] = _.partition(this.props.courses, course => course.isActive);
        return <div id={SIDEBAR_ID} className='Navigation-sidebar'>
            <div
                className='Navigation-sidebar-active-heading'
                onClick={() => this.toggleBooleanState('isActiveOpen')}
            >
                Active courses
            </div>
            <Collapse isOpen={this.state.isActiveOpen}>
                {this.renderCourseGroup(activeCourses)}
            </Collapse>

            <div
                className='Navigation-sidebar-inactive-heading'
                onClick={() => this.toggleBooleanState('isInactiveOpen')}
            >
                Inactive courses
            </div>
            <Collapse isOpen={this.state.isInactiveOpen}>
                {this.renderCourseGroup(inactiveCourses)}
            </Collapse>
        </div>;
    }

    render() {
        const items = [];
        for (let i = 0; i < 100; i++) {
            items.push(<div key={i}>Content {i}</div>);
        }

        return <div className='Navigation'>
            <nav className='navbar navbar-expand-lg navbar-light Navigation-navbar'>
                <div className='navbar-brand'>Grade buddy</div>
            </nav>
            <div className='Navigation-main-container'>
                {this.state.isSidebarOpen && this.renderSidebar()}
                <div
                    className='Navigation-sidebar-opener hoverable'
                    onClick={() => this.toggleBooleanState('isSidebarOpen')}
                >
                    {this.state.isSidebarOpen ? '‹' : '›'}
                </div>
                <div className='Navigation-content-pane'>
                    {items}
                </div>
            </div>
        </div>
    }
}
