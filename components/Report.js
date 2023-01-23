import React from 'react'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import ActionList from './ActionList'
import { getData } from '../utils/storage'
import { Button } from '@material-ui/core'
import ReportList from './ReportList'

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
	action: {
		padding: theme.spacing(2),
		textAlign: 'right',
	}
}))

const routetoHome = () => {
	Router.push('/')
}

const Todo = () => {
	const classes = useStyles()

	return (
		<Grid
			container
			className={classes.todo}
			justify="center"
			direction="column"
		>
			<Paper className={classes.paper} elevation={3}>
				<Paper className={classes.action} elevation={3}>
					<Button variant="contained" color="secondary" onClick={routetoHome}>
						Home
					</Button>
				</Paper>
				<h1> Goal Report </h1>
				<ReportList data={getData()} />
			</Paper>			
		</Grid>
	)
}

export default Todo;
