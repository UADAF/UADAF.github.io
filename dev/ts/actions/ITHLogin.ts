import {ITHLogin, Action} from "./Actions";

export default function (name: string): Action {
	return {
		type: ITHLogin,
		data: name
	}
}