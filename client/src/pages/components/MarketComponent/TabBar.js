import React from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    margin: 20,
    padding: 20,
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 30,
    [theme.breakpoints.down("sm")]: {
      display: "block",
      marginTop: 20,
    },
  },
  white: {
    color: "black",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={0} className={classes.grow}>
        <Typography
          className={clsx(classes.title, classes.white)}
          variant="h4"
          noWrap
        >
          Market Data
        </Typography>

        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Divider />
    </>
  );
}
