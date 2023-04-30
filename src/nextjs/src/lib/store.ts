import { configureStore, createStore, combineReducers, AnyAction, Store } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE, MakeStore, Context } from 'next-redux-wrapper'
// import type { MakeStore } from 'next-redux-wrapper'
import { useDispatch } from "react-redux";
import { authSlice, AuthSliceState } from './slices/auth'
import { searchSlice, SearchSliceState } from './slices/search'
import { commonSlice, CommonSliceState } from './slices/common'

const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
  searchReducer: searchSlice.reducer,
  commonReducer: commonSlice.reducer
})
export type OurStore = ReturnType<typeof combinedReducers>

const rootReducer = (state: OurStore, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const store = configureStore<OurStore>({
  reducer: combinedReducers,
})
// const makeStore: MakeStore = () => store
const makeStore = (context: Context) => store;

// export const wrapper = createWrapper(makeStore, { debug: 'key' })
export const wrapper = createWrapper<Store>(makeStore)
// export const wrapper = createWrapper<Store<State>>(makeStore, {debug: true});

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export interface RootState {
  commonReducer: CommonSliceState,
  searchReducer: SearchSliceState,
  authReducer: AuthSliceState
}