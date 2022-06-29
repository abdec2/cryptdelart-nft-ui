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
        
        case 'UPDATE_PRESALE':
            return {
                ...state,
                presale: action.payload
            }
        case 'UPDATE_PRICE':
            return {
                ...state,
                price: action.payload
            }
        case 'UPDATE_PRESALE_PRICE':
            return {
                ...state,
                presalePrice: action.payload
            }
        default:
            return state;
    };
}