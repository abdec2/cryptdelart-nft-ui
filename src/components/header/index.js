import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "INFURA_ID" // required
    }
  }
};

const HeaderComponent = () => {
  return (
    <div className="header p-6">
        <div className=" text-white flex flex-row items-center justify-end truncate space-x-2">
            <div className="w-full md:w-1/2 flex flex-row items-center justify-around truncate space-x-2">
                <div className="text-center px-4 truncate">
                    <h3 className="font-medium text-xl">Supply</h3>
                    <p className="text-lg">4100</p>
                </div>
               
                <div className=''>
                    <button className='uppercase bg-white py-[5px] px-[15px] text-black text-xl font-semibold shadow-white shadow-[0_0_14px_2px_rgba(255,255,255,0.75)]'>Connect Wallet</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderComponent