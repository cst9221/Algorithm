import React from "react"
import { useSelector } from "react-redux"

const getValues = (array) => {
  const max = Math.max(...array)
  const min = Math.min(...array)
  const length = array.length
  return { length, max, min }
}

const rendomColor = () => "#" + (((1 << 24) * Math.random()) | 0).toString(16)

const Bar = () => {
  return <div style={{ height: "100%", border: "1px solid" }}>sldfkj</div>
}

const BarChart = ({ width = 800, height = 300, array = [], selections = [], arrows = [] }) => {
  const canvasRef = React.useRef(null)

  const { length, max, min } = getValues(array)
  const paddingLeft = 30
  const paddingBottom = 20
  const paddingTop = 30
  const paddingRight = 0
  const gap = (1 / length) * 150
  const fontSize = 15

  class Bar {
    constructor(index) {
      this.index = index
    }
  }

  React.useEffect(() => {
    const canvas = canvasRef.current

    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
    // context.strokeStyle = "black"
    // context.strokeRect(0, 0, width, height)
    // context.strokeStyle = "blue"
    // context.strokeRect(paddingLeft, paddingTop, width - paddingLeft, height - (paddingBottom + paddingTop))
    // context.strokeStyle = "green"
    // context.strokeRect(0, 0, paddingLeft, height)
    // context.strokeStyle = "red"
    // context.strokeRect(paddingLeft, 0, width - paddingLeft, paddingTop)
    // context.strokeStyle = "purple"
    // context.strokeRect(paddingLeft, height - paddingBottom, width - paddingLeft, paddingBottom)

    // 상단 경계선
    context.beginPath()
    context.moveTo(paddingLeft - paddingLeft / 3, paddingTop)
    context.lineTo(width, paddingTop)
    context.strokeStyle = "black"
    context.closePath()
    context.stroke()

    // 하단 경계선
    context.beginPath()
    context.moveTo(paddingLeft - paddingLeft / 3, height - paddingBottom)
    context.lineTo(width, height - paddingBottom)
    context.strokeStyle = "black"
    context.closePath()
    context.stroke()

    // 상,하단 경계 text
    context.fillStyle = "black"
    context.textAlign = `center`
    context.font = `${fontSize}px Calibri`
    context.fillText(max, paddingLeft / 3, paddingTop + fontSize / 3)
    context.fillText(0, paddingLeft / 3, height - paddingBottom + fontSize / 3)

    // 배열로 그래프 그리기
    array.forEach((el, index) => {
      const x = paddingLeft + gap / 2 + (index * (width - paddingLeft)) / length
      const y = height - paddingBottom
      const w = (width - paddingLeft) / length - gap
      const h = -((height - paddingBottom - paddingTop) / max) * el

      if (arrows.includes(index)) {
        //  위치 화살표 그리기
        drawArrow(context, x + w / 2, y)
      }
      if (selections.includes(index)) {
        context.fillStyle = "rgba(255,0,0,0.6)"
      } else {
        context.fillStyle = "rgba(155,155,200,0.2)"
      }
      context.fillRect(x, y, w, h)
      //   context.fillStyle = "black"
      //   context.fillText(String(el), paddingLeft + gap / 2 + index * (width - paddingLeft) + ((width - paddingLeft) / length - gap) / 2, height - fontSize / 3)
    })
  }, [array, selections, arrows])

  const drawArrow = (context, x, y) => {
    const arrowSize = 5
    x -= arrowSize
    context.beginPath()
    context.moveTo(arrowSize + x, arrowSize + y)
    context.lineTo(arrowSize / 2 + x, arrowSize * 2 + y)
    context.lineTo(arrowSize * 1.5 + x, arrowSize * 2 + y)
    context.fillStyle = "black"
    context.fill()
    context.fillRect(arrowSize * 0.75 + x, arrowSize * 2 + y, arrowSize / 2, arrowSize * 1.25)
    context.closePath()
    context.stroke()
  }
  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  )
}

const Chart = (props) => {
  switch (props.chartType) {
    case "bar":
      return <BarChart {...props} />
    default:
      return <BarChart {...props} />
  }
}
export default Chart
