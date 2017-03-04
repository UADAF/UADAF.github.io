import * as Redux from "redux";
export interface Action extends Redux.Action
{
	type: string;
	data: any;
}