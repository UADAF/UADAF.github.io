import {ajax} from "jquery";
import {store} from "../index";
import {createAction} from "../actions/Actions";
export function localStorageContains(key: string): boolean {
	let item = localStorage.getItem(key);
	return item !== null && item !== "NONE";
}

export function loadJson(url: string, actionName: string, options: JQueryAjaxSettings = {}) {
	options.url = url;
	ajax(options).then(data => store.dispatch(createAction<any>(actionName, data)));
}

const html5_audio_types= { //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
	"mp3": "audio/mpeg",
	"mp4": "audio/mp4",
	"ogg": "audio/ogg",
	"wav": "audio/wav"
};

export function createsoundbite(...sound: string[]): {playclip: () => void, element: HTMLAudioElement}{
	const html5audio = document.createElement('audio');
	if (html5audio.canPlayType){ //check support for HTML5 audio
		sound.forEach(src => {
			const sourceEl = document.createElement('source');
			sourceEl.setAttribute('src', src);
			if (src.match(/\.(\w+)$/i))
				sourceEl.setAttribute('type', html5_audio_types[RegExp.$1]);
			html5audio.appendChild(sourceEl)
		});
		html5audio.load();
		html5audio.volume = 0.1;
		return {playclip: () => {
			console.log("SSS");
			html5audio.pause();
			html5audio.currentTime=0;
			html5audio.play();
		}, element: html5audio}
	}
	else{
		return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio unfortunately")}, element: null}
	}
}