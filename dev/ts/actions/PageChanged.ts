import {Action} from "../misc/MiscInterfaces";
import {PageChanged} from "./Actions";
export default function (page: string): Action {
	return {
		type: PageChanged,
		data: page
	}
}