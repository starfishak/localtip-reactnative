import AppContainer from "./src/routes";
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from "./src/constants";

const store = configureStore()

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
            );
    }
};