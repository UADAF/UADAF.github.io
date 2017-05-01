import {VkLoaded, Action} from "../actions/Actions";
import {VkContactProps} from "../components/Vk/VkContact";
import {loadJson} from "../misc/MiscUtils";
export default function (state: VkContactProps[] = null, action: Action<any>): VkContactProps[] {
	if (action && action.type === VkLoaded) {
		return action.data;
	}
	if (state) {
		return state;
	} else {
		loadJson("json/vk.json", VkLoaded);
		return [];
	}
}