import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import TodoItem from "./TodoItem";
import { setSchema, getSchema } from "../utils/storage";
import Button from "@mui/material/Button";
import Router from "next/router";
import theme from "../src/theme";
import Base from "./Base";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const styles = {
	todo: {
		maxWidth: 480,
		margin: "auto",
		textAlign: "center",
	},
	paper: {
		width: "100%",
	},
	form: {
		padding: theme.spacing(2),
		paddingTop: 0,
		textAlign: "right",
	},
	list: {
		listStyle: "none",
		padding: 0,
		marginBottom: 0,
		borderRadius: "0 0 4px 4px",
	},
	action: {
		padding: theme.spacing(2),
		textAlign: "right",
	},
	submitButton: {
		width: "50px",
		height: "50px",
		borderRadius: "50%",
		border: 0,
		backgroundColor: theme.palette.primary.main,
	},
};

const Todo = () => {
	const initialState = getSchema().map((key) => {
		return {
			id: key.id,
			text: key.text,
			lastUpdated: key.lastUpdated,
			lastUpdatedDisplay: key.lastUpdatedDisplay,
		};
	});
	const [todos, setTodos] = useState(initialState);
	const [text, setText] = useState("");

	const addTodo = (text) => {
		const todo = {
			id: Math.random().toString(36).substring(2),
			text,
			lastUpdated: new Date().toISOString(),
			lastUpdatedDisplay: new Date().toLocaleString(),
		};
		setTodos([...todos, todo]);
		setSchema([...todos, todo].map((todo) => todo));
	};

	const removeTodo = (todo) => {
		if (window.confirm("Are you sure you want to delete this goal?")) {
			const filteredTodos = todos.filter((v) => v !== todo);
			setTodos(filteredTodos);
			setSchema(filteredTodos.map((todo) => todo));
		}
	};

	const updateTodo = (todo) => {
		const updatedTodos = todos.map((v) => (v.id === todo.id ? todo : v));
		setTodos(updatedTodos);
		setSchema(updatedTodos.map((todo) => todo));
	};

	const handleAddTodo = (e) => {
		e.preventDefault();
		const trimmedText = text.trim();

		trimmedText && addTodo(trimmedText);
		setText("");
	};

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

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
							textAlign: "left",
							paddingLeft: "20px",
							fontWeight: "400",
						}}
					>
						Daily Goals
					</h1>
					<p
						style={{
							marginTop: "0px",
							textAlign: "left",
							padding: "0 20px",
							fontWeight: "400",
						}}
					>
						<i>“with better habits, anything is possible”</i>
					</p>
					<form onSubmit={handleAddTodo} style={{ ...styles.form }}>
						<TextField
							fullWidth
							value={text}
							sx={{ display: "block" }}
							margin="normal"
							label="What must be done?"
							onChange={handleTextChange}
							inputProps={{ "aria-label": "What must be done?" }}
						/>
						{!!todos.length && (
							<Grid container justify="space-between">
								<Grid item>
									Total Goals added: {todos.length}
								</Grid>
							</Grid>
						)}

						<button
							type="submit"
							style={{ ...styles.submitButton }}
						>
							<ArrowForwardIcon htmlColor="#fff" />
						</button>
					</form>

					<ul style={{ ...styles.list }}>
						{todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								updateTodo={updateTodo}
								removeTodo={removeTodo}
							/>
						))}
					</ul>
				</div>
			</Grid>
		</main>
	);
};

export default Todo;
