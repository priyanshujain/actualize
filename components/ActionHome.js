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
			<div style={{...styles.paper}}>
				<h2>{moment().format('ddd, Do MMM')}</h2>
				<p
				style={{marginTop: "5px", textAlign: "center", padding: "0 20px", fontWeight: "400"}}
				><i>“Every action you take is a vote for the person you wish to become”</i><br /> - James Clear</p>
				<ActionList data={getLatestData()} />
			</div>
		</Grid>
		</main>
		
	);
};

export default ActionHome;
