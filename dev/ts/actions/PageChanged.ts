import {PageChanged, Action} from "./Actions";
export default function (page: string): Action {
	return {
		type: PageChanged,
		data: page
	}
}