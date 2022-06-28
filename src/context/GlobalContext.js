import { ethers } from "ethers";
import { createContext, useReducer } from "react";
import CONFIG from "../abi/config";
import { AppReducer } from './AppReducer'

const initialState = {
    account: null,
    web3Provider: null,
    blockChainData: {
        
    }
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    const updateAccount = (account) => {
        dispatch({
            type: 'UPDATE_ACCOUNT',
            payload: account
        })
    }
    const updateWeb3Provider = (provider) => {
        dispatch({
            type: 'UPDATE_PROVIDER',
            payload: provider
        })
    }


    return (
        <GlobalContext.Provider value={
            {
                ...state,
                updateAccount,
                updateWeb3Provider
                
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}