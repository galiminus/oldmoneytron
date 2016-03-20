import React, { PropTypes } from "react";

import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarTitle from "material-ui/lib/toolbar/toolbar-title";
import IconButton from "material-ui/lib/icon-button";
import NavigationMenu from "material-ui/lib/svg-icons/navigation/menu";

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

    toggleLeftNav() {
        this.setState({ leftNavOpen: !this.state.leftNavOpen });
    },

    render() {
        return (
            <div>

            </div>
        );
    }
});

export default VariationListPage;
