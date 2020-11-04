export const initialState = {
    avatar: ''
}

export const UserReducer = (state, action) => {

        switch(action.type) {
            
            case 'setAvartar':
                return {...state, avatar: action.payload.avatar}
            break
            default:
                return state
        }
}