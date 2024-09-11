import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import theme from "../../src/theme";
import Base from "../Base";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getSettingsData } from "../../utils/storage";
import { setSettingsData } from "../../utils/storage/settings";
import {
	getSleepSettingData,
	setSleepSettingData,
} from "../../utils/storage/sleep";
import dayjs from "dayjs";
import { Snackbar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const styles = {
	todo: {
		maxWidth: 480,
		margin: "auto",
		marginBottom: "100px",
	},
	paper: {
		width: "100%",
		textAlign: "left",
	},
	form: {
		padding: theme.spacing(2),
		paddingTop: 0,
		textAlign: "left",
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
};

const Support = () => {
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
						Support
					</h1>
					<p
						style={{
							marginTop: "5px",
							padding: "0 20px",
							fontWeight: "400",
						}}
					>
						We are here to help you. Please feel free to contact us
						for any queries or feedback.
						<ul>
							<li>
								<a href="mailto:ipriyanshujain@gmail.com">
									E-mail
								</a>
							</li>
                            <li>
                                <a href="https://wa.me/918431624370">
                                    Whatsapp
                                </a>
                            </li>
						</ul>
					</p>
				</div>
			</Grid>
		</main>
	);
};

export default Support;
