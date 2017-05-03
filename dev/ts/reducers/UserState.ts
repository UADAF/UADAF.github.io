import {ajax} from "jquery";
import {Action, createAction, Login, Register} from "../actions/Actions";
import {backendExt, store} from "../index";
import {localStorageContains} from "../misc/MiscUtils";
import {RegisterPageProps} from "../components/Pages/RegisterPage";
export interface UserState {
	token: string;
	name: string;
	wfname: string;
	id: number;
	customMsg?: string;
	color?: string;
}

export interface StatedProp<T> {
	state: string;
	data: T
}

export interface RegisterProps{
	username: string;
	wf_username: string;
	email: string;
	password: string;
	repassword: string;
}

export interface LoginProps{
	name: string;
	password: string;
}

const unlogged: UserState = {
	token: undefined,
	name: undefined,
	wfname: undefined,
	id: -1
};

export default function (state: UserState = null, action: Action<any>): UserState {
	if (!state) {
		if (localStorageContains('last-token')) {
			validateToken(localStorage.getItem('last-token'));
		}
		return unlogged;
	}
	let changed: boolean = false;
	if (action) {
		if (action.type === Login) {
			let ret = parseLoginAction(action, state);
			if(typeof ret === 'boolean') {
				if(ret) {
					changed = true;
				}
			} else {
				return ret;
			}
		} else if (action.type === Register) {
			if(parseRegAction(action, state)) {
				changed = true;
			}
		}
	}

	return changed ? JSON.parse(JSON.stringify(state)) : state;
}


function validateToken(token: string) {
	request('get', {token, fields: ['username', 'wf_username', `uuid`]}).done(data => {
		if (data.error) {
			alert(`Что-то пошло не так, ${data.msg}`);
			return;
		}
		if (data.success) {
			let info = data.data;
			let loginInfo = {token, name: info.username, wfname: info.wf_username, id: info.uuid};
			store.dispatch(createAction(Login, loginInfo));
		} else {
			localStorage.removeItem('last-token');
		}
	}).fail(e => {
		alert(`Что-то пошло не так, ${e.message}`);
	})
}

function parseLoginAction(action: Action<StatedProp<LoginProps | UserState | RegisterPageProps>>, state: UserState): boolean | UserState {
	let changed: boolean = false;
	switch (action.data.state) {
		case "request": {
			let loginData: LoginProps = <LoginProps>action.data.data;
			if(loginData.name && loginData.password) {
				login(loginData);
			} else {
				state.color = 'red';
				state.customMsg = 'Что-то не указано';
				changed = true;
			}
			break;
		}
		case "msg": {
			let msg: RegisterPageProps = <RegisterPageProps>action.data.data;
			state.color = msg.color;
			state.customMsg = msg.msg;
			changed = true;
			break;
		}
		case "response": {
			let data: UserState = <UserState>action.data.data;
			data.customMsg = 'Success';
			data.color = 'green';
			localStorage.setItem('last-token', data.token);
			return data;
		}
	}
	return changed;
}

function login(loginData: LoginProps): void {
	request('login', loginData).done(data => {
		if(typeof data === 'string') {
			data = JSON.parse(data);
		}
		if(data.error) {
			store.dispatch(createAction(Login, {
				state: 'msg',
				data: {
					msg: data.msg,
					color: 'red'
				}
			}));
		} else {
			store.dispatch(createAction(Login, {
				state: 'response',
				data: data.data
			}))
		}
	})
}

function parseRegAction(action: Action<StatedProp<RegisterProps | RegisterPageProps>>, state: UserState): boolean {
	let changed: boolean = false;
	switch (action.data.state) {
		case "request": {
			let regData: RegisterProps = <RegisterProps>action.data.data;
			if (regData.email && regData.username && regData.password && regData.repassword) {
				if (regData.password === regData.repassword) {
					register(regData);
				} else {
					state.color = 'red';
					state.customMsg = 'Пароли не совпадают';
					changed = true;
				}
			} else {
				state.color = 'red';
				state.customMsg = 'Что-то не указано...';
				changed = true;
			}
			break;
		}
		case "msg": {
			let data: RegisterPageProps = <RegisterPageProps>action.data.data;
			state.color = data.color;
			state.customMsg = data.msg;
			changed = true;
			break;
		}
	}
	return changed;
}

function register(regData: RegisterProps): void {

	request('reg', regData).done(data => {
		if (typeof data === 'string') {
			data = JSON.parse(data);
		}
		if (data.error) {
			store.dispatch(createAction<StatedProp<RegisterPageProps>>(Register, {
				state: 'msg',
				data: {
					color: 'red',
					msg: data.msg
				}
			}));
		} else {
			store.dispatch(createAction<StatedProp<LoginProps>>(Login, {
				state: 'request',
				data: {
					name: regData.username,
					password: regData.password
				}
			}))
		}
	})
}

function request(task: string, data): JQueryXHR {
	data.task = task;
	return ajax({
		url: `/backend/Account${backendExt}`,
		method: 'POST',
		data
	});
}