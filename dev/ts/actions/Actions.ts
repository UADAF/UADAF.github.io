import {Action as ReduxAction} from "redux";


export const PageChanged: string = "PageChanged";
export const ITHLogin: string = "ITHLogin";
export const ITHStoryChanged = "ITHStoryChanged";
export interface Action extends ReduxAction {
	type: string;
	data: any;
}