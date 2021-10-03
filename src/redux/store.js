import { configureStore } from "@reduxjs/toolkit"
import sortingReducer from "../components/sorting/sortingSlice"
import mainReducer from "../mainSlice"

export default configureStore({
  reducer: {
    main: mainReducer,
    sorting: sortingReducer,
  },
})
