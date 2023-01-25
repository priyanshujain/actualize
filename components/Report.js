import React from "react";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { getData } from "../utils/storage";
import Button from "@mui/material/Button";
import ReportList from "./ReportList";
import theme from "../src/theme";

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

const routetoHome = () => {
	Router.push("/");
};

const Todo = () => {
	return (
		<Grid
			container
			sx={{...styles.todo}}
			justify="center"
			direction="column"
		>
			<Paper sx={{...styles.paper}} elevation={3}>
				<Paper sx={{...styles.action}} elevation={3}>
					<Button
						variant="contained"
						color="secondary"
						onClick={routetoHome}
					>
						Home
					</Button>
				</Paper>
				<ReportList data={getData()} />
			</Paper>
		</Grid>
	);
};

export default Todo;
