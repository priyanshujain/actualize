import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TodoItem from './Action'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	todo: {
		maxWidth: 400,
		margin: 'auto',
		marginTop: 40,
		textAlign: 'center',
	},
	logo: {
		left: 'unset !important',
	},
	srOnly: {
		width: 0,
		height: 0,
		position: 'absolute',
		left: '-9999px',
		overflow: 'hidden',
	},
	paper: {
		width: '100%',
	},
	form: {
		padding: 2,
	},
	list: {
		listStyle: 'none',
		padding: 0,
		marginBottom: 0,
		borderRadius: '0 0 4px 4px',
	},
})

const Todo = ({ data }) => {
	const initialState = Object.keys(data['events']).map((key) => {
		return {
			day: key,
			tasks: data['events'][key]['tasks'],
			lastUpdated: data['events'][key]['lastUpdated'],
			lastUpdatedDisplay: data['events'][key]['lastUpdatedDisplay'],
		}
	})
	console.log(initialState)

	return (
		<Grid
			container
			className={theme.todo}
			justify="center"
			direction="column"
		>
			<header>
				<h1 className={theme.srOnly}> Todo App </h1>
			</header>
			<Paper className={theme.paper} elevation={3}>
				<ul className={theme.list}>
					{initialState.map((todo) => (
						<div>
							<h2 style={{marginTop: "10px"}}>{new Date(todo.day).toLocaleDateString()}</h2>
							<ul className={theme.list}>
								{todo.tasks.map((task) => (
									<TodoItem key={task.id} todo={task} updateTodo={() => {}} disabled={true} />
								))}
							</ul>
						</div>
					))}
				</ul>
			</Paper>
		</Grid>
	)
}

export default Todo
