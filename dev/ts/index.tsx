export const backendExt: string = ".php"; //Apache
//export const backendExt: string = ".js"; //Some node server (Like Express)


import * as React from "react";
import {render} from "react-dom";
import {createStore, Store} from "redux";
import Page from "./components/Pages/Page";
import {Provider} from "react-redux";
import {Reducers, default as reducers} from "./reducers/reducers";
import * as $ from "jquery";

export let store: Store<Reducers>;


$(() => {
	enableCORSAjax();
	store = createStore<Reducers>(reducers);
	render(
		<Provider store={store}>
			<Page />
		</Provider>,
		$("#root").get(0))
});


function enableCORSAjax() {
	$.ajaxPrefilter(options => {
		if (options.crossDomain && $.support.cors) {
			options.url = (window.location.protocol === 'http:' ? 'http:' : 'https:') + '//cors-anywhere.herokuapp.com/' + options.url;
		}
	});
}