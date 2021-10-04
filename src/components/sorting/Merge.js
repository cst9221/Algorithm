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

const canSplice = (array) => {
  let count = 0
  for (let i = 0; i < array.length; i++) {
    if (!Array.isArray(array[i])) count += 1
  }
  if (count >= 2) {
    return true
  } else {
    return false
  }
}

const mergeSort = (array, depth) => {
  let a = array.slice()
  if (array.length < 2) {
  }
  if (depth === 0) return [a.splice(0, Math.ceil(a.length / 2)), a]
  return mergeSort(a, depth)
  //   return [a.splice(0, Math.ceil(a.length / 2)), a]
}

const Merge = () => {
  const sorting = useSelector((state) => state.sorting)

  const dispatch = useDispatch()

  const [array, setArray] = React.useState(sorting.array)
  const [type, setType] = React.useState("divide") // sort merge
  const [depth, setDepth] = React.useState(0)

  const [curr, setCurr] = React.useState(-1)
  const [other, setOther] = React.useState(-1)
  const [nestArray, setNestArray] = React.useState([])
  const [nestCurr, setNestCurr] = React.useState(0)

  const [delay, setDelay] = React.useState(200)
  const [isPlaying, setIsPlaying] = React.useState(false)

  /* 
  Divide과정
  찾아낸 패턴 : 
  1     array의 값들 중 배열이 아닌값이 2개이상인가?
  1-1   해당 array를 반을 나누어 쪼갠다. 
  1-2   쪼갤 수 없음 넘어감
  
  // 쪼갤 수 있으면 true를 없으면 false를 리턴
  canSplice(array){
    let count = 0
    for(let i = 0; i < array.length; i++){
      if(!Array.isArray(array[i]) && array.length > 2){
        count += 1
      }
    }
    if(count >= 2){
      return true
    } else{
      return false
    }
  }
  
  spliceHalf(array){
    
  }

  [6, 1, 9, 7, 8, 5, 3, 4, 10, 2]
  
  [ [ 6, 1, 9, 7, 8 ], [ 5, 3, 4, 10, 2 ] ]

  [ [ [ 6, 1, 9 ], [ 7, 8 ] ], [ [ 5, 3, 4 ], [ 10, 2 ] ] ]

  [ [ [ [ 6, 1 ], [ 9 ] ], [ [ 7 ], [ 8 ] ] ], [ [ [ 5, 3 ], [ 4 ] ], [ [ 10 ], [ 2 ] ] ] ]

  [ [ [ [ [ 6 ], [ 1 ] ], [ 9 ] ], [ [ 7 ], [ 8 ] ] ], [ [ [ [ 5 ], [ 3 ] ], [ 4 ] ], [ [ 10 ], [ 2 ] ] ] ]

  [ [1, 6], [9], [7, 8], [3, 5], [4], [2, 10] ]
  [[1, 6, 9], [7, 8, 3, 5], [4, 2, 10]]

  [[1, 6, 9], [3, 5, 7, 8], [2, 4, 10]]

  [[1, 6, 9, 3, 5, 7, 8], [2, 4, 10]]

  [[1, 3, 5, 6, 7, 8, 9], [2, 4, 10]]

  [1, 3, 5, 6, 7, 8, 9, 2, 4, 10]

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  */

  const next = () => {
    const a = array.slice()
    if (nestArray.length < 1) {
      setNestArray(a)
      return
    }
    if (type === "divide") {
      mergeSort(array, depth)
    }
    // if (nestArray.length < 1) {
    //   setNestArray([a.splice(0, Math.ceil(a.length / 2)), a])
    //   return
    // }
    // if (type === "divide") {
    //   let newNestArray = []
    //   let isDivide = false
    //   nestArray.forEach((e) => {
    //     if (e.length > 2) {
    //       newNestArray.push(e.splice(0, Math.ceil(e.length / 2)))
    //       isDivide = true
    //     }
    //     newNestArray.push(e)
    //   })
    //   setNestArray(newNestArray)
    //   if (!isDivide) {
    //     setType("sort")
    //     setCurr(0)
    //     setOther(1)
    //     setNestCurr(0)
    //   }
    // } else if (type === "sort") {
    //   console.log(nestArray, nestCurr)
    //   let b = nestArray[nestCurr]
    //   let i = a.indexOf(b[0])
    //   setCurr(i)
    //   if (b.length > 1) {
    //     setOther(i + 1)
    //     if (a[i] > a[i + 1]) {
    //       let t = a[i]
    //       a[i] = a[i + 1]
    //       a[i + 1] = t
    //       setArray(a)
    //     }
    //   } else {
    //     setOther(-1)
    //   }
    //   if (a.length - 2 <= i) {
    //     setType("merge")
    //   } else {
    //     setNestCurr((prev) => prev + 1)
    //   }
    // } else {
    //   if (nestArray.length > 1) {
    //     let arr = []
    //     const half = nestArray.length / 2
    //     for (let j = 0; j < half; j++) {
    //       arr[j] = nestArray[j * 2].concat(nestArray[j * 2 + 1])
    //     }
    //     setNestArray(arr)
    //     setType("sort")
    //     setCurr(0)
    //     setOther(1)
    //     setNestCurr(0)
    //   }
    // }
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
    setNestCurr(-1)
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
