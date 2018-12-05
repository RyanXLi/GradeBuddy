import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
import './CollapseWithHeader.css';

/**
 * A simple heading, that when clicked, toggles visibility of content under it.  Set heading text and styling via props,\
 * and content via children.
 * 
 * @author Silas Hsu
 */
export class CollapseWithHeading extends React.Component {
    static propTypes = {
        headingText: PropTypes.string, // Text of the heading
        headingClassName: PropTypes.string, // CSS class of the heading
        initialIsOpen: PropTypes.bool // Whether content is initially visible
    };

    static defaultProps = {
        headingText: '',
        headingClassName: '',
        initialIsOpen: true
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.initialIsOpen
        };
        this.toggleOpenState = this.toggleOpenState.bind(this);
    }

    /**
     * Sets state to toggle content visibility.
     */
    toggleOpenState() {
        this.setState(prevState => {
            return {isOpen: !prevState.isOpen};
        });
    }

    render() {
        const titleBackground = this.props.titleBackground ?  " collapse-title" : "";
        const openIconClassName = this.state.isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-right';
        const openIcon = <i className={openIconClassName} style={{paddingLeft: '0.25em'}} />
        return <div >
            <div className={this.props.headingClassName + titleBackground} onClick={this.toggleOpenState}>
                {this.props.headingText} {openIcon}
            </div>
            <Collapse isOpen={this.state.isOpen}>{this.props.children}</Collapse>
        </div>
    }
}
