import React, { useEffect } from "react"
import { Route, Switch, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { createBrowserHistory } from "history"

import { styled, useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Toolbar from "@mui/material/Toolbar"
import MenuIcon from "@mui/icons-material/Menu"
import MuiAppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"

import { drawerWidth } from "../../values"
import { openDrawer } from "../../mainSlice"
import Selection from "../sorting/Selection"
import Insertion from "../sorting/Insertion"
import Bubble from "../sorting/Bubble"
import Merge from "../sorting/Merge"

let history = createBrowserHistory()

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))

const MainView = () => {
  const main = useSelector((state) => state.main)
  const location = history.location

  const dispatch = useDispatch()

  const handleDrawerOpen = () => dispatch(openDrawer())

  return (
    <Main open={main.drawer}>
      <DrawerHeader />

      <AppBar position="fixed" open={main.drawer}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(main.drawer && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {main.currPath.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path={"/Sorting"} children={<div>Sorting</div>} />
        <Route exact path={"/Sorting/Selection"} component={Selection} />
        <Route exact path={"/Sorting/Insertion"} component={Insertion} />
        <Route exact path={"/Sorting/Bubble"} component={Bubble} />
        <Route exact path={"/Sorting/Merge"} component={Merge} />
        <Route children={<div>작성중입니다.</div>} />
      </Switch>
    </Main>
  )
}

export default MainView
