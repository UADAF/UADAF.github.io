import * as React from "react";
import {render} from "react-dom";
import {createStore, Store} from "redux";
import Page from "./components/Pages/Page";
import {Provider} from "react-redux";
import {Reducers, default as reducers} from "./reducers/reducers";
import * as $ from "jquery";
export const store: Store<Reducers> = createStore<Reducers>(reducers);
$(() => {
	enableCORSAjax();
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