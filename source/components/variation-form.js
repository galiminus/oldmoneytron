import React, { PropTypes } from "react";

import TextField from "material-ui/lib/text-field";
import FlatButton from "material-ui/lib/flat-button";
import SelectField from "material-ui/lib/select-field";
import MenuItem from "material-ui/lib/menus/menu-item";

const VariationForm = React.createClass({
    propTypes: {
        onSubmit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        deletable: PropTypes.bool,
        variation: PropTypes.object
    },

    contextTypes: {
        translation: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            label: "",
            amount: null,
            type: "spending",
            frequency: 0,
            createdAt: Date.now()
        };
    },

    componentWillMount() {
        if (this.props.variation) {
            this.setState(this.props.variation);
        }
    },

    componentWillReceiveProps(props) {
        if (props.variation) {
            this.setState(props.variation);
        }
    },

    handleSubmit() {
        this.props.onSubmit(this.state);
    },

    handleDelete() {
        this.props.onDelete();
    },

    handleTypeChange(_e, _index, value) {
        this.setState({ type: value });
    },

    handleLabelChange(e) {
        this.setState({ label: e.target.value });
    },

    handleAmountChange(e) {
        this.setState({ amount: e.target.value });
    },

    handleSetSpending() {
        this.setState({ type: "spending" });
    },

    handleSetIncome() {
        this.setState({ type: "income" });
    },

    handleFrequencyChange(_e, _index, value) {
        this.setState({ frequency: value });
    },

    isFormValid() {
        return (this.state.label.length > 0 && (this.state.amount || "").length > 0);
    },

    render() {
        const form = (
            <form>
                <div>
                    <SelectField fullWidth value={this.state.type} onChange={this.handleTypeChange}>
                        <MenuItem value="spending" primaryText={this.context.translation["variation.form.tab.spending"]} />
                        <MenuItem value="income" primaryText={this.context.translation["variation.form.tab.income"]} />
                    </SelectField>
                </div>
                <div>
                    <TextField
                        fullWidth
                        floatingLabelText={this.context.translation[`variation.form.label`]}
                        value={this.state.label}
                        onChange={this.handleLabelChange}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        type="number"
                        step="0.01"
                        floatingLabelText={this.context.translation[`variation.form.amount`]}
                        value={this.state.amount}
                        onChange={this.handleAmountChange}
                    />
                </div>

                <div style={{ paddingTop: 16 }}>
                    <SelectField fullWidth value={this.state.frequency} onChange={this.handleFrequencyChange}>
                        {
                            [0, 1, 3, 6, 12, 24].map((frequency) => {
                                return (<MenuItem key={frequency} value={frequency} primaryText={this.context.translation[`variation.form.frequency.${frequency}`]} />);
                            })
                        }
                    </SelectField>
                </div>
            </form>
        );

        const deleteAction = (
            <FlatButton
                label={this.context.translation[`variation.form.delete`]}
                primary
                onTouchTap={this.handleDelete}
            />
        );

        const submitAction = (
            <FlatButton
                key="submit"
                label={this.context.translation[`variation.form.submit`]}
                disabled={!this.isFormValid()}
                onTouchTap={this.handleSubmit}
            />
        );

        const actions = (
            <div className="row between-xs">
                <div>
                    {(() => this.props.deletable ? deleteAction : null)()}
                </div>
                <div>
                    {submitAction}
                </div>
            </div>
        );

        return (
            <div style={{ padding: 16 }}>
                <div style={{ padding: 6 }}>
                    {form}
                </div>
                {actions}
            </div>
        );
    }
});

export default VariationForm;
