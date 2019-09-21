import React, { PropTypes } from "react";

import moment from "moment";
import numeral from "numeral";

const Frequency = React.createClass({
    propTypes: {
        variation: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    render() {
        let frequency;
        if (this.props.variation.frequency === 0) {
            frequency = moment(this.props.variation.createdAt).format("dddd D");
        } else {
            frequency =  this.context.translation.t(`variation.list.frequency.${this.props.variation.frequency}`, { amount: numeral(this.props.variation.amount).format("0,0[.]00 $") });
        }

        return (
            <span style={{ fontSize: "0.8em", color: "#999" }}>{frequency}</span>
        );
    }
});

export default Frequency;
