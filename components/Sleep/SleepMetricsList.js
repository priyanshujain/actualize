import React from "react";
import Grid from "@mui/material/Grid";
import moment from "moment";
import dayjs from "dayjs";
import { capitalize } from "../../utils/helpers";
import SleepQualityRating from "./SleepQuality";
import { getSleepDuration } from "../../utils/storage/sleep";

const styles = {
	todo: {
		maxWidth: 400,
		margin: "auto",
		textAlign: "center",
	},
	logo: {
		left: "unset !important",
	},
	srOnly: {
		width: 0,
		height: 0,
		position: "absolute",
		left: "-9999px",
		overflow: "hidden",
	},
	paper: {
		width: "100%",
	},
	list: {
		listStyle: "none",
		padding: 0,
		marginBottom: 0,
		borderRadius: "0 0 4px 4px",
	},
};

const SleepMetricsList = ({ data }) => {
	let initialState = Object.keys(data["events"])
		.reverse()
		.map((key) => {
			return {
				day: key,
				sleep: data["events"][key],
			};
		});

    initialState = initialState.map((item) => {
        // if duration is not recorded, calculate it
        if (!item.sleep.duration || !item.sleep.duration.hours) {
            item.sleep.duration = getSleepDuration(item.day, item.sleep);
        }
        return item;
    });
    

	return (
		<Grid
			container
			sx={{ ...styles.todo }}
			justify="center"
			direction="column"
		>
			<header>
				<h1 style={{ ...styles.srOnly }}> Report </h1>
			</header>
			<div sx={{ ...styles.paper }}>
				<ul style={{ ...styles.list }}>
					{initialState.map((todo) => (
						<div style={{ marginTop: "40px" }} key={todo.day}>
							<h2
								style={{
									margin: "10px 0 0 0",
									fontWeight: 500,
								}}
							>
								{moment(new Date(todo.day)).format(
									"ddd, Do MMM"
								)}
							</h2>
							<div>
						<p
							style={{
								marginTop: "0",
								fontStyle: "italic",
								color: "red",
							}}
						>
							{!todo.sleep?.isRecorded
								? "(automated record)"
								: ""}
						</p>
						<div
							style={{
								display: "flex",
							}}
						>
							<div
								style={{
									width: "50%",
								}}
							>
								<p
									style={{
										marginBottom: "4px",
									}}
								>
									Bedtime
								</p>
								<p
									style={{
										fontWeight: "500",
										marginTop: "0px",
									}}
								>
									{dayjs()
										.startOf("day")
										.add(
											todo.sleep?.startTime?.hours,
											"hour"
										)
										.add(
											todo.sleep?.startTime?.minutes,
											"minute"
										)
										.format("h:mm A")}
								</p>
							</div>
							<div>
								<p
									style={{
										marginBottom: "4px",
									}}
								>
									Wakeup Time
								</p>
								<p
									style={{
										fontWeight: "500",
										marginTop: "0px",
									}}
								>
									{dayjs()
										.startOf("day")
										.add(
											todo.sleep?.endTime?.hours,
											"hour"
										)
										.add(
											todo.sleep?.endTime?.minutes,
											"minute"
										)
										.format("h:mm A")}
								</p>
							</div>
						</div>
						<div
							style={{
								display: "flex",
							}}
						>
							<div
								style={{
									width: "50%",
								}}
							>
								<p
									style={{
										marginBottom: "4px",
									}}
								>
									Duration
								</p>
								<p
									style={{
										fontWeight: "500",
										marginTop: "0px",
									}}
								>
									{`${todo.sleep?.duration?.hours} h ${
										todo.sleep?.duration?.minutes
											? `${todo.sleep?.duration?.minutes} m`
											: ""
									}`}
								</p>
							</div>
							<div>
								<p
									style={{
										marginBottom: "4px",
									}}
								>
									Sleep Quality
								</p>
								<p
									style={{
										fontWeight: "500",
										marginTop: 0,
									}}
								>
									{todo.sleep?.quality ? 
									capitalize(SleepQualityRating[todo.sleep?.quality]?.short)
								: "-"}
								</p>
							</div>
						</div>
					</div>
						</div>
					))}
				</ul>
			</div>
		</Grid>
	);
};

export default SleepMetricsList;
