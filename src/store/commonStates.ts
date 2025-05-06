import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchVal: '',
    currentCoordinates: {
        lat: 0,
        lng: 0,
    },
    currentAddress: '',
    defaultAddressId: null,
}

const commonSlice = createSlice({
    name: 'commonState',
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.searchVal = action.payload
        },
        updateCurrentLocation: (state, action) => { // user click on search location on header
            state.currentCoordinates.lat = action.payload.lat
            state.currentCoordinates.lng = action.payload.lng
            state.currentAddress = action.payload.address
            state.defaultAddressId = action.payload.defaultAddressId || null
        },
        updateDefaultAddressId: (state, action) => {
            state.defaultAddressId = action.payload // Update the default address ID when user make a address primary
        },
    },
})

export default commonSlice.reducer
export const { updateSearch, updateCurrentLocation, updateDefaultAddressId } = commonSlice.actions;