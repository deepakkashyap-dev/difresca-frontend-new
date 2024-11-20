import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchVal: '',
}

const commonSlice = createSlice({
    name: 'commonState',
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.searchVal = action.payload
        },
    },
})

export default commonSlice.reducer
export const { updateSearch } = commonSlice.actions;