import {Action as ReduxAction} from "redux";


export const PageChanged: string = "PageChanged";
export const ITHLogin: string = "ITHLogin";
export const ITHStoryChanged = "ITHStoryChanged";
export interface Action<T> extends ReduxAction {
	type: string;
	data: T;
}

type ActionCreator<T> = (data: T) => Action<T>;

export function createAction<T>(type: string, data: T): Action<T> {
	return {
		type: type,
		data: data
	}
}

export function createActionCreator<T>(type: string): ActionCreator<T> {
	return (data: T) => createAction(type, data);
}

