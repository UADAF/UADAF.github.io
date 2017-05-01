import {InviteLoaded, Action} from "../actions/Actions";
import {loadJson} from "../misc/MiscUtils";
export default function (state: string = null, action: Action<any>): string {
	if (action && action.type === InviteLoaded) {
		return action.data['instant_invite'];
	}
	if (state) {
		return state;
	} else {
		loadJson("https://discordapp.com/api/guilds/197699632841752576/widget.json", InviteLoaded, {crossDomain: true});
		return "";
	}
}