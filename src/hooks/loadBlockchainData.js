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
        const price0 = await contract.costs(0)
        const price1 = await contract.costs(1)
        const price2 = await contract.costs(2)
        const price3 = await contract.costs(3)
        const price4 = await contract.costs(4)
        const price5 = await contract.costs(5)
        const presale_price0 = await contract.presaleCost(0)
        const presale_price1 = await contract.presaleCost(1)
        const presale_price2 = await contract.presaleCost(2)
        const presale_price3 = await contract.presaleCost(3)
        const presale_price4 = await contract.presaleCost(4)
        const presale_price5 = await contract.presaleCost(5)
        updatePresale(presale)
        updatePrice({
            "0" : price0,
            "1" : price1,
            "2" : price2,
            "3" : price3,
            "4" : price4,
            "5" : price5
        })
        updatePresalePrice({
            "0" : presale_price0,
            "1" : presale_price1,
            "2" : presale_price2,
            "3" : presale_price3,
            "4" : presale_price4,
            "5" : presale_price5
        })

        setDataLoading(false)
    }
    useEffect(() => {
        loadData()

    }, [])
}
