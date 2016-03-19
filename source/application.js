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

import _FlexBoxGrid from "flexboxgrid-with-hide";

const Application = React.createClass({
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
