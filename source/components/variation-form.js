import React, { PropTypes } from "react";

import TextField from "material-ui/lib/text-field";
import AutoComplete from "material-ui/lib/auto-complete";
import SelectField from "material-ui/lib/select-field";
import MenuItem from "material-ui/lib/menus/menu-item";
import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarTitle from "material-ui/lib/toolbar/toolbar-title";
import IconButton from "material-ui/lib/icon-button";
import ActionDone from "material-ui/lib/svg-icons/action/done";
import ActionDelete from "material-ui/lib/svg-icons/action/delete";
import NavigationArrowBack from "material-ui/lib/svg-icons/navigation/arrow-back";

const VariationForm = React.createClass({
    propTypes: {
        onSubmit: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        exists: PropTypes.bool,
        variation: PropTypes.object,
        labelAutoComplete: PropTypes.array
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return ({
            variation: {},
            labelAutoComplete: []
        });
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


    goToVariationList(e) {
        e.preventDefault();

        this.context.history.push("/");
    },

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSubmit(this.state);
    },

    handleDelete(e) {
        e.preventDefault();

        this.props.onDelete();
    },

    handleTypeChange(_e, _index, value) {
        this.setState({ type: value });
    },

    handleLabelChange(value) {
        this.setState({ label: value });
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

    filterLabelAutoCompete(searchText, key) {
        return (!!key.match(new RegExp(searchText, "gi")));
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
                    <AutoComplete
                        fullWidth
                        floatingLabelText={this.context.translation[`variation.form.label`]}
                        searchText={this.state.label}
                        onUpdateInput={this.handleLabelChange}
                        onNewRequest={this.handleLabelChange}
                        dataSource={this.props.labelAutoComplete}
                        filter={AutoComplete.fuzzyFilter}
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

        let actionDelete;
        if (this.props.exists) {
            actionDelete = (
                <ToolbarGroup float="right">
                    <IconButton touch style={{ marginTop: 5 }} onTouchTap={this.handleDelete}>
                        <ActionDelete color="#eee" />
                    </IconButton>
                </ToolbarGroup>
            );
        } else {
            actionDelete = <span />;
        }

        return (
            <div>
                <Toolbar style={{ fontFamily: "Roboto, sans-serif", padding: "0 8px 0 8px", backgroundColor: "#4A6A8A" }}>
                    <ToolbarGroup float="left">
                        <IconButton touch style={{ marginTop: 5 }} onTouchTap={this.goToVariationList}>
                            <NavigationArrowBack color="#eee" />
                        </IconButton>
                    </ToolbarGroup>
                    <ToolbarGroup float="left">
                        <ToolbarTitle
                            text={this.props.variation.label || this.context.translation["variation.form.new"]}
                            style={{ marginTop: 2, color: "#eee" }}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <IconButton touch style={{ marginTop: 5 }} onTouchTap={this.handleSubmit} disabled={!this.isFormValid()}>
                            <ActionDone color="#eee" />
                        </IconButton>
                    </ToolbarGroup>
                    {actionDelete}
                </Toolbar>
                <div style={{ padding: 22 }}>
                    {form}
                </div>
            </div>
        );
    }
});

export default VariationForm;
