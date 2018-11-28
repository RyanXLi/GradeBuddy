import React from 'react';
import PropTypes from 'prop-types';

/**
 * Ever wish <g> elements accepted `x` and `y` attributes?  This one does!
 * 
 * @param {object} props - props as specified by React
 * @return {JSX.Element} - <g> element
 * @author Silas Hsu
 */
export function TranslatableG(props) {
    const {x, y, innerRef, ...remainingProps} = props;
    const transform = x || y ? `translate(${x || 0} ${y || 0})` : undefined;
    return <g ref={innerRef} transform={transform} {...remainingProps} />;
}

TranslatableG.propTypes = {
    x: PropTypes.number, // x translation to apply to children
    y: PropTypes.number, // y translation to apply to children
    innerRef: PropTypes.func // ref to the <g> element
};
