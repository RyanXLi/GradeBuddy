import React from 'react';
import PropTypes from 'prop-types';
import regression from 'regression';
import { Scatterplot } from './Scatterplot';

export class AnalyticsPage extends React.Component {
    static propTypes = {
        courses: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        courses: []
    };

    aggregateData() {
        
    }

    render() {
        const data = [[5, 5], [10, 10], [8, 7], [10, 11]];
        const regressionResult = regression.linear(data);
        console.log(regressionResult.predict(5));
        return <Scatterplot data={data} regressionResult={regressionResult} />;
    }
}
