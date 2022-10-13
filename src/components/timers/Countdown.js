import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/generic/HMSBtn";
import { incrementHelper, decrementHelper, calcHMS } from "../../utils/helpers";


const Countdown = () => {
  const [countHrs, setCountHrs] = useState(0);
  const [countMins, setCountMins] = useState(0);
  const [countSecs, setCountSecs] = useState(0);

  const [count, setCount] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [isStopped, setStopped] = useState(true);

  useEffect(() => {
    let t;

    if ((count > 0) && !isPaused && !isStopped) {
      t = setTimeout(() => {
        setCount(count-1);
      }, 1000)
    }

    return () => { if(t) { clearTimeout(t); }}
  }, [count, isPaused, isStopped]);

  const startVal = countHrs * 60 * 60 + countMins * 60 + countSecs;
  const endVal = 0;

  const { timerHrs, timerMins, timerSecs } = calcHMS(count);

  return (
    <div className="main-panel">
		<div className="display">{timerHrs}:{timerMins}:{timerSecs}</div>
		<TimerBtn label="Start" handler={() => { 
			setCount(startVal); 
			setStopped(false); 
			setPaused(false); }}
		/>
		<TimerBtn label="Stop" handler={() => setStopped(true) }/>
		<TimerBtn label="Pause" handler={() => setPaused(!isPaused) }/><br/>
		<TimerBtn label="Reset" handler={() => { setCount(startVal); setStopped(true) }}/>
		<TimerBtn label="Fast Forward" handler={() => { if(!isStopped) { setCount(endVal); }}}/>
	    <br />
		<br />
		Hours: <DecrementBtn handler={() => { setCountHrs(decrementHelper(countHrs)); }}/>
		{countHrs}
		<IncrementBtn handler={() => { setCountHrs(incrementHelper(countHrs)); }}/> 
		<br/>
		Minutes: <DecrementBtn handler={() => { setCountMins(decrementHelper(countMins)); }}/>
		{countMins}
		<IncrementBtn handler={() => { setCountMins(incrementHelper(countMins, 59)); }}/> 
		<br/>
		Seconds: <DecrementBtn handler={() => { setCountSecs(decrementHelper(countSecs)); }}/>
		{countSecs}
		<IncrementBtn handler={() => { setCountSecs(incrementHelper(countSecs, 59)); }}/>
    </div>
  );
}

export default Countdown;
