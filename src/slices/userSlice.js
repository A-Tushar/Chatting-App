import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const userSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    logeduser: (state,action) => {
        state.value = action.payload;
    }
  }
})

export const { logeduser } = userSlice.actions

export default userSlice.reducer