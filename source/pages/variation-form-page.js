import React, { PropTypes } from "react";

import VariationForm from "components/variation-form";

function getVariationIndex(variations, createdAt) {
    for (const index in variations) {
        if (Number(variations[index].createdAt) === Number(createdAt)) {
            return (index);
        }
    }
    return (-1);
}

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
        const index = getVariationIndex(this.props.variations, this.props.routeParams.id);
        this.setState({ index });

        if (this.props.routeParams.id) {
            this.setState({ variation: this.props.variations[index] });
        }
    },

    getLabelAutoComplete() {
        return (
            this.props.variations.filter((variation) => {
                return (variation.frequency === 0);
            }).map((variation) => {
                return (variation.label);
            })
        );
    },

    handleSubmit(variation) {
        if (this.props.routeParams.id) {
            this.props.variations[this.state.index] = variation;
        } else {
            this.props.variations.push(variation);
        }
        this.goToList();
    },

    handleDelete() {
        this.props.variations.splice(this.state.index, 1);
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
                    labelAutoComplete={this.getLabelAutoComplete()}
                />
            </div>
        );
    }
});

export default VariationFormPage;
