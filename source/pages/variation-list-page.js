import React, { PropTypes } from "react";

import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarTitle from "material-ui/lib/toolbar/toolbar-title";
import IconButton from "material-ui/lib/icon-button";
import NavigationMenu from "material-ui/lib/svg-icons/navigation/menu";
import ActionSettings from "material-ui/lib/svg-icons/action/settings";
import ActionCopyright from "material-ui/lib/svg-icons/action/copyright";
import EditorPieChart from "material-ui/lib/svg-icons/editor/attach-money";

import Divider from "material-ui/lib/divider";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import LeftNav from "material-ui/lib/left-nav";
import MenuItem from "material-ui/lib/menus/menu-item";

import moment from "moment";

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
            slideIndex: 0,
            leftNavOpen: false
        };
    },

    getVariations(range) {
        return (
            this.props.variations.filter((variation) => {
                return (
                    variation.frequency > 0 || (
                        moment(variation.createdAt).isAfter(moment().subtract(1, range))
                    )
                );
            })
        );
    },

    goToNewVariationForm(e) {
        e.preventDefault();

        this.context.history.push("/new");
    },

    goToEditVariationForm(variation) {
        this.context.history.push(`/edit/${variation.createdAt}`);
    },

    goToSettings(e) {
        e.preventDefault();

        this.context.history.push("/settings");
    },

    goToBuyRights(e) {
        e.preventDefault();

        this.context.history.push("/buyRights");
    },

    goToVariationSpendingsPie(e) {
        e.preventDefault();

        this.context.history.push("/spendingsPie");
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

    toggleLeftNav() {
        this.setState({ leftNavOpen: !this.state.leftNavOpen });
    },

    render() {
        const ranges = ["day", "month", "year"];

        const leftNavItemStyle = { paddingLeft: 50 };

        return (
            <div>
                <LeftNav open={this.state.leftNavOpen} docked={false} onRequestChange={this.toggleLeftNav}>
                    <MenuItem
                        innerDivStyle={leftNavItemStyle}
                        leftIcon={<ActionSettings />}
                        onTouchTap={this.goToSettings}
                    >
                        {this.context.translation["leftnav.settings"]}
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        innerDivStyle={leftNavItemStyle}
                        leftIcon={<EditorPieChart />}
                        onTouchTap={this.goToVariationSpendingsPie}
                    >
                        {this.context.translation["leftnav.spendingsPie"]}
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        innerDivStyle={leftNavItemStyle}
                        leftIcon={<ActionCopyright />}
                        onTouchTap={this.goToBuyRights}
                    >
                        {this.context.translation["leftnav.buyRights"]}
                    </MenuItem>
                </LeftNav>
                <Toolbar style={{ fontFamily: "Roboto, sans-serif", padding: "0", backgroundColor: "#4A6A8A", position: "fixed", zIndex: 1 }}>
                    <ToolbarGroup float="left">
                        <IconButton touch style={{ marginTop: 5 }} onTouchTap={this.toggleLeftNav}>
                            <NavigationMenu color="#eee" />
                        </IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup float="left">
                        <ToolbarTitle
                            text={"Moneytron"}
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
                    style={{ marginTop: 80, paddingBottom: 24 }}
                >
                    {
                        ranges.map((range) => {
                            return (
                                <div key={range} style={{ padding: 24, minHeight: "100%" }}>
                                        <VariationSummary
                                            variations={this.getVariations(range)}
                                            multiplier={this.rangeToMultiplier(range)}
                                        />
                                        <Divider inset />
                                        <VariationList
                                            variations={this.getVariations(range)}
                                            multiplier={this.rangeToMultiplier(range)}
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
