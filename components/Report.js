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
			sx={{...styles.todo}}
			justify="center"
			direction="column"
		>
			<Paper sx={{...styles.paper}} elevation={3}>
				<ReportList data={getData()} />
			</Paper>
		</Grid>
		</main>
	);
};

export default Todo;
