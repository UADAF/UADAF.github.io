import {createAction, Action, QuoteChanged, QuoteLoaded} from "../actions/Actions";
import {ajax} from "jquery";
import {store, backendExt} from "../index";

export interface QuoterState {
	quote: number;
	text: string;
	author: string;
}

const defaultState: QuoterState = {
	quote: -1,
	text: "UNLOADED",
	author: "UNLOADED"
};

export default function (state: QuoterState = null, action: Action<any>): QuoterState {
	if (action) {
		switch (action.type) {
			case QuoteChanged: {
				if (state.quote == -1) {
					return defaultState;
				}
				let quote = 0;
				switch(action.data.mode) {
					case '+':
						quote = state.quote + parseInt(action.data.id);
						break;
					case '-':
						quote = state.quote - parseInt(action.data.id);
						break;
					case '=':
						quote = parseInt(action.data.id);
						break;
					case '^':
						getQuote(-1);
						return state
				}
				if (isNaN(quote) || quote <= 0) {
					return state;
				}
				getQuote(quote);
				return state;
			}
			case QuoteLoaded: {
				return {
					quote: parseInt(action.data.id),
					text: action.data.quote,
					author: action.data.author
				}
			}
		}

	}
	if (!state && typeof store != "undefined") {
		getQuote(-1);
		return defaultState
	}
	return state;
}

function connectToDB(data: Object, async: boolean = false, cb: (data: any, textStatus: string, jqXHR: JQueryXHR) => any = null): string {
	return ajax({
		url: `backend/Quoter${backendExt}`,
		method: "POST",
		data: data,
		async: async,
		success: cb
	}).responseText;
}

function getQuote(id: number): void {
	connectToDB({'task': 'GET', 'mode': id === -1 ? 'rand' : 'pos', 'pos': id}, true, data => {
		store.dispatch(createAction(QuoteLoaded, JSON.parse(data)))
	});
}