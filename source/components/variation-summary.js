import React, { PropTypes } from "react";
import numeral from "numeral";

import moment from "moment";

const VariationSummary = React.createClass({
    propTypes: {
        variations: PropTypes.array.isRequired,
        multiplier: PropTypes.number.isRequired,
        range: PropTypes.string.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
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

    getInterval() {
        let start;
        let end;

        switch (this.props.range) {
            case "day":
                start = moment().startOf("month").format(this.context.translation.t("variation.summary.range.day.startFormat"));
                end = moment().endOf("month").format(this.context.translation.t("variation.summary.range.day.endFormat"));
                return (this.context.translation.t("variation.summary.range.day", { start, end }));
            case "month":
                start = moment().startOf("year").format(this.context.translation.t("variation.summary.range.month.startFormat"));
                end = moment().endOf("year").format(this.context.translation.t("variation.summary.range.month.endFormat"));
                return (this.context.translation.t("variation.summary.range.month", { start, end }));
            default:
                return (this.context.translation.t("variation.summary.range.year"));
        }
        return (`par jour du ${start} au ${end}`);

    },

    render() {
        return (
            <div style={{ fontFamily: "Roboto, sans-serif", textAlign: "right" }}>
                <p style={{ fontSize: "2em", margin: "8px 0 4px 0" }}>
                    {numeral(this.variationsSum()).format("0,0[.]00 $")}
                </p>
                <p style={{ fontSize: "0.8em", margin: "4px 0 8px 0", color: "#999" }}>
                    {this.getInterval()}
                </p>
            </div>
        );
    }
});

export default VariationSummary;
