import HeaderComponent from "./components/header";
import Minter from "./components/minter";
import Countdown, { zeroPad } from "react-countdown";
import AlertBox from './components/AlertBox'
import { useState } from "react";
import { useBlockChainData } from "./hooks/loadBlockchainData";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const mintDate = new Date("2022-08-15T00:00:00");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [dataLoading, setDataLoading] = useState(false)
  useBlockChainData(setDataLoading)

  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className="flex items-center justify-center">
      <div className="bg-black bg-opacity-40 rounded-lg m-[10px] min-w-[70px] md:min-w-[100px] py-5 text-center border border-white">
        <div className="text-white text-[2rem] mb-[10px]">{zeroPad(days)}</div>
        <div className="uppercase text-white">Days</div>
      </div>
      <div className="bg-black bg-opacity-40 rounded-lg m-[10px] min-w-[70px] md:min-w-[100px] py-5 text-center border border-white">
        <div className="text-white text-[2rem] mb-[10px]">{zeroPad(hours)}</div>
        <div className="uppercase text-white">Hours</div>
      </div>
      <div className="bg-black bg-opacity-40 rounded-lg m-[10px] min-w-[70px] md:min-w-[100px] py-5 text-center border border-white">
        <div className="text-white text-[2rem] mb-[10px]">{zeroPad(minutes)}</div>
        <div className="uppercase text-white">Mins</div>
      </div>
      <div className="bg-black bg-opacity-40 rounded-lg m-[10px] min-w-[70px] md:min-w-[100px] py-5 text-center border border-white">
        <div className="text-white text-[2rem] mb-[10px]">{zeroPad(seconds)}</div>
        <div className="uppercase text-white">Secs</div>
      </div>

    </div>
  );

  return (
    <div className="bg-bg-image min-h-screen bg-no-repeat bg-cover bg-center font-saira">
      <LoadingScreen dataLoading={dataLoading} />
      <div className="container max-w-[1080px] mx-auto">
        <HeaderComponent setError={setError} setErrMsg={setErrMsg} />
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full  md:w-1/2 mb-11 md:mb-0">
            <p className="text-white text-center font-semibold text-lg">Minting will Open in:</p>
            <Countdown
              date={Date.now() + mintDate.getTime() - new Date().getTime()}
              renderer={renderer}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Minter />
          </div>
        </div>
      </div>
      {error && (<AlertBox msg={errMsg} setError={setError} setErrMsg={setErrMsg} />)}
    </div>
  );
}

export default App;
