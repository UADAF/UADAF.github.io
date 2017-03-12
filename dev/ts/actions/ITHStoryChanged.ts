import {Action, ITHStoryChanged} from "./Actions";

export default function (changeBy: number): Action {
	return {
		type: ITHStoryChanged,
		data: changeBy
	};
}