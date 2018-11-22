import React, { Component } from 'react';

import './AssignmentCategoryItem.css';

export class AssignmentCategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleItemClosed = this.handleItemClosed.bind(this);
    }

    handleItemClosed() {
        this.props.setItem(this.props.index, {
            name: this.props.item.name,
            weight: 0,
        });
    }

    handleCheckedChange() {
        if (this.state.checked) {
            this.handleItemClosed();
        }
        this.setState({
            checked: !this.state.checked
        })
    }

    handleWeightChange(evt) { // TODO: handle invalid input
        this.props.setItem(this.props.index, {
            name: this.props.item.name,
            weight: evt.target.value,
        });
    }


    render() {

        const weight = this.state.checked
            ? <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Weight: </span>
                </div>
                <input type="text" className="form-control" onChange={evt => this.handleWeightChange(evt)}   />
                <div className="input-group-append">
                    <span className="input-group-text">%</span>
                </div>
              </div>
            : null;

        return (
            <div>
                <input type="checkbox"
                       checked={ this.state.checked }
                       onChange={ this.handleCheckedChange }/>
                <span>{this.props.item.name}</span>

                {weight}
            </div>
        );
    }
}
