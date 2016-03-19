import React, { PropTypes } from "react";

import moment from "moment";
import numeral from "numeral";

const Frequency = React.createClass({
    propTypes: {
        variation: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: React.PropTypes.object.isRequired
    },

    render() {
        let frequency;
        if (this.props.variation.frequency === 0) {
            frequency = moment(this.props.variation.createdAt).format("dddd D");
        } else {
            frequency = numeral(this.props.variation.amount).format("0,0[.]00 $") + " " + this.context.translation[`variation.list.frequency.${this.props.variation.frequency}`]
        }

        return (
            <span style={{ fontSize: "0.8em", color: "#999" }}>{frequency}</span>
        );
    }
});

export default Frequency;