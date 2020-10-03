import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import Badge from "@material-ui/core/Badge";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { InlineLoader } from "../../../../components/IsLoading";
import SnackBar from "../../../../components/SnackBar";
import SingleFarm from "./SingleFarm";

import useRequest from "../../../../utils/useRequest";
import authHeader from "../../../../utils/auth-header";

import config from "../../../../utils/config";
const KEYS = config();

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  btn: { height: 30, margin: "0 5px" },
  message: { fontSize: 30, textAlign: "center" },
  span: { color: "gray", textAlign: "left", fontSize: 14 },
}));

function MyFarmsComponent({ user }) {
  const userId = user.id;
  const token = user.token;

  const classes = useStyles();

  // SnackBar Props
  const [msg, setMsg] = React.useState("");
  const [msgType, setMsgType] = React.useState("success");
  const [SnackBarOpen, setSnackBarOpen] = React.useState(false);

  const [selectedFarmName, setSelectedFarmName] = React.useState("");
  const [selectedFarmId, setSelectedFarmId] = React.useState("");
  const [singleFarmOpen, setSingleFarmOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // GET ALL MY FARMS
  const url = KEYS.API_URL + "/api/farm/all/byUser";

  const { data, error, isValidating, mutate } = useRequest({
    url,
    headers: authHeader(token),
  });

  const refresh = () => {
    mutate();
  };

  const deleteFarm = async farmid => {
    console.log("farmid", farmid);

    const url = KEYS.API_URL + "/api/farm//delete/single/" + farmid;
    try {
      const res = await axios.delete(url, {
        headers: authHeader(token),
      });

      console.log(res.data);
      refresh();
      setMsg("Farm Has been Deleted Successfully!");
      setMsgType("success");
      setSnackBarOpen(true);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          console.log(e.response.data);
        }
      }

      setMsg("An Error Occured!");
      setMsgType("error");
      setSnackBarOpen(true);
    }
  };

  const openSingleFarm = (farmid, farmName) => {
    setSelectedFarmId(farmid);
    setSelectedFarmName(farmName);
    setSingleFarmOpen(true);
  };

  return (
    <div className={classes.root}>
      {SnackBarOpen && (
        <SnackBar
          autoHideDuration={10000}
          message={msg}
          handleClose={() => setSnackBarOpen(false)}
          type={msgType}
        />
      )}

      {singleFarmOpen && (
        <SingleFarm
          farmId={selectedFarmId}
          farmName={selectedFarmName}
          handleClose={() => setSingleFarmOpen(false)}
          token={token}
        />
      )}

      <div className={classes.header}>
        <h3>
          My Farms
          <Badge
            badgeContent={data ? data.response.length : "0"}
            color="secondary"
            style={{ margin: "0 15px" }}
          />
        </h3>

        <Button
          className={classes.btn}
          size="small"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add New Farm
        </Button>
      </div>

      <DisplayData
        data={data}
        error={error}
        deleteFarm={deleteFarm}
        openSingleFarm={openSingleFarm}
        isValidating={isValidating}
      />

      {open && (
        <AddNewFarmDialog
          open={open}
          userId={userId}
          token={token}
          handleClose={handleClose}
          refresh={refresh}
          setMsg={setMsg}
          setMsgType={setMsgType}
          setSnackBarOpen={setSnackBarOpen}
        />
      )}
    </div>
  );
}

const DisplayData = ({
  data,
  error,
  isValidating,
  deleteFarm,
  openSingleFarm,
}) => {
  const classes = useStyles();

  if (isValidating) return <InlineLoader />;
  if (error) return <div>An Error Occured!</div>;
  if (data) {
    console.log(55555, data);

    if (data.response) {
      if (!data.response.length) {
        return (
          <div className={classes.message} style={{ margin: 30 }}>
            You have not added any farm yet!
          </div>
        );
      } else {
        return (
          <div className={classes.message}>
            <span className={classes.span}>Click on an item to open farm</span>
            <List dense={true}>
              {data.response.map(farm => (
                <React.Fragment key={Math.random()}>
                  <ListItem
                    button
                    onClick={() => openSingleFarm(farm._id, farm.name)}
                  >
                    <ListItemText
                      primary={"Farm Name"}
                      secondary={farm.name.toUpperCase()}
                    />
                    <ListItemText
                      primary={"Latitude"}
                      secondary={farm.latitude}
                    />
                    <ListItemText
                      primary={"Longitude"}
                      secondary={farm.longitude}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteFarm(farm._id)}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </div>
        );
      }
    }
  } else {
    return <InlineLoader />;
  }

  return <InlineLoader />;
};

const AddNewFarmDialog = ({
  open,
  handleClose,
  userId,
  refresh,
  token,
  setMsg,
  setMsgType,
  setSnackBarOpen,
}) => {
  const [name, setName] = React.useState("");

  const createNewFarm = async () => {
    console.log(name);
    if (!name.trim()) return;

    const url = KEYS.API_URL + "/api/farm/add";
    console.log(authHeader(token));
    try {
      const res = await axios.post(
        url,
        {
          name,
          userId,
          latitude: Math.random(),
          longitude: Math.random(),
          pic: "NIL",
        },
        { headers: authHeader(token) }
      );
      console.log(res.data);
      refresh();
      handleClose();
      setMsg("New Farm Has been Created Successfully!");
      setMsgType("success");
      setSnackBarOpen(true);
      setName("");
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          console.log(e.response.data);
        }
      }

      console.log(e);

      setMsg("An Error Occured!");
      setMsgType("error");
      setName("");
      setSnackBarOpen(true);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Farm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name of your new farm here.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Farm Name"
            type="email"
            value={name}
            fullWidth
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => createNewFarm()} color="primary">
            Create New
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyFarmsComponent;
