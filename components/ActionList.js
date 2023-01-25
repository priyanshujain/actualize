import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TodoItem from "./Action";
import { setLatestData } from "../utils/storage";
import theme from "../src/theme";

const styles = {
	todo: {
		maxWidth: 480,
		margin: "auto",
		marginTop: theme.spacing(4),
		textAlign: "center",
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
	const initialState = data["tasks"].map((key) => {
		return {
			id: key.id,
			text: key.text,
			completed: key.completed,
			lastUpdated: key.lastUpdated,
			lastUpdatedDisplay: key.lastUpdatedDisplay,
		};
	});
	const [todos, setTodos] = useState(initialState);

	const updateTodo = (todo) => {
		const updatedTodos = todos.map((v) => (v.id === todo.id ? todo : v));
		setTodos(updatedTodos);
		setLatestData(updatedTodos);
	};

	return (
		<Grid
			container
			sx={{ ...styles.todo }}
			justify="center"
			direction="column"
		>
			<div style={{ ...styles.paper }}>
				<ul style={{ ...styles.list }}>
					{todos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							updateTodo={updateTodo}
							disabled={false}
						/>
					))}
				</ul>
			</div>
		</Grid>
	);
};

export default Todo;
