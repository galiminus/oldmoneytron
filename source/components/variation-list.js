import React, { PropTypes } from "react";

import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";

import Amount from "components/amount";
import Frequency from "components/frequency";

const VariationList = React.createClass({
    propTypes: {
        variations: PropTypes.array.isRequired,
        multiplier: PropTypes.number.isRequired,
        onEditVariation: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    handleTouchTap(e, index) {
        e.preventDefault();

        this.props.onEditVariation(index);
    },

    render() {
        return (
            <List>
                {
                    this.props.variations.map((variation, index) =>
                        <ListItem
                            disableTouchRipple
                            primaryText={
                                <div className="row between-xs">
                                    <span className="flex-xs">
                                        {variation.label}
                                    </span>
                                    <span className="flex-xs">
                                        <Amount variation={variation} multiplier={this.props.multiplier} />
                                    </span>
                                </div>
                            }
                            secondaryText={<Frequency variation={variation} />}
                            onTouchTap={(e) => this.handleTouchTap(e, index)}
                            key={index}
                        />
                    )
                }
            </List>
        );
    }
});

export default VariationList;
