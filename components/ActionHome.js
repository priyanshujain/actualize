import React from "react";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ActionList from "./ActionList";
import { getLatestData, downloadData } from "../utils/storage";
import Button from "@mui/material/Button";
import theme from "../src/theme";
import Base from "./Base";
import moment from "moment";

const styles = {
	todo: {
		maxWidth: 480,
		margin: "auto",
		marginTop: theme.spacing,
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

const ActionHome = () => {
	return (
		<main>
			<Base />
			<Grid
			container
			style={{...styles.todo}}
			justify="center"
			direction="column"
		>
			<Paper style={{...styles.paper}} elevation={3}>
				<h1>{moment().format('ddd Do, MMM YYYY')}</h1>
				<ActionList data={getLatestData()} />
			</Paper>
		</Grid>
		</main>
		
	);
};

export default ActionHome;
