import * as React from "react";
import {render} from "react-dom";
import {createStore, Store} from "redux";
import Page from "./components/Pages/Page";
import {Provider} from "react-redux";
import {Reducers, default as reduces} from "./reducers/reducers";
import * as $ from "jquery";
import * as bs from "bootstrap";
export const store: Store<Reducers> = createStore<Reducers>(reduces);
$(() => render(
	<Provider store={store}>
		<Page />
	</Provider>,
	$("#root").get(0))
);
