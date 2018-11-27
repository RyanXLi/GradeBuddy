import React from 'react';
import { CollapseWithHeading } from '../CollapseWithHeader';

import './CourseHomePage.css';

/**
 * Content pane displaying the assignment details of course selected.
 * 
 * @author Srilakshmi Prasad
 */
export function CourseHomePage(props) {
    return <div className='CourseHomePage'>
        <CollapseWithHeading headingText='asdf'>
            {props.selectedCourse.longName}
        </CollapseWithHeading>
    </div>;
}
