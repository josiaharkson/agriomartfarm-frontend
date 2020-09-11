import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: "100%",
		height: 600,
	},
	tile: {
		width: 10,
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
		marginRight: 5,
		borderColor: "rgba(255, 255, 255, 0.54)",
	},
}));

// const tileData = [
// 	{
// 		img: "/img/sample.jpg",
// 		title: "",
// 		author: "Product Details",
// 		cols: 2,
// 	},
// 	{
// 		img: "/img/sample.jpg",
// 		title: "",
// 		author: "Product Details",
// 		cols: 1,
// 	},

// 	{
// 		img: "/img/sample.jpg",
// 		title: "",
// 		author: "Product Details",
// 		cols: 1,
// 	},

// 	{
// 		img: "/img/sample.jpg",
// 		title: "",
// 		author: "Product Details",
// 		cols: 1,
// 	},
// ];
export default function TitlebarGridList() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<GridList
				spacing={30}
				cellHeight={180}
				className={classes.gridList}
				cols={4}
			>
				{[...new Array(20)].map(tile => (
					<GridListTile key={Math.random()}>
						<img src={"/img/sample.jpg"} alt={"alt title"} />
						<GridListTileBar
							title=""
							subtitle={<span>Product Details</span>}
							actionIcon={
								<Button
									aria-label={`info about: Product Details`}
									className={classes.icon}
									variant="outlined"
									size="small"
								>
									OPEN
								</Button>
							}
						/>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
}
