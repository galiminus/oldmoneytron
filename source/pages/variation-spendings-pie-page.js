import React, { PropTypes } from "react";

import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarTitle from "material-ui/lib/toolbar/toolbar-title";
import IconButton from "material-ui/lib/icon-button";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import NavigationArrowBack from "material-ui/lib/svg-icons/navigation/arrow-back";

import SwipeableViews from "react-swipeable-views";

import { Pie } from "react-pathjs-chart";

const VariationSpendingsPiePage = React.createClass({
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
            slideIndex: 0,
            leftNavOpen: false
        };
    },

    getChartData() {
        return (
            this.props.variations.filter((variation) => {
                return (variation.type === "spending");
            }).map((variation) => {
                return ({ name: variation.label, population: Number(variation.amount) });
            })
        );
    },

    getChartOptions() {
        return ({
            margin: { top: 0, left: 0, right: 0, bottom: 0 },
            width: window.innerWidth,
            height: window.innerWidth,
            color: "#2980B9",
            r: 100,
            R: window.innerWidth / 2 - 80,
            legendPosition: "topLeft",
            animate: {
                type: "oneByOne",
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: "Roboto, sans-serif",
                fontSize: 12,
                fontWeight: true,
                color: "#ECF0F1"
            }
        });
    },

    goToNewVariationForm(e) {
        e.preventDefault();

        this.context.history.push("/new");
    },

    goToEditVariationForm(index) {
        this.context.history.push(`/edit/${index}`);
    },

    goToSettings(e) {
        e.preventDefault();

        this.context.history.push("/settings");
    },

    goToBuyRights(e) {
        e.preventDefault();

        this.context.history.push("/buyRights");
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

    goToVariationList(e) {
        e.preventDefault();

        this.context.history.push("/");
    },

    render() {
        const ranges = ["day", "month", "year"];

        return (
            <div>
                <Toolbar style={{ fontFamily: "Roboto, sans-serif", padding: "0 8px 0 8px", backgroundColor: "#4A6A8A", position: "fixed", zIndex: 1 }}>
                    <ToolbarGroup float="left">
                        <IconButton touch style={{ marginTop: 5 }} onTouchTap={this.goToVariationList}>
                            <NavigationArrowBack color="#eee" />
                        </IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup float="left">
                        <ToolbarTitle
                            text={this.context.translation["leftnav.spendingsPie"]}
                            style={{ marginTop: 2, color: "#eee" }}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <Tabs
                    onChange={this.handleChangeIndex}
                    value={this.state.slideIndex}
                    inkBarStyle={{ backgroundColor: "rgb(230, 40, 40)" }}
                    tabItemContainerStyle={{ backgroundColor: "#5A7A9A" }}
                    style={{ position: "fixed", width: "100%", zIndex: 1, marginTop: 56 }}
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
                    style={{ marginTop: 80 }}
                >
                    {
                        ranges.map((range) => {
                            return (
                                <div key={range} style={{ minHeight: "100%" }}>
                                    <Pie
                                        data={this.getChartData()}
                                        options={this.getChartOptions()}
                                        accessorKey="population"
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

export default VariationSpendingsPiePage;
