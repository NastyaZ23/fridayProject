import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkAction } from 'redux-thunk';

import {appReducer} from "./reducers/app-reducer";
import {loginReducer} from "./reducers/login-reducer";
import {registrationReducer} from "./reducers/registration-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import {passwordRecoveryReducer} from "./reducers/passwordRecovery-reducer";
import {packsReducer} from "./reducers/packs-reducer";
import {cardsReducer} from "./reducers/cards-reducer";
import {ActionsType} from "./reducers/AC types/types";
import {modalReducer} from "./reducers/modal-reducer";


export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registrationReducer,
    profile: profileReducer,
    passRecovery:passwordRecoveryReducer,
    packs:packsReducer,
    cards:cardsReducer,
    modals:modalReducer,

});
export let store = createStore(rootReducer, applyMiddleware(thunk));
export type RootReducerType = ReturnType<typeof rootReducer>;
/*export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, any>*/
export type ThunkType = ThunkAction<void, RootReducerType, unknown, ActionsType>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store=store