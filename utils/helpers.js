export function renameKey(obj, oldKey, newKey) {
	obj[newKey] = obj[oldKey];
	delete obj[oldKey];
}

export function fixOldDateFormat(date) {
	if (date) {
		let dateArr = date.split("-");
		if (dateArr.length === 3) {
			if (dateArr[2].length === 1) {
				dateArr[2] = "0" + dateArr[2];
			}
			return dateArr.join("-");
		}
	}
	return date;
}
