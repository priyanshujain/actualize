import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import theme from "../../src/theme";
import Base from "../Base";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getSettingsData } from "../../utils/storage";
import { setSettingsData } from "../../utils/storage/settings";
import { getSleepSettingData, setSleepSettingData } from "../../utils/storage/sleep";
import dayjs from "dayjs";
import { Snackbar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const styles = {
	todo: {
		maxWidth: 480,
		margin: "auto",
		marginBottom: "100px",
	},
	paper: {
		width: "100%",
		textAlign: "left",
	},
	form: {
		padding: theme.spacing(2),
		paddingTop: 0,
		textAlign: "left",
	},
	list: {
		listStyle: "none",
		padding: 0,
		marginBottom: 0,
		borderRadius: "0 0 4px 4px",
	},
	action: {
		padding: theme.spacing(2),
		textAlign: "right",
	},
};

const sleepDurationOptions = [
	{ label: "6 Hours", id: "06:00" },
	{ label: "6 Hours 30 minutes", id: "06:30" },
	{ label: "7 Hours", id: "07:00" },
	{ label: "7 Hours 30 minutes", id: "07:30" },
	{ label: "8 Hours", id: "08:00" },
	{ label: "8 Hours 30 minutes", id: "08:30" },
	{ label: "9 Hours", id: "09:00" },
];

const sleepDurationToOption = (sleepDuration) => {
	let id = dayjs
		.duration({
			hours: sleepDuration.hours,
			minutes: sleepDuration.minutes,
		})
		.format("HH:mm");
	return sleepDurationOptions.find((option) => option.id === id);
};


const Settings = () => {
	let initialState = getSettingsData();
	const [settings, setSettings] = useState(initialState);
	const [open, setOpen] = useState(false);
	const [startTime, setStartTime] = useState(initialState.dayStartTime);
	const [endTime, setEndTime] = useState(initialState.dayEndTime);

	// sleep settings data
	const sleepSetting = getSleepSettingData();
	const [sleepDuration, setSleepDuration] = useState(
		sleepSetting.sleepDuration
	);

	const handleSave = () => {
		if (settings != getSettingsData() || sleepDuration != sleepSetting.sleepDuration) {
			setSettingsData(settings);
			sleepSetting.sleepDuration = sleepDuration;
			sleepSetting.sleepStartTime = endTime;
			sleepSetting.sleepEndTime = startTime;
			setSleepSettingData(sleepSetting);
			setOpen(true);
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (newValue) => {
		let newStartTime = {
			hours: newValue.hour(),
			minutes: newValue.minute(),
		};
		setStartTime(newStartTime);
		settings.dayStartTime = newStartTime;
		setSettings(settings);
	};

	const handleEndTimeChange = (newValue) => {
		let newEndTime = {
			hours: newValue.hour(),
			minutes: newValue.minute(),
		};
		setEndTime(newEndTime);
		settings.dayEndTime = newEndTime;
		setSettings(settings);
	};

	const handleSleepDurationChange = (e, newValue) => {
		if (newValue) {
			const dt = dayjs(newValue.id, "HH:mm");
			let newSleepDuration = {
				hours: dt.hour(),
				minutes: dt.minute(),
			};
			setSleepDuration(newSleepDuration);
			setSettings(settings);
		}
	};

	return (
		<main>
			<Base />
			<Grid
				container
				sx={{ ...styles.todo }}
				justify="center"
				direction="column"
			>
				<div style={{ ...styles.paper }}>
					<h1
						style={{
							textAlign: "left",
							paddingLeft: "20px",
							fontWeight: "400",
						}}
					>
						This is how the day looks like
					</h1>
					<p
						style={{
							marginTop: "5px",
							textAlign: "center",
							padding: "0 20px",
							fontWeight: "400",
						}}
					>
						<i>
							“Practice does not make perfect. It is practice,
							followed by a night of sleep, that leads to
							perfection”
						</i>
					</p>
					<div
						style={{
							paddingTop: "20px",
							paddingLeft: "20px",
						}}
					>
						<p>When do you usually wake up?</p>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker
								label="Day Start Time"
								value={dayjs()
									.hour(startTime.hours)
									.minute(startTime.minutes)}
								onChange={handleChange}
								renderInput={(params) => (
									<TextField {...params} />
								)}
							/>
						</LocalizationProvider>

						<div
							style={{
								marginTop: "64px",
							}}
						>
							<p>When do you usually wind up and sleep?</p>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<TimePicker
									label="Wind Up Time"
									value={dayjs()
										.hour(endTime.hours)
										.minute(endTime.minutes)}
									onChange={handleEndTimeChange}
									renderInput={(params) => (
										<TextField {...params} />
									)}
								/>
							</LocalizationProvider>
						</div>

						<div
							style={{
								marginTop: "64px",
							}}
						>
							<p>How many hours do you wish to sleep?</p>
							<Autocomplete
								disablePortal
								id="sleep-duration"
								value={sleepDurationToOption(
									sleepDuration
								)}
								options={sleepDurationOptions}
								sx={{ width: 240 }}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Sleep Duration"
									/>
								)}
								onChange={handleSleepDurationChange}
							/>
						</div>

						<div style={{ ...styles.action }}>
							<Button
								type="submit"
								variant={open ? "contained" : "outlined"}
								style={{
									width: "100%",
									marginTop: "32px",
								}}
								onClick={handleSave}
							>
								UPDATE
							</Button>
							<Snackbar
								open={open}
								autoHideDuration={1000}
								onClose={handleClose}
								message="Setting Saved Successfully"
							/>
						</div>
					</div>
				</div>
			</Grid>
		</main>
	);
};

export default Settings;
