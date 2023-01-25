import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TodoItem from "./Action";
import theme from "../src/theme";

const styles = {
	todo: {
		maxWidth: 400,
		margin: "auto",
		marginTop: theme.spacing(5),
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

const Todo = ({ data }) => {
	const initialState = Object.keys(data["events"]).map((key) => {
		return {
			day: key,
			tasks: data["events"][key]["tasks"],
			lastUpdated: data["events"][key]["lastUpdated"],
			lastUpdatedDisplay: data["events"][key]["lastUpdatedDisplay"],
		};
	});
	console.log(initialState);

	return (
		<Grid
			container
			sx={{...styles.todo}}
			justify="center"
			direction="column"
		>
			<header>
				<h1 style={{...styles.srOnly}}> Report </h1>
			</header>
			<Paper sx={{...styles.paper}} elevation={3}>
				<ul style={{...styles.list}}>
					{initialState.map((todo) => (
						<div>
							<h2 style={{ marginTop: "10px" }}>
								{new Date(todo.day).toLocaleDateString()}
							</h2>
							<ul style={{...styles.list}}>
								{todo.tasks.map((task) => (
									<TodoItem
										key={task.id}
										todo={task}
										updateTodo={() => {}}
										disabled={true}
									/>
								))}
							</ul>
						</div>
					))}
				</ul>
			</Paper>
		</Grid>
	);
};

export default Todo;
