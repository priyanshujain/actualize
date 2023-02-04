export function getSettingsData() {
	var data = window.localStorage.getItem("_settings");
	if (data) {
		data = decodeURIComponent(escape(window.atob(data)));
		data = JSON.parse(data);
	} else {
		data = getDefaultSettings();
	}
	return data;
}

export function setSettingsData(data) {
	data = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
	window.localStorage.setItem("_settings", data);
}

function getDefaultSettings() {
	const settings = {
		dayStartTime: {
			hours: 0,
			minutes: 0,
		},
	};
	return settings;
}
