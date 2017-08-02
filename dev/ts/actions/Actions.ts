import {Action as ReduxAction} from "redux";


export const PageChanged: string = "PageChanged";
export const ITHLogin: string = "ITHLogin";
export const ITHStoryChanged: string = "ITHStoryChanged";
export const VkLoaded: string = "VkLoaded";
export const FAQLoaded: string = "FAQLoaded";
export const InviteLoaded: string = "InviteLoaded";
export const CustomContentLoaded: string = "CustomContentLoaded";

export const Register: string = "Register";
export const Login: string = "Login";

export interface Action<T> extends ReduxAction {
	type: string;
	data: T;
}

export type ActionCreator<T> = (data: T) => Action<T>;

export function createAction<T>(type: string, data: T): Action<T> {
	return {
		type: type,
		data: data
	}
}

export function createActionCreator<T>(type: string): ActionCreator<T> {
	return (data: T) => createAction(type, data);
}

