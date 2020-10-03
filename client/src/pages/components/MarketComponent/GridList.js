import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import useRequest from "../../../utils/useRequest";

import config from "../../../utils/config";
const KEYS = config();

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
  paper: {
    width: "100%",
    height: 140,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 14,
    textAlign: "center",
  },
  btn: { height: 30, margin: "0 5px", fontSize: 12, marginBottom: 10 },

  prodDetails: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    color: "gray",
    fontSize: 12,
    margin: "10px 5px",
    textAlign: "center",
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
export default function TitlebarGridList(props) {
  const classes = useStyles();
  const { data } = props;

  console.log(data);
  return (
    <div className={classes.root}>
      {!data.length ? (
        <div>No Product Has Been Added To The Database</div>
      ) : (
        <Grid container spacing={4} style={{ padding: 20 }}>
          {data.map(item => (
            <SingleProductBox item={item} key={Math.random()} />
          ))}
        </Grid>
      )}
    </div>
  );
}

const SingleProductBox = ({ item }) => {
  const classes = useStyles();

  const url = KEYS.API_URL + "/api/product/stats/" + item._id;
  const url2 = KEYS.API_URL + "/api/farm/get/" + item.farm;

  const { data, error, isValidating } = useRequest({
    url,
  });
  const { data: farm } = useRequest({
    url: url2,
  });

  return (
    <Grid item xs={3} style={{ marginTop: 20 }}>
      <Paper className={classes.paper} elevation={10}>
        <div>
          <Typography style={{ textTransform: "capitalize" }}>
            {item.name}
          </Typography>
          <div className={classes.prodDetails}>
            {error ? (
              <>GET error!</>
            ) : (
              <>
                {isValidating ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    {data ? (
                      <>
                        <span> Quantity: {data.response.quantity}</span>
                        <span> Price: {data.response.sold}</span>
                        {farm && farm.response && farm.response.name && (
                          <span>Farm: {farm.response.name}</span>
                        )}
                      </>
                    ) : null}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <Button className={classes.btn} variant="contained" color="default">
          open product
        </Button>
      </Paper>
    </Grid>
  );
};
