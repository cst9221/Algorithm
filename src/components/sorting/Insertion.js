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

const Insertion = () => {
  const sorting = useSelector((state) => state.sorting)

  const dispatch = useDispatch()

  const [array, setArray] = React.useState(sorting.array)
  const [curr, setCurr] = React.useState(0)
  const [otherArray, setOtherArray] = React.useState([])
  const [other, setOther] = React.useState(-1)

  const [delay, setDelay] = React.useState(500)
  const [isPlaying, setIsPlaying] = React.useState(false)
  /* 
    6 1 9 7 8 5 3 4 10 2 
    6 [] x
    6 1 9 7 8 5 3 4 10 2 
    1 6 9 7 8 5 3 4 10 2 
    1 6 9 7 8 5 3 4 10 2 
    1 6 7 9 8 5 3 4 10 2 
    [1,6,9],7,8,5,3,4,10,2 | >
         ^  !
    [1,6,9],7,8,5,3,4,10,2 | <
       ^    !
*/
  const next = () => {
    let a = array.slice()
    let c = curr
    let o = other
    if (c < 1) {
      setCurr(1)
      setOtherArray(a.slice(0, 1))
      setOther(0)
      return
    } else {
      let b = otherArray.slice()
      if (a[c] < b[o]) {
        setOther((prev) => prev - 1)
        return
      } else {
        const v = a.splice(c, 1)[0]
        a.splice(o + 1, 0, v)
        setArray(a)
        setCurr(c + 1)
        setOther(c)
        setOtherArray(a.slice(0, c + 1))
      }
    }
  }

  useInterval(
    () => {
      if (array.length <= curr) {
        setIsPlaying(false)
        return
      }
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
    setOther(-1)
  }

  return (
    <div style={{}}>
      <Chart chartType="bar" array={array} selections={[curr]} arrows={[other]} />

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

export default Insertion
