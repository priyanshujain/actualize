import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TodoItem from './Action'

const useStyles = makeStyles((theme) => ({
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
		padding: theme.spacing(2),
	},
	list: {
		listStyle: 'none',
		padding: 0,
		marginBottom: 0,
		borderRadius: '0 0 4px 4px',
	},
}))

const Todo = ({ data }) => {
	const classes = useStyles()
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
			className={classes.todo}
			justify="center"
			direction="column"
		>
			<header>
				<h1 className={classes.srOnly}> Todo App </h1>
			</header>
			<Paper className={classes.paper} elevation={3}>
				<ul className={classes.list}>
					{initialState.map((todo) => (
						<div>
							<h2 style={{marginTop: "10px"}}>{new Date(todo.day).toLocaleDateString()}</h2>
							<ul className={classes.list}>
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
