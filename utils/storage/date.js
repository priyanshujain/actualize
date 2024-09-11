import React from "react";
import dayjs from "dayjs";
import { getSettingsData } from "./settings";


function getCurrentDate() {
	const settings = getSettingsData();
	let dt = dayjs();
	if (
		dayjs() < dayjs().add(settings.dayStartTime.hours, "hour").add(settings.dayStartTime.minutes, "minute")
	) {
		dt = dayjs().add(-1, "day");
	}
	return dt.startOf("day");
}

function getCurrentDateString() {
	const settings = getSettingsData();
	const date = dayjs()
		.add(-settings.dayStartTime.hours, "hour")
		.add(-settings.dayStartTime.minutes, "minute");
	const year = date.year();
	const month = date.month() + 1;
	const day = date.date();

	const monthStr = month < 10 ? `0${month}` : month;
	const dayStr = day < 10 ? `0${day}` : day;
	return `${year}-${monthStr}-${dayStr}`;
}

function getLastSleepDateString() {
	const settings = getSettingsData();
	const date = dayjs()
		.add(-1, "day")
		.add(-settings.dayStartTime.hours, "hour")
		.add(-settings.dayStartTime.minutes, "minute");
	const year = date.year();
	const month = date.month() + 1;
	const day = date.date();

	const monthStr = month < 10 ? `0${month}` : month;
	const dayStr = day < 10 ? `0${day}` : day;
	return `${year}-${monthStr}-${dayStr}`;
}

export { getCurrentDateString, getLastSleepDateString, getCurrentDate };
