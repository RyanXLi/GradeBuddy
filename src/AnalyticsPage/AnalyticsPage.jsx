import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import memoizeOne from 'memoize-one';
import regression from 'regression';
import { Scatterplot } from './Scatterplot';
import { AGGREGATORS } from './HabitAggregators';
import { CollapseWithHeading } from '../CollapseWithHeader';

import './AnalyticsPage.css';

function numberToBool(number) {
    return number !== 0;
}

export class AnalyticsPage extends React.Component {
    static propTypes = {
        selectedCourse: PropTypes.object.isRequired,
        courses: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        courses: []
    };

    constructor(props) {
        super(props);
        this.state = {
            isAggregatingAll: false,
            selectedAggregator: AGGREGATORS[0].aggregationName
        };
        this.setIsAggregatingAll = this.setIsAggregatingAll.bind(this);
        this.handleXAxisChange = this.handleXAxisChange.bind(this);
        this.getTooltipContentsForPoint = this.getTooltipContentsForPoint.bind(this);
        this.aggregateData = memoizeOne(this.aggregateData);
    }

    setIsAggregatingAll(newValue) {
        this.setState({isAggregatingAll: newValue});
    }

    handleXAxisChange(event) {
        this.setState({selectedAggregator: event.target.value});
    }

    aggregateData(courses) {
        const datas = AGGREGATORS.map(aggregator => {
            const resultsPerClass = courses.map(aggregator.aggregateHabits);
            const data = _.flatMap(resultsPerClass, classResult => classResult.data);
            const dataOrigins = _.flatMap(resultsPerClass, classResult => classResult.dataOrigins);
            return {
                aggregationName: aggregator.aggregationName,
                dataType: aggregator.dataType,
                data,
                dataOrigins,
                regressionResult: regression.linear(data)
            };
        });
        datas.sort((a, b) => b.regressionResult.r2 - a.regressionResult.r2); // Sort by biggest r2 to smallest
        return datas;
    }

    renderXAxisSelect(aggregationResults) {
        const options = aggregationResults.map(aggregate => {
            const {aggregationName, regressionResult} = aggregate;
            const r2Explanation = isFinite(regressionResult.r2) ?
                `(Correlation strength = ${regressionResult.r2})` : '';
            return <option key={aggregationName} value={aggregationName}>{aggregationName} {r2Explanation}</option>;
        });
        return <div className='AnalyticsPage-habit-selector'>
            <label>Habit to analyze: </label>
            <select value={this.state.selectedAggregator} onChange={this.handleXAxisChange}>{options}</select>
        </div>;
    }

    renderAdvancedStatistics(regressionResult) {
        if (!regressionResult) {
            return null;
        }
        const {string, equation, points, r2} = regressionResult;
        return <CollapseWithHeading headingText='Advanced statistics' initialIsOpen={false}>
            <div className="advancedLine">Assignments in data pool: <b>{points.length}</b></div>
            <div className="advancedLine">Correlation between grades and {this.state.selectedAggregator} (0 - no correlation, 1 - perfect correlation): <b>{isFinite(r2) ? r2 : 'undefined'}</b></div>
            <div className="advancedLine">Line Equation: <b>{equation.every(isFinite) ? string : 'undefined'}</b></div>
        </CollapseWithHeading>;
    }

    renderDataSourceOptions() {
        return <div className='AnalyticsPage-data-source-options'>
            <h6>Use data from:</h6>
            <div>
                <label>
                    <input
                        type='radio'
                        checked={!this.state.isAggregatingAll}
                        onChange={() => this.setIsAggregatingAll(false)}
                    />
                    {this.props.selectedCourse.shortName}
                </label>
            </div>
            <div>
                <label>
                    <input
                        type='radio'
                        checked={this.state.isAggregatingAll}
                        onChange={() => this.setIsAggregatingAll(true)}
                    />
                    All classes (including inactive)
                </label>
            </div>
        </div>;
    }

    getTooltipContentsForPoint(index) {
        const origin = this.selectedData.dataOrigins[index];
        let x = this.selectedData.data[index][0];
        if (this.selectedData.dataType === 'boolean') {
            x = numberToBool(x);
        }
        const percent = this.selectedData.data[index][1].toFixed(1);
        return <table className='table-sm table-bordered' style={{margin: 0}}>
            <tbody>
                <tr><td>Class</td><td><b>{origin.course.shortName}</b></td></tr>
                <tr><td>Assignment</td><td><b>{origin.assignment.name}</b></td></tr>
                <tr>
                    <td>{this.selectedData.aggregationName}</td>
                    <td><b>{String(x)}</b></td>
                </tr>
                <tr>
                    <td>Grade</td>
                    <td><b>{percent}%</b> ({origin.assignment.pointsEarned}/{origin.assignment.pointsPossible})</td>
                </tr>
            </tbody>
        </table>;
    }

    render() {
        const {courses, selectedCourse} = this.props;
        const {isAggregatingAll, selectedAggregator} = this.state;
        const aggregationResults = this.aggregateData(isAggregatingAll ? courses : [selectedCourse]);
        const selectedData = aggregationResults.find(aggregate =>
            aggregate.aggregationName === selectedAggregator
        );
        this.selectedData = selectedData;
        const regressionResult = selectedData && selectedData.regressionResult.equation.every(isFinite) ?
            selectedData.regressionResult : undefined;

        return <div className='AnalyticsPage'>
            <div className='AnalyticsPage-plot-container'>
                {selectedData ?
                    <Scatterplot
                        data={selectedData.data}
                        regressionResult={regressionResult}
                        xLabel={selectedAggregator}
                        getPointTooltipContents={this.getTooltipContentsForPoint}
                    />
                    :
                    <Scatterplot /> // Empty scatterplot if no selected data
                }
                {this.renderXAxisSelect(aggregationResults)}
            </div>
            <div className='AnalyticsPage-options-container'>
                {this.renderDataSourceOptions()}
                {this.renderAdvancedStatistics(regressionResult)}
            </div>
        </div>;
    }
}
