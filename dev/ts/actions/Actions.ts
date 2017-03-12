import {Action as ReduxAction} from "redux";


export const PageChanged: string = "PageChanged";


export interface Action extends ReduxAction {
	type: string;
	data: any;
}