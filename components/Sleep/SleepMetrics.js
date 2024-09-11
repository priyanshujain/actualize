import React from "react";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { getSleepData } from "../../utils/storage/sleep";
import Button from "@mui/material/Button";
import SleepMetricsList from "./SleepMetricsList";
import theme from "../../src/theme";
import Base from "./../Base";

const styles = {
	todo: {
		maxWidth: 480,
		margin: "auto",
		marginBottom: "100px",
		textAlign: "center",
	},
	paper: {
		width: "100%",
	},
	action: {
		padding: theme.spacing(2),
		textAlign: "right",
	},
};

const SleepMetrics = () => {
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
							textAlign: "center",
							paddingLeft: "20px",
							fontWeight: "400",
							marginBottom: "0px",
						}}
					>
						Sleep Metrics
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
						“They discovered that naps as short as twenty-six
							minutes in length still offered a 34 percent
							improvement in task performance and more than a 50
							percent increase in overall alertness”
						</i>
					</p>
					<SleepMetricsList data={getSleepData()} />
				</div>
			</Grid>
		</main>
	);
};

export default SleepMetrics;
