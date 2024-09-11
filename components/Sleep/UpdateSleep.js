import React, { useState } from "react";
import theme from "../../src/theme";

import dayjs from "dayjs";
import { setLastSleepData } from "../../utils/storage/sleep";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/material";
import SleepQualityRating  from "./SleepQuality";

const styles = {
	box: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		height: 800,
		maxHeight: "100vh",
		maxWidth: "100xw",
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	},
	action: {
		textAlign: "right",
	},
};


const UpdateSleep = (props) => {
	const { open, handleClose, sleepData, updateLastSleepData } = props;
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [sleepDetails, setSleepDetails] = useState(sleepData);
	const [endTime, setEndTime] = useState(sleepData.endTime);
	const [startTime, setStartTime] = useState(sleepData.startTime);
	const [selectedQuality, setSelectedQuality] = useState(5);

	const handleChange = () => {};

	const handleSave = () => {
		if (sleepDetails != sleepData) {
            sleepDetails.isRecorded = true;
			sleepDetails.quality = selectedQuality;
			setLastSleepData(sleepDetails);
			setSnackBarOpen(true);
			updateLastSleepData(sleepDetails);
		}
	};

	const handleEndTimeChange = (newValue) => {
		let newEndTime = {
			hours: newValue.hour(),
			minutes: newValue.minute(),
			isRecorded: true,
		};
		setEndTime(newEndTime);
		sleepDetails.endTime = newEndTime;
		setSleepDetails(sleepDetails);
	};

	const handleStartTimeChange = (newValue) => {
		let newStartTime = {
			hours: newValue.hour(),
			minutes: newValue.minute(),
			isRecorded: true,
		};
		setStartTime(newStartTime);
		sleepDetails.startTime = newStartTime;
		setSleepDetails(sleepDetails);
	};

	const handleBarOpen = () => {
		setSnackBarOpen(true);
	};

	const handleBarClose = () => {
		setSnackBarOpen(false);
		handleClose();
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={styles.box}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Update Sleep
					</Typography>
					<div
						style={{
							cursor: "pointer",
						}}
						onClick={handleClose}
					>
						<CloseIcon />
					</div>
				</div>
				<div
					style={{
						marginTop: "32px",
					}}
				>
					<p>When did you sleep?</p>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<TimePicker
							label="Sleep Time"
							value={dayjs()
								.hour(startTime.hours)
								.minute(startTime.minutes)}
							onChange={handleStartTimeChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</div>
				<div
					style={{
						marginTop: "32px",
					}}
				>
					<p>When did you wake up?</p>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<TimePicker
							label="Wake Up Time"
							value={dayjs()
								.hour(endTime.hours)
								.minute(endTime.minutes)}
							onChange={handleEndTimeChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</div>
				<div
					style={{
						marginTop: "32px",
					}}
				>
					<p>how well did you sleep?</p>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
						}}
					>
						{Object.keys(SleepQualityRating).reverse().map((key) => (
							<div
                                key={key}
								style={{
									fontSize: "40px",
									cursor: "pointer",
									padding: "0 8px",
                                    border: selectedQuality == Number(key) ? "2px solid #000" : "" ,
                                    borderRadius: "10px",
								}}
								onClick={() => setSelectedQuality(key)}
							>
								{SleepQualityRating[key]?.emoji}
							</div>
						))}
					</div>
					<p
                    style={{
                        fontStyle: "italic",
                        color: theme.palette.text.secondary,
                    }}
                    >{SleepQualityRating[selectedQuality]?.description}</p>
				</div>

				<div style={{ ...styles.action }}>
					<Button
						type="submit"
						variant={snackBarOpen ? "contained" : "outlined"}
						style={{
							width: "100%",
							marginTop: "32px",
						}}
						onClick={handleSave}
					>
						UPDATE
					</Button>
					<Snackbar
						open={snackBarOpen}
						autoHideDuration={1000}
						onClose={handleBarClose}
						message="Last night sleep data updated successfully"
					/>
				</div>
			</Box>
		</Modal>
	);
};

export default UpdateSleep;
