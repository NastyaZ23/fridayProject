import {ActionsType} from "./app-reducer";
import {Dispatch} from "redux";



let initialState = {}
type InitialStateType = typeof initialState


export const decksReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {

        default:
            return state
    }
}


