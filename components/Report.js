import React from "react";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { getData } from "../utils/storage";
import Button from "@mui/material/Button";
import ReportList from "./ReportList";
import theme from "../src/theme";
import Base from "./Base";

const styles = {
	todo: {
		maxWidth: 480,
		margin: "auto",
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

const Todo = () => {
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
						📝 Past Report
					</h1>
					<p
						style={{
							marginTop: "5px",
							textAlign: "center",
							padding: "0 20px",
							fontWeight: "400",
						}}
					>
						Congratulations! you are making progress.{" "}
						<i>
							Habits are the compound interest of
							self-improvement.
						</i>
					</p>
					<ReportList data={getData()} />
				</div>
			</Grid>
		</main>
	);
};

export default Todo;
