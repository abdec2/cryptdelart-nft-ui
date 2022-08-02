import { ethers } from "ethers";
import { useContext, useEffect } from "react"
import CONFIG from "../abi/config.json";
import { GlobalContext } from "../context/GlobalContext"
import Abi from '../abi/abi.json'

export const useBlockChainData = (setDataLoading) => {
    const { updatePresale, updatePrice, updatePresalePrice } = useContext(GlobalContext)

    const loadData = async () => {
        setDataLoading(true)
        const provider = ethers.getDefaultProvider(process.env.REACT_APP_ALCHEMY_URI, {
            alchemy: process.env.REACT_APP_ALCHEMY_KEY
        });
        const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, Abi, provider)
        const presale = await contract.presale()
        const price = await contract.cost()
        const presale_price = await contract.presaleCost()
        
        updatePresale(presale)
        updatePrice(price)
        updatePresalePrice(presale_price)

        setDataLoading(false)
    }
    useEffect(() => {
        loadData()

    }, [])
}
