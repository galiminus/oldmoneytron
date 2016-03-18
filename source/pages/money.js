import React, { PropTypes } from "react";

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

    render() {
        return (
            <div style={{ minHeight: "100%", width: "100%", margin: 0 }} className="row center-xs">
                <div
                    className="col-md-12 col-xs-12 start-xs"
                    style={{ minHeight: "100%", padding: "0 0 24px 0", position: "relative" }}
                >
                    { React.cloneElement(this.props.children, { variations: this.state.variations }) }
                </div>
            </div>
        );
    }
});

export default MoneyPage;
