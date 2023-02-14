import React from "react";
import { createTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import theme from "../src/theme";
import moment from "moment";
import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const styles = {
	modal: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	},
	submitButton: {},
	form: {
		padding: theme.spacing(2),
		paddingTop: 0,
		textAlign: "right",
	},
};

const EditGoal = ({ open, todo, handleClose, updateTodo }) => {
	const [text, setText] = React.useState(todo.text);

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

	const handleAddTodo = (e) => {
		e.preventDefault();
		if (text.length > 0) {
			if (text != todo.text) {
				updateTodo({
					id: todo.id,
					text: text,
					lastUpdated: new Date().toISOString(),
					lastUpdatedDisplay: new Date().toLocaleString(),
					updated: true,
				});
			}
			handleClose();
		} else {
			alert("Please type a goal");
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={styles.modal}>
				<form onSubmit={handleAddTodo} style={{ ...styles.form }}>
					<TextField
						fullWidth
						value={text}
						sx={{ display: "block" }}
						margin="normal"
						label="Edit Goal"
						onChange={handleTextChange}
						inputProps={{ "aria-label": "What must be done?" }}
					/>

					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginTop: "24px",
						}}
					>
						<Button
							onClick={handleClose}
							variant="outlined"
							color="primary"
							style={{
								marginRight: "10px",
							}}
						>
							cancel
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Submit
						</Button>
					</div>
				</form>
			</Box>
		</Modal>
	);
};

export default EditGoal;
