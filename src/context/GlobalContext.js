import { ethers } from "ethers";
import { createContext, useReducer } from "react";
import CONFIG from "../abi/config";
import { AppReducer } from './AppReducer'

const initialState = {
    account: null,
    web3Provider: null,
    presale: true,
    price: {
        "0" : 600,
        "1" : 1000,
        "2" : 1500,
        "3" : 3000,
        "4" : 10000,
        "5" : 100000
    }, 
    presalePrice: {
        "0" : 480,
        "1" : 800,
        "2" : 1200,
        "3" : 2400,
        "4" : 8000,
        "5" : 80000
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