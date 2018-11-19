import React from 'react';
import './NothingSelectedPane.css';

export function NothingSelectedPane() {
    return <div className='NothingSelectedPane'>
        <span className='NothingSelectedPane-inner'>
            Nothing selected.  Choose a class on the right, or add a new class.
        </span>
    </div>;
}
