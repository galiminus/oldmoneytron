import React, { PropTypes } from "react";

import FloatingActionButton from "material-ui/lib/floating-action-button";
import ContentAdd from "material-ui/lib/svg-icons/content/add";
import Divider from "material-ui/lib/divider";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";

import SwipeableViews from "react-swipeable-views";

import VariationList from "components/variation-list";
import VariationSummary from "components/variation-summary";

const VariationListPage = React.createClass({
    propTypes: {
        variations: PropTypes.array.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            variations: []
        };
    },

    getInitialState() {
        return {
            slideIndex: 0
        };
    },

    goToNewVariationForm() {
        this.context.history.push("/new");
    },

    goToEditVariationForm(index) {
        this.context.history.push(`/edit/${index}`);
    },

    rangeToMultiplier(range) {
        switch (range) {
        case "day":
            return (1.0 / 31);
        case "month":
            return (1);
        case "year":
            return (12);
        default:
            return (1);
        }
    },

    handleChangeIndex(index) {
        this.setState({
            slideIndex: index
        });
    },

    render() {
        const ranges = ["day", "month", "year"];

        return (
            <div>
                <Tabs
                    onChange={this.handleChangeIndex}
                    value={this.state.slideIndex}
                >
                    {
                        ranges.map((range, index) => {
                            return (
                                <Tab key={range} value={index} label={this.context.translation[`variation.list.range.${range}`]} />
                            );
                        })
                    }
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChangeIndex}
                >
                    {
                        ranges.map((range) => {
                            return (
                                <div key={range} style={{ padding: 24 }}>
                                        <VariationSummary
                                            variations={this.props.variations}
                                            multiplier={this.rangeToMultiplier(range)}
                                        />
                                        <Divider inset />
                                        <VariationList
                                            multiplier={this.rangeToMultiplier(range)}
                                            variations={this.props.variations}
                                            onEditVariation={this.goToEditVariationForm}
                                        />
                                </div>
                            );
                        })
                    }
                </SwipeableViews>
                <div style={{ position: "absolute", right: 72 }}>
                    <FloatingActionButton
                        style={{ position: "fixed", bottom: 16 }}
                        onMouseUp={this.goToNewVariationForm}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
});

export default VariationListPage;
