import { configureStore } from '@reduxjs/toolkit'
import { appReducer, userReducer } from '@/store/slices'
import { ensApi } from '@/services/ens'

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    [ensApi.reducerPath]: ensApi.reducer,
  },
  middleware: gDM => gDM({ serializableCheck: true }).concat(ensApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
