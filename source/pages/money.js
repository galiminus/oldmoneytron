import React, { PropTypes } from "react";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import FloatingActionButton from "material-ui/lib/floating-action-button";
import ContentAdd from "material-ui/lib/svg-icons/content/add";

import _style from "application.css";

import Translations from "translations";

import numeral from "numeral";
import fr from "numeral/languages/fr";

numeral.language("fr", fr);
numeral.language("fr");

import moment from "moment";

moment.locale("fr");

const MoneyPage = React.createClass({
    propTypes: {
        children: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    },

    contextTypes: {
        history: PropTypes.object.isRequired
    },

    childContextTypes: {
        translation: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired
    },

    getInitialState() {
        return { variations: [] };
    },

    getChildContext() {
        return {
            translation: Translations[this.state.settings.language],
            currency: this.state.settings.currency
        };
    },

    componentWillMount() {
        this.setState({ variations: JSON.parse((localStorage.getItem("variations") || "[]")) });

        const settings = JSON.parse((localStorage.getItem("settings") || "{}"));
        this.setState({ settings: { currency: "EUR", language: "en", ...settings } });
    },

    componentDidUpdate() {
        localStorage.setItem("variations", JSON.stringify(this.state.variations));
        localStorage.setItem("settings", JSON.stringify(this.state.settings));
    },

    goToNewVariationForm(e) {
        e.preventDefault();

        this.context.history.push("/new");
    },

    render() {
        let actionButton;

        if (this.props.location.pathname === "/") {
            actionButton = (
                <FloatingActionButton
                    key={"actionButton"}
                    style={{ position: "absolute", right: 16, bottom: 16 }}
                    onMouseUp={this.goToNewVariationForm}
                >
                    <ContentAdd />
                </FloatingActionButton>
            );
        } else {
            actionButton = <span />;
        }
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    { React.cloneElement(this.props.children, {
                        variations: this.state.variations,
                        settings: this.state.settings,
                        key: this.props.location.pathname
                    }) }
                </ReactCSSTransitionGroup>

                {actionButton}

            </div>
        );
    }
});

export default MoneyPage;
