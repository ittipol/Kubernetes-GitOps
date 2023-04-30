import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import axios from '../axios'
import _axios, { AxiosError, AxiosResponse } from 'axios'

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

const EXPIRE_TIME = 900

type responseErrorType = {
  message: string,
  status: number
}

type MeType = {
  id: number,
  name: string
  email: string
}

export interface AuthSliceState {
  accessToken: string
  loading: AuthStates
  me: MeType
  error?: responseErrorType
  isAuth: boolean
  expire: number | null
}

export const fetchUser = createAsyncThunk(
  'auth/me'
  , async (_, thunkAPI) => {
  try {
    const response = await axios.get<MeType>('/api/me')       
    return response.data
  } catch (error) {    
    return thunkAPI.rejectWithValue(parseError(error as AxiosError))
  }
})

export const refreshToken = createAsyncThunk(
  'auth/refreshToken', 
  async (_, thunkAPI) => {
    try {

      console.log('auth/refreshToken   ====>   Calling API')

      const response = await _axios.get<{ accessToken: string }>('/api/refreshToken')

      return { 
        accessToken: response.data.accessToken
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(parseError(error as AxiosError))
    }
})

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { emailAddress: string, password: string }, thunkAPI) => {
    try {
      const response = await _axios.post<{ accessToken: string }>('/api/login', credentials)          
      const refetch = await axios.get<MeType>('/api/me', {
        headers: { Authorization: `Bearer ${response.data.accessToken}` },
      })
      
      return { 
        accessToken: response.data.accessToken, 
        me: refetch.data
      }
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message })
      return thunkAPI.rejectWithValue(parseError(error as AxiosError))
    }
  }
)
// export const register = createAsyncThunk(
//   'auth/register',
//   async (credentials: { email: string, password: string, name: string }, thunkAPI) => {
//     try {
//       const response = await axios.post<{ accessToken: string }>('/api/register', credentials)
//       const refetch = await axios.get<{ name: string }>('/api/me', {
//         headers: { Authorization: `Bearer ${response.data.accessToken}` },
//       })
//       return { accessToken: response.data.accessToken, me: { name: refetch.data.name } }
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message })
//     }
//   }
// )

export const logout = createAsyncThunk(
  'auth/logout', 
  async (_, thunkAPI) => {
    try {
      const response = await _axios.delete<{ accessToken: string }>('/api/logout')
      return response.data
    } catch (error) {
      // return thunkAPI.rejectWithValue({ error: error.message })
      return thunkAPI.rejectWithValue(parseError(error as AxiosError))
    }
  }
)

const internalInitialState: AuthSliceState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  me: {
    id: 0,
    name: '',
    email: ''
  },
  error: {
    message: '',
    status: 0
  },
  isAuth: false,
  expire: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state: AuthSliceState, action: PayloadAction<{ token: string }>) {
      state.accessToken = action.payload.token
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state: AuthSliceState, action: PayloadAction<{ accessToken: string, me:MeType,  }>) => {
      state.accessToken = action.payload.accessToken
      state.me = action.payload.me
      state.isAuth = true
      state.loading = AuthStates.IDLE
      state.expire = Math.floor(Date.now() / 1000) - EXPIRE_TIME
    }),
    builder.addCase(login.rejected, (state, action) => {
      // state = { ...internalInitialState, isAuth: false , error: action.error }
      state.isAuth = false
      throw new Error(action.error.message)
    }),
    builder.addCase(logout.pending, (state) => {
      // state.loading = AuthStates.LOADING
    }),
    // builder.addCase(logout.fulfilled, (_state) => internalInitialState)
    builder.addCase(logout.fulfilled, (state) => {
      // state.accessToken = ''
      // state.me = null
      // state.isAuth = false
      // state.loading = AuthStates.IDLE
      // state.expire = null
      return internalInitialState
    })
    builder.addCase(login.pending, (state: AuthSliceState) => {      
      state.loading = AuthStates.LOADING
    }),
    // builder.addCase(register.fulfilled, (state, action) => {
    //   state.accessToken = action.payload.accessToken
    //   state.me = action.payload.me
    //   state.loading = AuthStates.IDLE
    // }),
    // builder.addCase(register.rejected, (state, action) => {
    //   state.error = action.error
    // }),
    builder.addCase(fetchUser.rejected, (state: AuthSliceState, action: any) => {

      state.error = {
        message: action.payload.error,
        status: action.payload.status,
      }

      // state = { ...internalInitialState, error: action.payload }
      // throw new Error(action.error.message)
    }),
    builder.addCase(fetchUser.fulfilled, (state: AuthSliceState, action) => {
      state.me = action.payload
    }),
    builder.addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
        state.isAuth = true
        state.loading = AuthStates.IDLE
        state.expire = Math.floor(Date.now() / 1000) - EXPIRE_TIME
    }),
    builder.addCase(refreshToken.rejected, (state: AuthSliceState, action) => {
      // state = { ...internalInitialState, isAuth: false, error: action.error }
      state.isAuth = false
      throw new Error(action.error.message)
    })
  },
})

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

export const { updateAccessToken, reset } = authSlice.actions
