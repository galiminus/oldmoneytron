import React, { PropTypes } from "react";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import FloatingActionButton from "material-ui/lib/floating-action-button";
import ContentAdd from "material-ui/lib/svg-icons/content/add";

import _style from "application.css";

const MoneyPage = React.createClass({
    propTypes: {
        children: PropTypes.object.isRequired
    },

    contextTypes: {
        history: PropTypes.object.isRequired
    },

    getInitialState() {
        return { variations: [] };
    },

    componentWillMount() {
        this.setState({ variations: JSON.parse((localStorage.getItem("variations") || "[]")) });
    },

    componentDidUpdate() {
        localStorage.setItem("variations", JSON.stringify(this.state.variations));
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
                    { React.cloneElement(this.props.children, { variations: this.state.variations, key: this.props.location.pathname }) }
                </ReactCSSTransitionGroup>

                {actionButton}

            </div>
        );
    }
});

export default MoneyPage;
