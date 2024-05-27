import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: "perfilFormState",
    initialState: {
        formState: 0
    },
    reducers: {
        setFormState(state, {payload}){
            return {...state, formState: payload.stage}
        }
    }
})

export const {setFormState} = slice.actions
export default slice.reducer