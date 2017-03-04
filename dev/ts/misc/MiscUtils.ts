export function localStorageContains(key: string): boolean
{
	let item = localStorage.getItem(key);
	return item !== null && item !== "NONE";
}

export function isJWT(jwt: string) {
	return jwt.split('.').length == 3;
}