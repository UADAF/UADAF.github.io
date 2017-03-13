import {VkContactProps} from "../components/Vk/VkContact";
import {ajax} from "jquery";
export default function (state: VkContactProps[] = null): VkContactProps[] {
	return state || ajax({url: "json/vk.json", async: false}).responseJSON;
}