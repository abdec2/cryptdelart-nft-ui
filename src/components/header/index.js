import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from 'ethers';
import CONFIG from './../../abi/config.json'
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        80001: process.env.REACT_APP_ALCHEMY_URI
      }
    }
  }
};

const HeaderComponent = ({ setError, setErrMsg }) => {
  const { account, web3Provider, updateAccount, updateWeb3Provider } = useContext(GlobalContext)


  const connectWallet = async () => {
    try {
      const web3modal = new Web3Modal({
        providerOptions
      });
      const instance = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      updateWeb3Provider(provider)
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      updateAccount(address);
      const network = await provider.getNetwork();
      console.log(network)
      if (network.chainId !== CONFIG.NETWORK_ID) {
        setError(true)
        setErrMsg(`Contract is not deployed on current network. please choose ${CONFIG.NETWORK}`)
      } else {
        setError(false)
        setErrMsg('')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const disconnect = () => {
    updateAccount(null)
    updateWeb3Provider(null)
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        connectWallet()
      })
      window.ethereum.on('chainChanged', chainId => {
        window.location.reload();
      })
    }
  }, [account])

  return (
    <div className="header p-6">
      <div className=" text-white flex flex-row items-center justify-end truncate space-x-2">
        <div className="w-full md:w-1/2 flex flex-row items-center justify-around truncate space-x-2">
          <div className="text-center px-4 truncate">
            <h3 className="font-medium text-xl">Supply</h3>
            <p className="text-lg">4100</p>
          </div>

          <div className=''>
            {account ? (
              <button className='uppercase bg-white py-[5px] px-[15px] text-black text-xl font-semibold shadow-white shadow-[0_0_14px_2px_rgba(255,255,255,0.75)]' onClick={disconnect}>{account.slice(0, 5) + '...' + account.slice(38, 42)}</button>
            ) : (
              <button className='uppercase bg-white py-[5px] px-[15px] text-black text-xl font-semibold shadow-white shadow-[0_0_14px_2px_rgba(255,255,255,0.75)]' onClick={connectWallet}>Connect Wallet</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent