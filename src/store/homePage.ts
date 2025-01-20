import { createSlice } from '@reduxjs/toolkit';
import { getHomepageBlock, fetchCategoryData  } from '../utils/Api/AppService/dashboardApi';
const homepageSlice = createSlice({
    name: 'homepage',
    initialState: {
        homepageData: null,
        homepageLoading: false,
        homepageError: null as unknown | null,
        categoryData: null,
        subCategoryData: [],
        categoryLoading: false,
        categoryError: null as unknown | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Homepage Data
            .addCase(getHomepageBlock.pending, (state) => {
                state.homepageLoading = true;
                state.homepageError = null;
            })
            .addCase(getHomepageBlock.fulfilled, (state, action) => {
                state.homepageLoading = false;
                state.homepageData = action.payload;
            })
            .addCase(getHomepageBlock.rejected, (state, action) => {
                state.homepageLoading = false;
                state.homepageError = action.payload;
            })
            // Fetch Category Data
            .addCase(fetchCategoryData.pending, (state) => {
                state.categoryLoading = true;
                state.categoryError = null;
            })
            .addCase(fetchCategoryData.fulfilled, (state, action) => {
                state.categoryLoading = false;
                state.categoryData = action.payload;
                state.subCategoryData = action.payload.map((category: any) => {
                    return category.subcategories;
                }).flat();
            })
            .addCase(fetchCategoryData.rejected, (state, action) => {
                state.categoryLoading = false;
                state.categoryError = action.payload;
            });
    },
});


export default homepageSlice.reducer;