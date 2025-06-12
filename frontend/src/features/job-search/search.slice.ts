import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  keyword: string,
  location: string
}

const initialState: SearchState = {
  keyword: "",
  location: ""
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload
    },
    setLocation: (state, action) => {
      state.location = action.payload
    },
    clearSearch: (state, action) => {
      state = initialState
    }
  },
  extraReducers: (builder) => {}
})

export const {setLocation, setKeyword, clearSearch} = searchSlice.actions
export default searchSlice.reducer
