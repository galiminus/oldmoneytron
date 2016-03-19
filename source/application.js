import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import ReactDOM from "react-dom";

import { Router, Route, IndexRoute, browserHistory } from "react-router";

import MoneyPage from "pages/money";
import VariationFormPage from "pages/variation-form-page";
import VariationListPage from "pages/variation-list-page";
import BuyRightsPage from "pages/buy-rights-page";
import SettingsPage from "pages/settings-page";

import Translations from "translations";

import _FlexBoxGrid from "flexboxgrid-with-hide";

import numeral from "numeral";
import fr from "numeral/languages/fr";

numeral.language("fr", fr);
numeral.language("fr");

import moment from "moment";

moment.locale("fr");

const Application = React.createClass({
    childContextTypes: {
        translation: React.PropTypes.object.isRequired,
        currency: React.PropTypes.string.isRequired
    },

    getChildContext() {
        return { translation: Translations.frFR, currency: "EUR" };
    },

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={MoneyPage}>
                    <IndexRoute component={VariationListPage} />

                    <Route path="/edit/:id" component={VariationFormPage} />
                    <Route path="/new" component={VariationFormPage} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route path="/buyRights" component={BuyRightsPage} />
                </Route>
            </Router>
        );
    }
});

ReactDOM.render(
    <Application />
, document.getElementsByTagName("main")[0]);
