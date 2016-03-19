import React, { PropTypes } from "react";

import numeral from "numeral";

const Amount = React.createClass({
    propTypes: {
        variation: PropTypes.object.isRequired,
        multiplier: PropTypes.number.isRequired
    },

    render() {
        let amount;

        if (this.props.variation.frequency === 0) {
            amount = this.props.variation.amount;
        } else {
            amount = this.props.variation.amount / this.props.variation.frequency * this.props.multiplier;
        }

        if (this.props.variation.type === "spending") {
            amount = -amount;
        }

        return (<span>{numeral(amount).format("0,0[.]00 $")}</span>);
    }
});

export default Amount;
