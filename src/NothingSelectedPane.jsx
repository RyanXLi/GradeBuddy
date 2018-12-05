import React from 'react';
import './NothingSelectedPane.css';

/**
 * Content pane explaining that no class or function is selected.
 * 
 * @author Silas Hsu
 * @modifier Srilakshmi Prasad
 */
export function NothingSelectedPane() {
    return <div className='NothingSelectedPane'>
        <div className='welcome'>
        	Welcome back!
        </div>
        <span className='NothingSelectedPane-inner'>
            Select a class on the left, or add a new class.
        </span>
    </div>;
}
