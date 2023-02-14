import React, { useState } from "react";
import { createTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import theme from "../src/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import EditGoal from "./EditGoal";

const styles = {
	todoItem: {
		display: "flex",
		padding: theme.spacing(2),
		// opacity: 0,
		animationName: "$slideDown",
		animationDuration: "300ms",
		animationFillMode: "forwards",
		animationDelay: "0s",
		animationTimingFunction: "cubic-bezier(0.1, 0.23, 0.23, 1.44)",
		"&:nthChild(even)": {
			background: "#EEF6FF",
		},
	},
	"@keyframes slideDown": {
		from: {
			opacity: 0,
			transform: "translateY(-10px)",
		},
		to: {
			opacity: 1,
			transform: "translateY(0px)",
		},
	},
	text: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		marginLeft: 1,
	},
	textWithStrike: {
		textDecoration: "line-through",
	},
};

const TodoItem = ({ todo, updateTodo, removeTodo }) => {
	const [isEditOpen, setIsEditOpen] = useState(false);

	const handleEditClose = () => {
		setIsEditOpen(false);
	};

	const openEditModal = () => {
		setIsEditOpen(true);
	};

	return (
		<li style={{ ...styles.todoItem }}>
			<div style={{ ...styles.text }}>
				<Checkbox
					checked={todo.completed}
					onChange={() => updateTodo({ ...todo })}
					color="primary"
					disabled={true}
					style={{ display: "none" }}
				/>

				<div>
					<Typography
						variant="h6"
						display="block"
						style={{
							color: "black",
							textAlign: "left",
							paddingRight: "10px",
						}}
					>
						{todo.text}
					</Typography>
					<Typography
						variant="span"
						display="block"
						style={{ color: "black", textAlign: "left" }}
					>
						{todo.updated ? "Updated" : "Added"} on:{" "}
						{moment(new Date(todo.lastUpdated)).format(
							"MMM Do, YYYY hh:mm a"
						)}
					</Typography>
				</div>
			</div>
			<Fab
				aria-label="Edit Todo"
				onClick={() => openEditModal()}
				size="small"
				style={{ background: "#fff", marginRight: "10px" }}
			>
				<EditIcon htmlColor={theme.palette.primary.main} />
			</Fab>
			<Fab
				aria-label="Delete Todo"
				onClick={() => removeTodo(todo)}
				size="small"
				style={{ background: theme.palette.primary.main }}
			>
				<DeleteIcon htmlColor="#fff" />
			</Fab>
			<EditGoal
				open={isEditOpen}
				handleClose={handleEditClose}
				todo={todo}
				updateTodo={updateTodo}
			/>
		</li>
	);
};

export default TodoItem;
