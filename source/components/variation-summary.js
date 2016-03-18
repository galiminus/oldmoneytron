import React, { PropTypes } from "react";
import numeral from "numeral";

const VariationSummary = React.createClass({
    propTypes: {
        variations: PropTypes.array.isRequired,
        multiplier: PropTypes.number.isRequired
    },

    variationsSum() {
        return (this.props.variations.reduce((sum, variation) => {
            let cost;
            if (variation.frequency === 0) {
                cost = variation.amount * this.props.multiplier;
            } else {
                cost = (variation.amount / variation.frequency) * this.props.multiplier;
            }

            if (variation.type === "spending") {
                return (sum - cost);
            }
            return (sum + cost);
        }, 0));
    },

    render() {
        return (
            <h1 style={{ fontFamily: "Roboto, sans-serif", textAlign: "right" }}>{numeral(this.variationsSum()).format("0,0[.]00 $")}</h1>
        );
    }
});

export default VariationSummary;
