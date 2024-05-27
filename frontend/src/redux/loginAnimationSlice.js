import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'animationLoginState',
    initialState: {
        animationState: 0,
        formStage: 0
    },
    reducers: {
        nextAnimation(state){
            return {...state, animationState: state.animationState + 1}
        },

        backAnimation(state){
            return {...state, animationState: state.animationState - 1}
        },

        setAnimation(state, {payload}){
            return {...state, animationState: payload}
        },

        nextForm(state){
            return {...state, formStage: state.formStage + 1}
        },

        backForm(state){
            return {...state, formStage: state.formStage - 1}
        },

    }
})

export const {nextAnimation, backAnimation, nextForm, backForm, setAnimation} = slice.actions

export default slice.reducer