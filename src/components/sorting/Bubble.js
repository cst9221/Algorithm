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

const Bubble = () => {
  const sorting = useSelector((state) => state.sorting)

  const dispatch = useDispatch()

  const [array, setArray] = React.useState(sorting.array)
  const [curr, setCurr] = React.useState(-1)
  const [other, setOther] = React.useState(0)

  const [delay, setDelay] = React.useState(200)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const next = () => {
    const a = array.slice()
    const c = curr
    const o = other
    if (curr < 0) {
      setCurr(array.length)
      return
    }
    if (a[o] > a[o + 1]) {
      let t = a[o]
      a[o] = a[o + 1]
      a[o + 1] = t
      setArray(a)
    }
    if (c - 1 <= o) {
      setCurr((prev) => prev - 1)
      setOther(0)
    } else {
      setOther((prev) => prev + 1)
    }
  }

  useInterval(
    () => {
      if (curr === 0) setIsPlaying(false)
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
    setCurr(sorting.length)
    setOther(0)
  }

  return (
    <div style={{}}>
      <Chart chartType="bar" array={array} selections={[curr]} arrows={[other, other + 1]} />
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

export default Bubble
