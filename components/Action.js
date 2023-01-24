import React from 'react'
import { createTheme } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

const theme = createTheme({
	todoItem: {
		display: 'flex',
		padding: 1,
		opacity: 0,
		animationName: '$slideDown',
		animationDuration: '300ms',
		animationFillMode: 'forwards',
		animationDelay: '0s',
		animationTimingFunction: 'cubic-bezier(0.1, 0.23, 0.23, 1.44)',
		'&:nth-child(even)': {
			background: '#EEF6FF',
		},
	},
	'@keyframes slideDown': {
		from: {
			opacity: 0,
			transform: 'translateY(-10px)',
		},
		to: {
			opacity: 1,
			transform: 'translateY(0px)',
		},
	},
	text: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	textWithStrike: {
		textDecoration: 'line-through',
	},
})

const TodoItem = ({ todo, updateTodo, disabled }) => {

	return (
		<li className={theme.todoItem}>
			<label
				className={
					todo.completed
						? `${theme.textWithStrike} ${theme.text}`
						: theme.text
				}
			> 
				<Checkbox
					checked={todo.completed}
					onChange={() =>
						updateTodo({
							...todo,
							completed: !todo.completed,
							lastUpdated: new Date().toISOString(),
							lastUpdatedDisplay: new Date().toLocaleString(),
						})
					}
					disabled={disabled}
					color="secondary"
				/>
				<div style={{paddingTop: "4px", paddingBottom: "4px"}}>
				<Typography variant="h6" display="block" style={{ color: 'black', textAlign: "left", paddingRight: "10px" }}>
					{todo.text}
				</Typography>
				{
					todo.lastUpdated && (
						<Typography variant="span" display="block"  style={{ color: 'black', textAlign: "left" }}>
					Last Updated: {todo.lastUpdatedDisplay}
				</Typography>
					)
				}
				
				</div>
			</label>
		</li>
	)
}

export default TodoItem
