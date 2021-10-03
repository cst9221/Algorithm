import { createSlice } from "@reduxjs/toolkit"

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    drawer: true,
    currPath: { id: "Sorting", title: "정렬", children: [] },
    paths: [
      {
        id: "Sorting",
        title: "정렬",
        children: [
          { id: "Selection", title: "선택", children: [] },
          { id: "Insertion", title: "삽입", children: [] },
          { id: "Bubble", title: "버블", children: [] },
          { id: "Merge", title: "합병", children: [] },
        ],
      },
      { id: "Searching", title: "검색", children: [] },
      { id: "Hash", title: "해쉬", children: [] },
      { id: "Graph", title: "그래프", children: [] },
      { id: "StringMatching", title: "문자열 검색", children: [] },
    ],
  },
  reducers: {
    openDrawer: (state) => {
      state.drawer = true
    },
    closeDrawer: (state) => {
      state.drawer = false
    },
    updateCurrPath: (state, action) => {
      state.currPath = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { openDrawer, closeDrawer, updateCurrPath } = mainSlice.actions

export default mainSlice.reducer
