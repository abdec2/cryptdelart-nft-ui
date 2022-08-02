import { ethers } from "ethers";
import { createContext, useReducer } from "react";
import CONFIG from "../abi/config";
import { AppReducer } from './AppReducer'

const initialState = {
    account: null,
    web3Provider: null,
    presale: true,
    price: 600, 
    presalePrice: 480
    
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

    const updatePresale = (presale) => {
        dispatch({
            type: 'UPDATE_PRESALE',
            payload: presale
        })
    }

    const updatePrice = (price) => {
        dispatch({
            type: 'UPDATE_PRICE', 
            payload: price
        })
    } 

    const updatePresalePrice = (price) => {
        dispatch({
            type: 'UPDATE_PRESALE_PRICE', 
            payload: price
        })
    } 


    return (
        <GlobalContext.Provider value={
            {
                ...state,
                updateAccount,
                updateWeb3Provider,
                updatePresale,
                updatePrice,
                updatePresalePrice
                
            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}