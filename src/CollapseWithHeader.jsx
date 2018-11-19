import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

export class CollapseWithHeading extends React.Component {
    static propTypes = {
        headingText: PropTypes.string,
        headingClassName: PropTypes.string,
        initialIsOpen: PropTypes.bool
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

    toggleOpenState() {
        this.setState(prevState => {
            return {isOpen: !prevState.isOpen};
        });
    }

    render() {
        const openIconClassName = this.state.isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-right';
        const openIcon = <i className={openIconClassName} style={{paddingLeft: '0.25em'}} />
        return <div>
            <div className={this.props.headingClassName} onClick={this.toggleOpenState}>
                {this.props.headingText} {openIcon}
            </div>
            <Collapse isOpen={this.state.isOpen}>{this.props.children}</Collapse>
        </div>
    }
}
