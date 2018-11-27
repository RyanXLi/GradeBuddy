import React from 'react';
import { CollapseWithHeading } from '../CollapseWithHeader';

import './HabitPage.css';

/**
 * Content pane displaying habit editability. 
 * 
 * @author Srilakshmi Prasad
 */
export function HabitPage(props) {
    return <div className='HabitPage' style={{flexDirection: 'column', alignItems: 'flex-start'}}>
	    <div style={{marginBottom:50}}>
	    	{this.props.selectedCourse.shortName}
	    </div>
    </div>;
}