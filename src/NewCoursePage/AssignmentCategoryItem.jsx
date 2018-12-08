import React, { Component } from 'react';

import './AssignmentCategoryItem.css';

export class AssignmentCategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.item.weight !== 0,
            valid: !isNaN(props.item.weight) && props.item.weight > 0 && props.item.weight < 100,
            firstTime: this.props.firstTime,
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

    handleWeightChange(evt) {

        console.log(Number(evt.target.value));

        this.props.setItem(this.props.index, {
            name: this.props.item.name,
            weight: isNaN(evt.target.value) ? 0 : Number(evt.target.value),
        });


        if (this.state.firstTime) {
            this.setState({firstTime: false,});
        }
        if (evt.target.value === '' || isNaN(evt.target.value) || evt.target.value > 100) {
            console.log("no");
            this.setState({valid: false});
            return;
        }
        if (!this.valid) {
            this.setState({valid: true});
        }
        console.log("yes");

    }


    render() {
        const errorStyle = !this.state.firstTime && !this.state.valid ? " error-style" : "";
        const weight = this.state.checked
            ? <span className="input-group mb-3 weight-input">
                <div className="input-group-prepend">
                    <span className="input-group-text">Weight: </span>
                </div>
                <input type="text"
                       className={"form-control"+ errorStyle}
                       value={this.props.item.weight}
                       onChange={evt => this.handleWeightChange(evt)}   />
                <div className="input-group-append">
                    <span className="input-group-text">%</span>
                </div>
              </span>
            : null;

        return (
            <div className="weight">
                <span className="weight-name">
                    <input type="checkbox"
                           className="category-checkbox"
                           checked={ this.state.checked }
                           onChange={ this.handleCheckedChange }/>
                    <span>{this.props.item.name}</span>
                </span>

                {weight}
            </div>
        );
    }
}
