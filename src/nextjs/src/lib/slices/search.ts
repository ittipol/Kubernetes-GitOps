import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
// import _axios from 'axios'
import { axiosApiClientDirect } from '../axios'
import { AxiosError, AxiosResponse } from 'axios'
import { RootState } from '../store'

export enum OrderByEnum {
    POST_DATE_ASC = "post-date-asc",
    POST_DATE_DESC = "post-date-desc",
    PRICE_ASC = "price-asc",
    PRICE_DESC = "price-desc",
}

export type searchTermType = {
    keyword: string,
    category: number[], // C# List<int>
    orderBy: string
}

const searchTermInit: searchTermType = {
    keyword: '',
    category: [],
    orderBy: OrderByEnum.POST_DATE_DESC
}

export interface SearchSliceState {
    itemList: any[],
    isLoading: boolean,
    currentPage: number,
    searchTerm: searchTermType
  }

const internalInitialState: SearchSliceState = {    
    itemList: [],
    isLoading: false,
    currentPage: 1,
    searchTerm: searchTermInit
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: internalInitialState,
    reducers: {
      reset: () => internalInitialState,
    },
    extraReducers: (builder) => {
        builder.addCase(loadData.pending, (state) => {
            // state.loading = AuthStates.LOADING // don't use return => immutable
            return {...state, isLoading: true}
        }),
        builder.addCase(loadData.fulfilled, (state, action) => {

            if(action.payload.itemList.length > 0) {
              return {
                ...state, 
                isLoading: false,
                itemList: action.payload.itemList,
                currentPage: action.payload.page
              }
            }

            return {
              ...state, 
              isLoading: false
            }

            
        }),
        builder.addCase(loadData.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(searchData.pending, (state) => {
            // state.loading = AuthStates.LOADING // don't use return
            return {...state, isLoading: true}
        }),
        builder.addCase(searchData.fulfilled, (state, action) => {
            return {
                ...state, 
                isLoading: false,
                itemList: action.payload.itemList,
                searchTerm: action.payload.searchTerm,
                currentPage: action.payload.page
            }
        }),
        builder.addCase(searchData.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export const loadData = createAsyncThunk(
    'load/data',
    async (credentials: { page: number }, thunkAPI: any) => {
      try {

        const searchTerm = thunkAPI.getState().searchReducer.searchTerm

        const params = {
            page: credentials.page,   
            keyword: searchTerm.keyword,
            category: JSON.stringify(searchTerm.category),
            order: searchTerm.orderBy
        }

        const response = await axiosApiClientDirect.get('items/list', {
            params: params
        })           
  
        return { 
          itemList: response.data,
          page: credentials.page
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(parseError(error as AxiosError))
      }
    }
  )

export const searchData = createAsyncThunk(
    'search/data',
    async (credentials: { page: number, searchTerm: searchTermType }, thunkAPI) => {
      try {

        const params = {
            page: credentials.page,   
            keyword: credentials.searchTerm.keyword,
            category: JSON.stringify(credentials.searchTerm.category),
            order: credentials.searchTerm.orderBy
        }

        const response = await axiosApiClientDirect.get('items/list', {
            params: params
        })            
  
        return { 
          itemList: response.data,
          searchTerm: credentials.searchTerm,
          page: credentials.page
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(parseError(error as AxiosError))
      }
    }
)

const parseError = (error:AxiosError) => {

  if (error instanceof AxiosError) {    
    const errorRes = error.response as AxiosResponse

    return { 
      error: error.message,
      status: errorRes.status
    }
  }

  return {
      error: '',
      status: 500
  }

}

export const SearchStoreSelector = (state: RootState) => state.searchReducer