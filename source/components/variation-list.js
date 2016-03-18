import React, { PropTypes } from "react";

import moment from "moment";
import numeral from "numeral";

import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";

const VariationList = React.createClass({
    propTypes: {
        variations: PropTypes.array.isRequired,
        multiplier: PropTypes.number.isRequired,
        onEditVariation: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: React.PropTypes.object.isRequired,
        currency: React.PropTypes.string.isRequired
    },

    renderAmount(variation) {
        let amount;

        if (variation.frequency === 0) {
            amount = variation.amount;
        } else {
            amount = variation.amount / variation.frequency * this.props.multiplier;
        }
        return (numeral(amount).format("0,0[.]00 $"));
    },

    renderFrequency(variation) {
        if (variation.frequency === 0) {
            return (moment(variation.createdAt).format("dddd D"));
        }
        return (numeral(variation.amount).format("0,0[.]00 $") + " " + this.context.translation[`variation.list.frequency.${variation.frequency}`]);
    },

    render() {
        return (
            <List>
                {
                    this.props.variations.map((variation, index) =>
                        <ListItem
                            primaryText={
                                <div className="row between-xs">
                                    <span className="flex-xs">
                                        {variation.label}
                                    </span>
                                    <span className="flex-xs">
                                        {this.renderAmount(variation)}
                                    </span>
                                </div>
                            }
                            secondaryText={this.renderFrequency(variation)}
                            onTouchTap={() => this.props.onEditVariation(index) }
                            key={index}
                        />
                    )
                }
            </List>
        );
    }
});

export default VariationList;
