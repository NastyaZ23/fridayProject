let initialState
type InitialStateType = typeof initialState
type ActionsType=ReturnType<typeof AC>

export const passwordRecoveryReducer=(state:InitialStateType,action:ActionsType)=>{
    switch (action.type){

        default:
            return state
    }
}

export const AC = () =>
    ({type: ''} as const)