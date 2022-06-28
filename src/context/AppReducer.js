export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_ACCOUNT':
            return {
                ...state,
                account: action.payload
            }

        case 'UPDATE_PROVIDER':
            return {
                ...state,
                web3Provider: action.payload
            }
        default:
            return state;
    };
}