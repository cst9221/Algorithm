import React from "react"
import { createBrowserHistory } from "history"
import { Link } from "react-router-dom"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

import { useDispatch } from "react-redux"
import { updateCurrPath } from "../../mainSlice"

const ListItemView = ({ item, dept, parents }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)

  const { id = "", title = "", children = [] } = item
  const pathArr = [...parents, id]

  const handleItemShow = () => setOpen(!open)
  const handleItemClick = () => dispatch(updateCurrPath(item))

  return (
    <>
      <ListItem disablePadding>
        {children.length ? (
          <ListItemButton onClick={handleItemShow} sx={{ pl: 2 * (dept + 1) }}>
            <ListItemText primary={title} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        ) : (
          <Link to={`/${pathArr.join("/")}`} onClick={handleItemClick} style={{ flex: 1, textDecoration: "none", color: "#000" }}>
            <ListItemButton sx={{ pl: 2 * (dept + 1) }}>
              <ListItemText primary={title} />
            </ListItemButton>
          </Link>
        )}
      </ListItem>
      <Collapse key={id} in={open} timeout="auto" unmountOnExit>
        {children.length > 0 && <ListView items={children} dept={dept + 1} parents={pathArr} />}
      </Collapse>
    </>
  )
}

const ListView = ({ items = [], dept, parents = [] }) => {
  return (
    <List component="div" disablePadding>
      {items.map((item, index) => (
        <ListItemView key={item.id} item={item} dept={dept} parents={parents} />
      ))}
    </List>
  )
}

export default ListView
