import React from 'react'
import Router from 'next/router'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ActionList from './ActionList'
import { getLatestData, downloadData } from '../utils/storage'
import Button from '@mui/material/Button'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
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
		padding: 2,
	},
	list: {
		listStyle: 'none',
		padding: 0,
		marginBottom: 0,
		borderRadius: '0 0 4px 4px',
	},
	action: {
		padding: 2,
		textAlign: 'right',
	}
})

const routetoSchema = () => {
	Router.push('/schema')
}
const routetoReport = () => {
	Router.push('/report')
}

const ActionHome = () => {
	return (
		<Grid
			container
			className={theme.todo}
			justify="center"
			direction="column"
		>
			<Paper className={theme.paper} elevation={3}>
				<Paper className={theme.action} elevation={3}>
					<Button variant="outlined" color="secondary" onClick={routetoReport} style={{marginRight: '10px'}}>
						Report
					</Button>
					<Button variant="outlined" color="secondary" onClick={downloadData} style={{marginRight: '10px'}}>
						Download
					</Button>
					<Button variant="contained" color="secondary" onClick={routetoSchema}>
						Edit Goals
					</Button>
				</Paper>
				<h1>{new Date().toDateString()}</h1>
				<ActionList data={getLatestData()} />
			</Paper>			
		</Grid>
	)
}

export default ActionHome;
