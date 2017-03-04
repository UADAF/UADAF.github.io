import {VkContactProps} from "../components/Vk/VkContact";
import {ajax} from "jquery";
export default function (state = null): VkContactProps[] {
	if(state) {
		return state;
	}
	return ajax({
		url: "json/vk.json",
		async: false
	}).responseJSON;
}