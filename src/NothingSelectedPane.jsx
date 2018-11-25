import React from 'react';
import './NothingSelectedPane.css';

/**
 * Content pane explaining that no class or function is selected.
 * 
 * @author Silas Hsu
 */
export function NothingSelectedPane() {
    return <div className='NothingSelectedPane'>
        <span className='NothingSelectedPane-inner'>
            Nothing selected.  Choose a class on the left, or add a new class.
        </span>
    </div>;
}
