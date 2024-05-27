import { configureStore } from '@reduxjs/toolkit'
import animationReducer from './loginAnimationSlice.js'
import perfilFormStateSlice from './perfilFormStateSlice.js'

export default configureStore({
    reducer: {
        loginAnimation: animationReducer,
        perfilState: perfilFormStateSlice
    },
})