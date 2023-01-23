import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TodoItem from './Action'
import { setLatestData } from '../utils/storage'

const useStyles = makeStyles((theme) => ({
	todo: {
		maxWidth: 400,
		margin: 'auto',
		marginTop: 40,
		textAlign: 'center',
	},
	logo: {
		left: 'unset !important'
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

const Todo = ({data}) => {
	const classes = useStyles()
	const initialState = data['tasks'].map(key => {
		return {
			id: key.id,
			text: key.text,
			completed: key.completed,
			lastUpdated: key.lastUpdated,
			lastUpdatedDisplay: key.lastUpdatedDisplay,
		}})
	const [todos, setTodos] = useState(initialState)

	const updateTodo = (todo) => {
		const updatedTodos = todos.map((v) => (v.id === todo.id ? todo : v))
		setTodos(updatedTodos)
		setLatestData(updatedTodos)
	}

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
					{todos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							updateTodo={updateTodo}
							disabled={false}
						/>
					))}
				</ul>
			</Paper>
		</Grid>
	)
}

export default Todo;
