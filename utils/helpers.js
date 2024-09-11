export function renameKey(obj, oldKey, newKey) {
	obj[newKey] = obj[oldKey];
	delete obj[oldKey];
}

export function capitalize(string) {
	if (string === null || string === undefined || string === "") {
		return "";
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}
