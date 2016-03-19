import React, { PropTypes } from "react";

import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarTitle from "material-ui/lib/toolbar/toolbar-title";
import List from "material-ui/lib/lists/list";
import ListItem from "material-ui/lib/lists/list-item";
import RaisedButton from "material-ui/lib/raised-button";
import IconButton from "material-ui/lib/icon-button";
import NavigationArrowBack from "material-ui/lib/svg-icons/navigation/arrow-back";

const BuyRightsPage = React.createClass({
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

    goToVariationList(e) {
        e.preventDefault();

        this.context.history.push("/");
    },

    render() {
        let text;

        switch (this.props.settings.language) {
        case "fr":
            text = (
                <div>
                    <p>
                        Les droits exclusifs et le code source de cette application
                        sont à vendre pour 15.000 EUR ou 17.000 USD.
                    </p>
                    <p>
                        Les technologies utilisées sont :
                    </p>
                    <List>
                        <ListItem>
                            React.js
                        </ListItem>
                        <ListItem>
                            Material-ui
                        </ListItem>
                        <ListItem>
                            Cordova
                        </ListItem>
                    </List>
                    <p>
                        Contactez l'auteur de l'application par email pour en obtenir les droits
                        ou demander plus d'informations.
                    </p>
                </div>
            );
            break;
        case "en":
            text = (
                <div>
                    <p>
                        Exclusive copyrights and source-code of this app are for sell
                        for 15.000 EUR or 17.000 USD.
                    </p>
                    <p>
                        The technologies used are:
                    </p>
                    <List>
                        <ListItem>
                            React.js
                        </ListItem>
                        <ListItem>
                            Material-ui
                        </ListItem>
                        <ListItem>
                            Cordova
                        </ListItem>
                    </List>
                    <p>
                        Contact the author of the application by email to buy the copyrights
                        or to ask for more informations.
                    </p>
                </div>
            );
            break;
        default:
            text = <span />;
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
                            text={this.context.translation["buyRights.title"]}
                            style={{ marginTop: 2, color: "#eee" }}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <div style={{ padding: 22, fontFamily: "Roboto, sans-serif", lineHeight: "1.4em", textAlign: "justify" }}>
                    {text}
                    <RaisedButton
                        style={{ textAlign: "center" }}
                        linkButton fullWidth
                        onTouchTap={this.contactAuthor}
                        label="phorque@phorque.it"
                        href="mailto:phorque@phorque.it"
                    />
                </div>
            </div>
        );
    }
});

export default BuyRightsPage;
