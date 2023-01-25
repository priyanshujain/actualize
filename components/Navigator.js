import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import BackupIcon from "@mui/icons-material/Backup";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import { downloadData } from "../utils/storage";
import Router from "next/router";

const routetoSchema = () => {
	Router.push("/goals");
};
const routetoReport = () => {
	Router.push("/report");
};

const categories = [
	{
		id: "Habit",
		children: [
			{
				id: "Edit Daily Goals",
				icon: <SettingsEthernetIcon />,
				action: routetoSchema,
			},
			{ id: "Report", icon: <DnsRoundedIcon />, action: routetoReport },
		],
	},
	{
		id: "Settings",
		children: [
			{
				id: "Download Backup",
				icon: <BackupIcon />,
				action: downloadData,
			},
		],
	},
];

const item = {
	py: "2px",
	px: 3,
	color: "#fff",
	"&:hover, &:focus": {
		bgcolor: "rgba(255, 255, 255, 0.08)",
	},
};

const itemCategory = {
	boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
	py: 1.5,
	px: 3,
};

export default function Navigator(props) {
	const { onDrawerToggle, ...other } = props;

	return (
		<Drawer variant="permanent" {...other}>
			<List disablePadding>
				<ListItem
					sx={{
						...item,
						...itemCategory,
						fontSize: 22,
						color: "#fff",
					}}
				>
					👋 Hey There!
				</ListItem>
				<ListItemButton
					sx={{ ...item, ...itemCategory }}
					onClick={() => Router.push("/")}
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText>Home</ListItemText>
				</ListItemButton>
				{categories.map(({ id, children }) => (
					<Box key={id} sx={{ bgcolor: "#16463F" }}>
						<ListItem sx={{ py: 2, px: 3 }}>
							<ListItemText sx={{ color: "#fff" }}>
								{id}
							</ListItemText>
						</ListItem>
						{children.map(
							({ id: childId, icon, active, action }) => (
								<ListItem disablePadding key={childId}>
									<ListItemButton
										selected={active}
										sx={item}
										onClick={() => {
											action();
											props.onDrawerToggle();
										}}
									>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText>{childId}</ListItemText>
									</ListItemButton>
								</ListItem>
							)
						)}

						<Divider sx={{ mt: 2 }} />
					</Box>
				))}
			</List>
		</Drawer>
	);
}
