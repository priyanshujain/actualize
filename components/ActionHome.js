import React from "react";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ActionList from "./ActionList";
import { getLatestData, downloadData } from "../utils/storage";
import Button from "@mui/material/Button";
import theme from "../src/theme";

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

const routetoSchema = () => {
	Router.push("/schema");
};
const routetoReport = () => {
	Router.push("/report");
};

const ActionHome = () => {
	return (
		<Grid
			container
			style={{...styles.todo}}
			justify="center"
			direction="column"
		>
			<Paper style={{...styles.paper}} elevation={3}>
				<Paper style={{...styles.action}} elevation={3}>
					<Button
						variant="outlined"
						color="secondary"
						onClick={routetoReport}
						style={{ marginRight: "10px" }}
					>
						Report
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						onClick={downloadData}
						style={{ marginRight: "10px" }}
					>
						Download
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={routetoSchema}
					>
						Edit Goals
					</Button>
				</Paper>
				<h1>{new Date().toLocaleDateString()}</h1>
				<ActionList data={getLatestData()} />
			</Paper>
		</Grid>
	);
};

export default ActionHome;
