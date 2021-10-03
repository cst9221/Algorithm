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

const Merge = () => {
  const sorting = useSelector((state) => state.sorting)

  const dispatch = useDispatch()

  const [array, setArray] = React.useState(sorting.array)
  const [type, setType] = React.useState("divide") // merge
  const [curr, setCurr] = React.useState(-1)
  const [other, setOther] = React.useState(-1)
  const [nestArray, setNestArray] = React.useState([])

  const [delay, setDelay] = React.useState(200)
  const [isPlaying, setIsPlaying] = React.useState(false)
  /* 
[[6, 1, 9, 7, 8], [5, 3, 4, 10, 2]]
[[6, 1, 9], [7, 8], [5, 3, 4], [10, 2]]
[[6, 1], [9], [7, 8], [5, 3], [4], [10, 2]]
[[6, 1], [9], [7, 8], [5, 3], [4], [10, 2]] 0, 1
[[1, 6], [9], [7, 8], [5, 3], [4], [10, 2]] 2, 1
*/
  const next = () => {
    const a = array.slice()
    if (nestArray.length < 1) {
      setNestArray([a.splice(0, Math.ceil(a.length / 2)), a])
      return
    }
    if (type === "divide") {
      let newNestArray = []
      let isDivide = false
      nestArray.forEach((e) => {
        if (e.length > 2) {
          newNestArray.push(e.splice(0, Math.ceil(e.length / 2)))
          isDivide = true
        }
        newNestArray.push(e)
      })
      setNestArray(newNestArray)
      if (!isDivide) {
        setType("merge")
        setCurr(0)
        setOther(1)
      }
    } else {
      console.log(nestArray.length)
    }
  }

  useInterval(
    () => {
      // if (curr === 0) setIsPlaying(false)
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
    if (event.target.value > 0 && event.target.value < 10000) {
      dispatch(updateLengthToValue(parseInt(event.target.value)))
    }
  }

  const resetState = () => {
    setCurr(sorting.length)
    setNestArray([])
    setType("divide")
    setCurr(-1)
    setOther(-1)
  }

  const evenArray = React.useMemo(() => {
    let arr = []
    nestArray.forEach((e, i) => {
      if (i % 2 === 0) {
        arr.push(e.map((ee) => array.indexOf(ee)))
      }
    })
    return arr.flat()
  }, [nestArray, array])

  return (
    <div style={{}}>
      <Chart chartType="bar" array={array} selections={evenArray} arrows={[curr, other]} />
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

export default Merge
