import React, { PropTypes } from "react";

import SelectField from "material-ui/lib/select-field";
import MenuItem from "material-ui/lib/menus/menu-item";
import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarTitle from "material-ui/lib/toolbar/toolbar-title";
import IconButton from "material-ui/lib/icon-button";
import ActionDone from "material-ui/lib/svg-icons/action/done";
import NavigationArrowBack from "material-ui/lib/svg-icons/navigation/arrow-back";

const SettingsPage = React.createClass({
    propTypes: {
        settings: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return ({
            settings: {}
        });
    },

    componentWillMount() {
        this.setState(this.props.settings);
    },

    handleSubmit(e) {
        e.preventDefault();

        this.props.settings.language = this.state.language;
        this.context.history.push("/");
    },

    handleLanguageChange(_e, _index, value) {
        this.setState({ language: value });
    },

    goToVariationList(e) {
        e.preventDefault();

        this.context.history.push("/");
    },

    render() {
        const form = (
            <form>
                <div>
                    <SelectField
                        fullWidth
                        value={this.state.language}
                        onChange={this.handleLanguageChange}
                        floatingLabelText={this.context.translation["settings.form.language"]}
                    >
                        {
                            ["en", "fr"].map((language) => {
                                return (
                                    <MenuItem key={language} value={language} primaryText={this.context.translation[`settings.form.language.${language}`]} />
                                );
                            })
                        }
                    </SelectField>
                </div>
            </form>
        );

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
                            text={this.context.translation["settings.form.title"]}
                            style={{ marginTop: 2, color: "#eee" }}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <IconButton touch style={{ marginTop: 5 }} onTouchTap={this.handleSubmit}>
                            <ActionDone color="#eee" />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <div style={{ padding: 22 }}>
                    {form}
                </div>
            </div>
        );
    }
});

export default SettingsPage;
