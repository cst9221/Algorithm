import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { createBrowserHistory } from "history"

import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import MuiAppBar from "@mui/material/AppBar"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import MainView from "./components/common/MainView"
import ListView from "./components/common/ListView"

import { drawerWidth } from "./values"
import { openDrawer, closeDrawer } from "./mainSlice"

let history = createBrowserHistory()

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}))

const App = () => {
  const theme = useTheme()
  const main = useSelector((state) => state.main)
  const dispatch = useDispatch()

  // const handleDrawerOpen = () => dispatch(openDrawer())
  const handleDrawerClose = () => dispatch(closeDrawer())
  // const handleClickLogo = () => console.log("rootLinkRef")

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }} variant="persistent" anchor="left" open={main.drawer}>
          <DrawerHeader>
            <Link to="/" style={{ textDecoration: "none" }}>
              <IconButton>Algorithm</IconButton>
            </Link>
            <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
          </DrawerHeader>
          <Divider />
          <ListView items={main.paths} dept={0} />
        </Drawer>

        <MainView />
      </Box>
    </Router>
  )
}

export default App
