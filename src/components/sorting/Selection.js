import React from "react"
import { useSelector, useDispatch } from "react-redux"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { Button, ButtonGroup, Divider, Container, IconButton } from "@mui/material"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import LoopIcon from "@mui/icons-material/Loop"
import Slider from "@mui/material/Slider"
import TextField from "@mui/material/TextField"

import { decrement, increment, updateLengthToValue, updateArray } from "./sortingSlice"
import Chart from "../common/Chart"
import useInterval from "../../hooks/useInterval"

// 무작위로 배열 출력
const shuffle = (a) => {
  let j, x, i
  for (let i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i)
    x = a[i - 1]
    a[i - 1] = a[j]
    a[j] = x
  }
  return a
}

const range = (size, start = 0) => {
  return [...Array(size).keys()].map((key) => key + start)
}

const Selection = () => {
  const sorting = useSelector((state) => state.sorting)

  const dispatch = useDispatch()

  const [array, setArray] = React.useState(sorting.array)
  const [curr, setCurr] = React.useState(0)
  const [minIndex, setMinIndex] = React.useState(0)
  const [other, setOther] = React.useState(1)

  const [delay, setDelay] = React.useState(200)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const next = () => {
    let a = array.slice()
    let c = curr
    let m = minIndex
    let o = other
    if (c === a.length) return
    // check, move
    if (a[m] > a[o]) m = o
    // !+
    if (o >= a.length - 1) {
      // swap
      let t = a[c]
      a[c] = a[m]
      a[m] = t
      setArray(a)
      setCurr(c + 1)
      setMinIndex(c + 1)
      setOther(c + 2)
    } else {
      // +
      o += 1
      setMinIndex(m)
      setOther(o)
    }
  }

  useInterval(
    () => {
      if (array.length - 1 === curr) setIsPlaying(false)
      next()
    },
    isPlaying ? delay : null,
  )

  React.useEffect(() => {
    setArray(sorting.array)
  }, [sorting.array])

  const onClickIncreLength = () => dispatch(increment())
  const onClickDecreLength = () => dispatch(decrement())
  const onClickNewArray = () => {
    resetState()
    dispatch(updateArray(shuffle(range(sorting.length, 1))))
  }
  const onClickSorting = () => setIsPlaying(!isPlaying)
  const handleDelayChange = (event, newValue) => setDelay(newValue)
  const handleLengthChange = (event) => {
    if (event.target.value > 0) {
      dispatch(updateLengthToValue(parseInt(event.target.value)))
    }
  }

  const resetState = () => {
    setCurr(0)
    setOther(1)
    setMinIndex(0)
  }

  const timer = (ms) => new Promise((res) => setTimeout(res, ms))

  return (
    <div style={{}}>
      <Chart chartType="bar" array={array} selections={[curr]} arrows={[minIndex, other]} />
      <ButtonGroup orientation="horizontal" aria-label="vertical outlined button group">
        <ButtonGroup orientation="horizontal" aria-label="vertical outlined button group">
          <Button variant="outlined" onClick={onClickDecreLength}>
            <ArrowLeftIcon />
          </Button>
          <TextField id="outlined-basic" label="length" variant="outlined" value={sorting.length} onChange={handleLengthChange} />
          <Button variant="outlined" onClick={onClickIncreLength}>
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>
        <Button variant="outlined" onClick={onClickNewArray}>
          <LoopIcon />
        </Button>
        <Button variant="outlined" onClick={onClickSorting}>
          {isPlaying ? "stop" : "start"}
        </Button>
        <Button variant="outlined" onClick={next}>
          next
        </Button>
      </ButtonGroup>
      <Slider defaultValue={200} onChange={handleDelayChange} min={0} max={1000} valueLabelDisplay="auto" />
    </div>
  )
}

export default Selection
