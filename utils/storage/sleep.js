import React from "react";
import { getCurrentDate } from "./date";

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
				hours: 11,
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
		},
		endTime: {
			hours: 0,
			minutes: 0,
		},
		duration: 0,
		lastUpdated: "",
		sleepMood: "",
		wakeUPMood: "",
		notes: "",
		alarmUsed: false,
		sleepQuality: "",
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
	};
}

export function getLastSleepData() {
	const date = getCurrentDate();
	const data = getSleepData();

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
	const date = getCurrentDate();
	const sleepData = getSleepData();
	sleepData["events"][date] = data;
	setSleepData(sleepData);
}
