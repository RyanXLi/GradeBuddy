import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import memoizeOne from 'memoize-one';
import { select, scaleLinear, axisBottom, axisLeft } from 'd3';
import { TranslatableG } from './TranslatableG';

import './Scatterplot.css';
import { DivWithBullseye } from './DivWithBullseye';
import {getRelativeCoordinates} from '../util';

const PADDING_BOT_LEFT = 0; // Padding on the left and bottom side
const PADDING_TOP_RIGHT = 0;

export class Scatterplot extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)), // n x 2 matrix of numbers
        regressionResult: PropTypes.object,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        xLabel: PropTypes.string,
        yLabel: PropTypes.string,
        getPointTooltip: PropTypes.func
    };

    static defaultProps = {
        data: [],
        width: 600,
        height: 375,
        xLabel: 'X',
        yLabel: 'Y'
    };

    constructor(props) {
        super(props);
        this.xAxisG = null;
        this.yAxisG = null;
        this.getScales = memoizeOne(this.getScales);
        this.state = {
            regressionTooltipLocation: null,
            pointTooltip: null,
        };

        this.handleRegressionHover = this.handleRegressionHover.bind(this);
        this.hideTooltips = this.hideTooltips.bind(this);
    }

    /**
     * 
     * @param {React.MouseEvent} event 
     */
    handleRegressionHover(event) {
        this.setState({
            regressionTooltipLocation: {
                ...getRelativeCoordinates(event),
                pageX: event.pageX,
                pageY: event.pageY
            }
        });
    }

    hideTooltips() {
        this.setState({
            regressionTooltipLocation: null,
            pointTooltip: null
        });
    }

    getScales(props) {
        const {data, width, height} = props;
        const [xs, ys] = _.unzip(data);
        const xScale = scaleLinear()
            .domain( [_.min(xs), _.max(xs)] )
            .range( [PADDING_BOT_LEFT, width - PADDING_TOP_RIGHT] );
        const yScale = scaleLinear()
            .domain( [_.max(ys), _.min(ys)] )
            .range( [PADDING_TOP_RIGHT, height - PADDING_BOT_LEFT] );
        return {xScale, yScale};
    }

    drawAxes() {
        const {xScale, yScale} = this.getScales(this.props);
        select(this.xAxisG).call(axisBottom(xScale));
        select(this.yAxisG).call(axisLeft(yScale));
    }

    componentDidMount() {
        this.drawAxes();
    }

    componentDidUpdate() {
        this.drawAxes();
    }

    renderPoints() {
        const {xScale, yScale} = this.getScales(this.props);
        
        return this.props.data.map((point, i) => <circle
            key={i}
            cx={xScale(point[0])}
            cy={yScale(point[1])}
            r={4}
            fill='cadetblue'
            fillOpacity={0.75}
        />);
    }

    renderRegressionResult() {
        const regressionResult = this.props.regressionResult;
        if (!regressionResult) {
            return null;
        }

        const isShowingTooltip = this.state.regressionTooltipLocation != null;

        const {xScale, yScale} = this.getScales(this.props);
        const [xValue1, xValue2] = xScale.domain();
        const yValue1 = regressionResult.predict(xValue1)[1];
        const yValue2 = regressionResult.predict(xValue2)[1];

        const [x1, x2] = xScale.range();
        const y1 = yScale(yValue1);
        const y2 = yScale(yValue2);
        const lineCoordinates = {x1, y1, x2, y2};

        return <React.Fragment>
            <line
                {...lineCoordinates}
                stroke={isShowingTooltip ? 'red' : 'pink'}
                strokeWidth={isShowingTooltip ? 3 : 2}
            />
            <line
                {...lineCoordinates}
                stroke='white'
                strokeWidth={10}
                strokeOpacity={0}
                onMouseMove={this.handleRegressionHover}
                onMouseOut={this.hideTooltips}
            />
        </React.Fragment>;
    }

    renderRegressionTooltip() {
        const {xLabel, yLabel, regressionResult} = this.props;
        const location = this.state.regressionTooltipLocation;
        if (!location || !regressionResult) {
            return null;
        }

        const xValue = this.getScales(this.props).xScale.invert(location.x);
        const yPrediction = regressionResult.predict(xValue)[1];
        return <Tooltip x={location.pageX} y={location.pageY} >
            <p>Prediction for {xLabel}={xValue.toFixed(2)}:</p>
            <div>{yLabel}={yPrediction.toFixed(2)}</div>
        </Tooltip>;
    }

    render() {
        const {width, height, xLabel, yLabel} = this.props;
        return <div className='Scatterplot'>
            <div>
                <span className='Scatterplot-y-label'>{yLabel}</span>
                <DivWithBullseye style={{display: 'inline-block'}}>
                    <svg className='Scatterplot-svg' width={width} height={height}>
                        <TranslatableG y={height - PADDING_BOT_LEFT} innerRef={node => this.xAxisG = node} />
                        <TranslatableG x={PADDING_BOT_LEFT} innerRef={node => this.yAxisG = node} />
                        {this.renderRegressionResult()}
                        {this.renderPoints()}
                    </svg>
                </DivWithBullseye>
                {this.renderRegressionTooltip()}
            </div>
            <span className='Scatterplot-x-label'>{xLabel}</span>
        </div>
    }
}

function Tooltip(props) {
    const {x, y, children} = props;
    const style = {
        position: 'fixed',
        left: x + 10,
        top: y + 10,
        zIndex: 1
    };
    return <div className='Scatterplot-tooltip' style={style}>{children}</div>;
}
