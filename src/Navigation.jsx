import React from 'react';
import './Navigation.css'

export class Navigation extends React.Component {
    render() {
        const items = [];
        for (let i = 0; i < 100; i++) {
            items.push(<div key={i}>Content {i}</div>);
        }

        return <div className='Navigation'>
            <nav className='navbar navbar-expand-lg navbar-light'>
                <div className='navbar-brand'>Nav</div>
            </nav>
            <div className='Navigation-main-container'>
                <div className='Navigation-sidebar'>
                    {items}
                </div>
                <div className='Navigation-content-pane'>
                    {items}
                </div>
            </div>
        </div>
    }
}
