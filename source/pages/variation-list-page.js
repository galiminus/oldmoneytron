import React, { PropTypes } from "react";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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

    goToNewVariationForm(e) {
        e.preventDefault();

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
                    inkBarStyle={{ backgroundColor: "rgb(230, 40, 40)" }}
                    tabItemContainerStyle={{ backgroundColor: "#4A6A8A" }}
                    style={{ position: "fixed", width: "100%", zIndex: 1 }}
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
                    style={{ marginTop: 24, paddingBottom: 24 }}
                >
                    {
                        ranges.map((range) => {
                            return (
                                <div key={range} style={{ padding: 24, minHeight: "100%" }}>
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
            </div>
        );
    }
});

export default VariationListPage;
