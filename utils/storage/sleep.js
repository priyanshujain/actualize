import React from "react";
import dayjs from "dayjs";
import {
	getLastSleepDateString,
	getCurrentDateString,
	getCurrentDate,
} from "./date";

export function getSleepData() {
	var data = window.localStorage.getItem("_sleep");
	if (data) {
		data = decodeURIComponent(escape(window.atob(data)));
		data = JSON.parse(data);
	} else {
		data = getDefaultSleepData();
	}
	return data;
}

export function setSleepData(data) {
	data = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
	window.localStorage.setItem("_sleep", data);
}

function getDefaultSleepData() {
	const sleep = {
		setting: {
			sleepStartTime: {
				hours: 23,
				minutes: 0,
			},
			sleepEndTime: {
				hours: 7,
				minutes: 0,
			},
			sleepDuration: {
				hours: 8,
				minutes: 0,
			},
			sleepTimeBuffer: {
				hours: 0,
				minutes: 30,
			},
		},
		events: {},
	};
	return sleep;
}

export function getSleepSchema() {
	return {
		id: "sleep",
		startTime: {
			hours: 0,
			minutes: 0,
			timeIso: "",
			isRecorded: false,
		},
		endTime: {
			hours: 0,
			minutes: 0,
			timeIso: "",
			isRecorded: false,
		},
		duration: {
			hours: 0,
			minutes: 0,
		},
		lastUpdated: "",
		sleepMood: "",
		wakeUPMood: "",
		notes: "",
		alarmUsed: false,
		sleepQuality: "good",
		awakeDuringNight: false,
		sleepAidUsed: false,
		sleepAidType: "",
		sleepAidDosage: "",
		sleepAidTime: {
			hours: 0,
			minutes: 0,
		},
		dayType: "",
		weather: "",
		location: "",
		dinnerTime: {
			hours: 0,
			minutes: 0,
		},
		dinnerType: "",
		dinnerAmount: "",
		dinnerLate: false,
		workoutDone: false,
		workoutType: "",
		workoutTime: {
			hours: 0,
			minutes: 0,
		},
		workoutDuration: {
			hours: 0,
			minutes: 0,
		},
		workoutLate: null,
		workoutIntensity: "",
		workoutLocation: "",
		isStressed: false,
		isAnxious: false,
		isDepressed: false,
		isSad: false,
		isAngry: false,
		isIrritable: false,
		isTired: false,
		isFatigued: false,
		isSleepy: false,
		isNauseous: false,
		isHeadache: false,
		isDizzy: false,
		isFoggy: false,
		isConfused: false,
		isForgetful: false,
		isDistracted: false,
		isRecorded: false,
		isSleepHoursTargetMet: false,
	};
}

export function getLastSleepData() {
	const date = getLastSleepDateString();
	var data = getSleepData();

	const defaultData = getSleepSchema();

	let isExists = false;
	if (data["events"].hasOwnProperty(date)) {
		isExists = true;
	}
	if (!isExists) {
		data["events"][date] = defaultData;
		return data["events"][date];
	}
	return data["events"][date];
}

export function getCurrentSleepData() {
	const date = getCurrentDateString();
	var data = getSleepData();

	const defaultData = getSleepSchema();

	let isExists = false;
	if (data["events"].hasOwnProperty(date)) {
		isExists = true;
	}
	if (!isExists) {
		data["events"][date] = defaultData;
		return data["events"][date];
	}
	return data["events"][date];
}

export function setLastSleepData(data) {
	const date = getLastSleepDateString();
	var sleepData = getSleepData();
	data["lastUpdated"] = new Date().toISOString();
	sleepData["events"][date] = data;
	setSleepData(sleepData);
}

export function setCurrentSleepData(data) {
	const date = getCurrentDateString();
	var sleepData = getSleepData();
	data["lastUpdated"] = new Date().toISOString();
	sleepData["events"][date] = data;
	setSleepData(sleepData);
}

export function setDefaultLastSleepData() {
	const date = getLastSleepDateString();
	var data = getSleepData();
	if (data["events"].hasOwnProperty(date)) {
		return;
	}
	const sleepData = getLastSleepData();
	setLastSleepData(sleepData);
}

export function getSleepSettingData() {
	let data = getSleepData()["setting"];
	let defaultSettingData = getDefaultSleepData()["setting"];
	for (let key in defaultSettingData) {
		if (data[key] === undefined) {
			data[key] = defaultData[key];
		}
	}
	return data;
}

export function setSleepSettingData(data) {
	let sleepData = getSleepData();
	sleepData["setting"] = data;
	setSleepData(sleepData);
}

export function setSleepNow() {
	let sleepData = getCurrentSleepData();
	const dt = dayjs();
	sleepData.startTime.timeIso = dt.format();
	sleepData.startTime.isRecorded = true;
	sleepData.startTime.hours = dt.hour();
	sleepData.startTime.minutes = dt.minute();
	setCurrentSleepData(sleepData);
}

function doesDateChange() {
	const settings = getSleepSettingData();
	const dt = dayjs();
	return (
		dt
			.startOf("day")
			.add(settings.sleepStartTime.hours, "hour")
			.add(settings.sleepStartTime.minutes, "minute") >
		dt
			.startOf("day")
			.add(settings.sleepEndTime.hours, "hour")
			.add(settings.sleepEndTime.minutes, "minute")
	);
}

export function setSleepAuto() {
	const settings = getSleepSettingData();
	const sleepTime = getCurrentDate()
		.add(settings.sleepStartTime.hours, "hour")
		.add(settings.sleepStartTime.minutes, "minute");
	let wakeUpTime = getCurrentDate()
		.add(settings.sleepEndTime.hours, "hour")
		.add(settings.sleepEndTime.minutes, "minute");
	if (doesDateChange()) {
		wakeUpTime = wakeUpTime.add(1, "day");
	}
	if (dayjs() > sleepTime) {
		let sleepData = getCurrentSleepData();
		if (dayjs() >= wakeUpTime) {
			return;
		}
		const dt = dayjs();
		sleepData.startTime.timeIso = dt.format();
		sleepData.startTime.hours = dt.hour();
		sleepData.startTime.minutes = dt.minute();
		setCurrentSleepData(sleepData);
	}
}

export function setWakeUpAuto() {
	const settings = getSleepSettingData();
	const sleepTime = getCurrentDate()
		.add(settings.sleepStartTime.hours, "hour")
		.add(settings.sleepStartTime.minutes, "minute");
	let wakeUpTime = getCurrentDate()
		.add(settings.sleepEndTime.hours, "hour")
		.add(settings.sleepEndTime.minutes, "minute");
	if (doesDateChange()) {
		wakeUpTime = wakeUpTime.add(1, "day");
	}
	const nextSleepTime = sleepTime.add(1, "day");
	if (
		dayjs() <
		nextSleepTime
	) {
		const sleepData = getLastSleepData();
		if (sleepData.endTime.isRecorded) {
			return;
		}
		if (!sleepData.startTime.isRecorded) {
			sleepData.startTime.hours = sleepTime.hour();
			sleepData.startTime.minutes = sleepTime.minute();
			sleepData.startTime.timeIso = sleepTime.format();
			sleepData.startTime.isRecorded = true;
		}

		const dt = dayjs();
		sleepData.endTime.timeIso = dt.format();
		sleepData.endTime.isRecorded = true;
		sleepData.endTime.hours = dt.hour();
		sleepData.endTime.minutes = dt.minute();
		let endDt = dayjs(sleepData.endTime.timeIso);
		let startDt = dayjs(sleepData.startTime.timeIso);
		sleepData.duration.hours = endDt.diff(startDt, "hour");
		endDt = endDt.subtract(sleepData.duration.hours, "hour");
		sleepData.duration.minutes = endDt.diff(startDt, "minute");
		setLastSleepData(sleepData);
	}
}
