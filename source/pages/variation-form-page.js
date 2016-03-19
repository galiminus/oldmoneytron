import React, { PropTypes } from "react";

import VariationForm from "components/variation-form";

const VariationFormPage = React.createClass({
    propTypes: {
        routeParams: PropTypes.object.isRequired,
        variations: PropTypes.array.isRequired
    },

    contextTypes: {
        history: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return { variations: [] };
    },

    getInitialState() {
        return { variation: {} };
    },

    componentWillMount() {
        if (this.props.routeParams.id) {
            this.setState({ variation: this.props.variations[Number(this.props.routeParams.id)] });
        }
    },

    handleSubmit(variation) {
        if (this.props.routeParams.id) {
            this.props.variations[this.props.routeParams.id] = variation;
        } else {
            this.props.variations.push(variation);
        }
        this.goToList();
    },

    handleDelete() {
        this.props.variations.splice(this.props.routeParams.id, 1);
        this.goToList();
    },

    goToList() {
        this.context.history.push("/");
    },

    render() {
        return (
            <div style={{ minHeight: "100%" }}>
                <VariationForm
                    onSubmit={this.handleSubmit}
                    onDelete={this.handleDelete}
                    exists={!!this.props.routeParams.id}
                    variation={this.state.variation}
                />
            </div>
        );
    }
});

export default VariationFormPage;
