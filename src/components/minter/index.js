import { useContext, useEffect, useState } from 'react'
import infoImage from './../../assets/3.jpeg'
import categoriesOpt from './../../abi/categories.json'
import { GlobalContext } from '../../context/GlobalContext';
import { ethers } from "ethers"; 
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CONFIG from './../../abi/config.json'
import ABI from './../../abi/abi.json'

const MySwal = withReactContent(Swal)


const Minter = () => {
    const {presale, price, presalePrice, account, web3Provider} = useContext(GlobalContext)
    const [mintAmount, setMintAmount] = useState(1)
    const [selectCategory, setSelCat] = useState(null)
    const [subCatOpt, setSubCatOpt] = useState(null)
    const [selSubCat, setSubCat] = useState(null)
    const [loading, setLoading] = useState(false)

    const mintCategory = [
        {
            label: 'Swimsuit',
            value: '0', 
            // price: 0.2, 
            // presale: 0.2
            price: ethers.utils.formatEther(price), 
            presale: ethers.utils.formatEther(presalePrice)
        }
        
    ];

    const increment = () => {
        if (mintAmount < 5) {
            setMintAmount(mintAmount + 1)
        }
    }

    const decrement = () => {
        if (mintAmount > 1) {
            setMintAmount(mintAmount - 1)
        }
    }

    const setMaxVal = () => {
        setMintAmount(5)
    }

    const onChangeHandler = (e) => {
        e.target.value !== "" ? setSelCat(mintCategory[e.target.value]) : setSelCat(null)
        e.target.value !== "" ? setSubCatOpt(categoriesOpt[e.target.value]) : setSubCatOpt(null)
        setSubCat(null)
    }

    const onChangeSubCat = (e) => {
        e.target.value !== "" ? setSubCat(e.target.value) : setSubCat(null)
    }

    const mint = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const _category = selectCategory
            const tokenId = selSubCat
            const nftPrice = presale ? _category.presale : _category.price;
            if(!account) {
                setLoading(false)
                MySwal.fire({
                    icon: 'error',
                    title: 'Please connect your wallet',
                    showConfirmButton: false,
                    timer: 1500
                })
                
                return
            }
            console.log(_category)
            console.log(account)
            console.log(tokenId)
            console.log(nftPrice)

            const signer = web3Provider.getSigner()
            const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, ABI, signer)
            const estimateGas = await contract.estimateGas.mint(tokenId, {value: ethers.utils.parseEther(nftPrice)})
            console.log(estimateGas.toString())
            const tx = {
                gasLimit: estimateGas.toString(),
                value: ethers.utils.parseEther(nftPrice)
            }

            const minttx = await contract.mint(tokenId, tx)
            await minttx.wait()
            setLoading(false)
            MySwal.fire({
                icon: 'success',
                text: "NFT minted successfully",
                showConfirmButton: false,
                timer: 1500
                
            })

        } catch(e) {
            console.log(e)
            MySwal.fire({
                icon: 'error',
                text: "Something went wrong",
                showConfirmButton: true,
                
            })
            setLoading(false)
        }

    }

  return (
    <div className="bg-black bg-opacity-50 rounded-lg p-8 text-white text-sm text-center">
        USERS MUST BE ON ETHEREUM MAINNET!
        <div className="minter-wrapper">
            <div className="minter-info mt-5 mb-8 border border-white p-3 rounded-xl flex items-center justify-between">
                <img src={infoImage} alt="" className='w-[82px] h-[82px] rounded-[10px]'/>
                <div>
                    <p className='text-right'>Price per NFT</p>
                    <h5 className='text-2xl'>{selectCategory ? (presale ? selectCategory.presale : selectCategory.price) : 0} ETH Each</h5>
                </div>
            </div>

            {/* <div className='p-3 mb-8 border border-white rounded-xl bg-white bg-opacity-20 flex items-center justify-between'>
                <div className='flex items-center justify-start space-x-4'>
                    <div className='cursor-pointer' onClick={decrement}>
                        <svg  className='w-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"/></svg>
                    </div>
                    <div>
                        <h5 className='text-[22px]'>{mintAmount}</h5>
                    </div>
                    <div className='cursor-pointer' onClick={increment}>
                        <svg className='w-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
                    </div>
                </div>
                <button className='uppercase bg-white py-[5px] px-[15px] text-black text-sm font-normal shadow-white shadow-[0_0_14px_2px_rgba(255,255,255,0.75)]' onClick={setMaxVal}>Set Max</button>
            </div> */}
            <form onSubmit={mint}>
            <div className='mb-8'>
                <select className='p-3 h-[50px] border border-white rounded-xl bg-white bg-opacity-20 w-full' onChange={onChangeHandler} required>
                    <option className='text-black' value="">Select Category</option>
                    {mintCategory.map((item, i) => (
                        <option key={i} className='text-black' value={i}>{item.label} mint : {presale ? item.presale : item.price} ETH</option>
                    ))}
                    
                </select>
            </div>

            <div className='mb-8'>
                <select className='p-3 h-[50px] border border-white rounded-xl bg-white bg-opacity-20 w-full' value={(selSubCat) ? selSubCat : ''} onChange={onChangeSubCat} required>
                    <option className='text-black' value="">Select Character</option>
                    {subCatOpt && subCatOpt.map((item, i) => (
                        <option key={i} className='text-black' value={item.value}>{item.label}</option>
                    ))}
                    
                </select>
            </div>

            <div className='p-3 mb-8 border border-white border-r-0 border-l-0 flex items-center justify-between'>
                <p className='text-xl my-2'>Total</p>
                <h5 className='text-xl font-semibold my-2'>{selectCategory ? (presale ? parseFloat(selectCategory.presale) * parseInt(mintAmount) : parseFloat(selectCategory.price) * parseInt(mintAmount)) : 0.0} ETH</h5>
            </div>

            <div className='mb-8'>
                {
                    loading ? (
                        <button disabled className='uppercase flex items-center justify-center mx-auto bg-white py-[5px] px-[15px] text-black text-xl font-semibold shadow-white shadow-[0_0_14px_2px_rgba(255,255,255,0.75)]'>
                            <svg className="animate-spin h-5 w-5 mr-2 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M222.7 32.15C227.7 49.08 218.1 66.9 201.1 71.94C121.8 95.55 64 169.1 64 255.1C64 362 149.1 447.1 256 447.1C362 447.1 448 362 448 255.1C448 169.1 390.2 95.55 310.9 71.94C293.9 66.9 284.3 49.08 289.3 32.15C294.4 15.21 312.2 5.562 329.1 10.6C434.9 42.07 512 139.1 512 255.1C512 397.4 397.4 511.1 256 511.1C114.6 511.1 0 397.4 0 255.1C0 139.1 77.15 42.07 182.9 10.6C199.8 5.562 217.6 15.21 222.7 32.15V32.15z" /></svg>
                            Minting
                        </button>
                    ) : (
                        <button disabled className='uppercase bg-white py-[5px] px-[15px] text-black text-xl font-semibold shadow-white shadow-[0_0_14px_2px_rgba(255,255,255,0.75)]' type="submit">Mint</button>
                    )
                }
                
            </div>
            </form>

            {/* <div className='helptxt'>
                <p className=''>ADD POLYGON NETWORK</p>
                <p className=''>🔔 Fast Method: Visit https://chainlist.org/ through metamask in-app browser or chrome extension and search Polygon. Click "Connect Wallet" on Polygon Mainnet and it will automatically add the network to your MetaMask.</p>
            </div> */}
        </div>

    </div>
  )
}

export default Minter