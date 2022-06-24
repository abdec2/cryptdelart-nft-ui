import { useState } from 'react'
import infoImage from './../../assets/bg.jpg'

const mintCategory = [
    {
        label: 'Swimsuit',
        value: '0', 
        price: '600'
    },
    {
        label: 'Sleepwear',
        value: '1', 
        price: '1000'
    },
    {
        label: 'Sports wear',
        value: '2', 
        price: '1500'
    },
    {
        label: 'Casual Style',
        value: '3', 
        price: '3000'
    },
    {
        label: 'Elegant Style',
        value: '4', 
        price: '10000'
    },
    {
        label: 'Exotic Style',
        value: '5', 
        price: '100000'
    }
    
];

const Minter = () => {
    const [mintAmount, setMintAmount] = useState(1)
    const [selectCategory, setSelCat] = useState(null)

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
    }

  return (
    <div className="bg-black bg-opacity-50 rounded-lg p-8 text-white text-sm text-center">
        USERS MUST BE ON POLYGON MAINNET AND NOT ETHEREUM !
        <div className="minter-wrapper">
            <div className="minter-info mt-5 mb-8 border border-white p-3 rounded-xl flex items-center justify-between">
                <img src={infoImage} alt="" className='w-[82px] h-[82px] rounded-[10px]'/>
                <div>
                    <p className='text-right'>Price per NFT</p>
                    <h5 className='text-2xl'>{selectCategory ? selectCategory.price : 0} MATIC Each</h5>
                </div>
            </div>

            <div className='p-3 mb-8 border border-white rounded-xl bg-white bg-opacity-20 flex items-center justify-between'>
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
            </div>

            <div className='mb-8'>
                <select className='p-3 h-[50px] border border-white rounded-xl bg-white bg-opacity-20 w-full' onChange={onChangeHandler}>
                    <option className='text-black' value="">Select Category</option>
                    {mintCategory.map((item, i) => (
                        <option key={i} className='text-black' value={i}>{item.label} mint : {item.price} matic</option>
                    ))}
                    
                </select>
            </div>

            <div className='p-3 mb-8 border border-white border-r-0 border-l-0 flex items-center justify-between'>
                <p className='text-xl my-2'>Total</p>
                <h5 className='text-xl font-semibold my-2'>{selectCategory ? parseFloat(selectCategory.price) * parseInt(mintAmount) : 0.0} MATIC</h5>
            </div>

            <div className='mb-8'>
                <button className='uppercase bg-white py-[5px] px-[15px] text-black text-xl font-semibold shadow-white shadow-[0_0_14px_2px_rgba(255,255,255,0.75)]'>Mint</button>
            </div>

            <div className='helptxt'>
                <p className=''>ADD POLYGON NETWORK</p>
                <p className=''>🔔 Fast Method: Visit https://chainlist.org/ through metamask in-app browser or chrome extension and search Polygon. Click "Connect Wallet" on Polygon Mainnet and it will automatically add the network to your MetaMask.</p>
            </div>
        </div>

    </div>
  )
}

export default Minter