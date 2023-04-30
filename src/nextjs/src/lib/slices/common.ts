import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'

export type CommonSliceState = {
    render: boolean
}

const internalInitialState: CommonSliceState = {
    render: false
}

export const commonSlice = createSlice({
    name: 'common',
    initialState: internalInitialState,
    reducers: {
        updateRender(state: CommonSliceState, action: PayloadAction<{ isRender: boolean }>) {
            state.render = action.payload.isRender
        }
    }
})

export const { updateRender } = commonSlice.actions