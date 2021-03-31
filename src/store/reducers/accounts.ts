import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = Array<{
  accessToken: string
}>

const addAccount: CaseReducer<State, PayloadAction<string>> = (
  state,
  action
) => {
  const { accessToken }: { accessToken: string } = action.payload
  state.push({ accessToken })
}

const accountsSlice = createSlice({
  name: 'accountsSlice',
  initialState: [],
  reducers: {
    addAccount: (state, action) => {
      const { accessToken }: { accessToken: string } = action.payload
      state.push({ accessToken })
    },
    removeAccount: (state, action) => {
      state = state.filter((accessToken) => accessToken !== action.payload)
    }
  }
})

export const addAccount

export default accountsSlice.reducer
