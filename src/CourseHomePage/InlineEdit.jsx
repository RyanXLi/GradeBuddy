import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ENTER_KEY_CODE = 13;

export class InlineEdit extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        staticClassName: PropTypes.string,
        onFocusOut: PropTypes.func,
        size: PropTypes.number
    };

    static defaultProps = {
        onFocusOut: _.noop
    };

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            value: props.text
        };
        this.setEditing = this.setEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    setEditing() {
        this.setState({isEditing: true});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleFocusOut(event) {
        this.props.onFocusOut(event.target.value);
        this.setState({isEditing: false});
    }

    handleKeyUp(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.handleFocusOut(event);
        }
    }

    render() {
        const {size, text, staticClassName} = this.props;
        const {isEditing, value} = this.state;
        if (isEditing) {
            return <input
                value={value}
                size={size}
                onChange={this.handleChange}
                onBlur={this.handleFocusOut}
                onKeyUp={this.handleKeyUp}
                autoFocus
            />;
        } else {
            return <span
                tabIndex={0}
                className={staticClassName}
                onClick={this.setEditing}
                onFocus={this.setEditing}
            >
                {text}
            </span>;
        }
    }
}
