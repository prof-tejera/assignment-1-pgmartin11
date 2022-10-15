import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/generic/HMSBtn";
import SetterButtons from "../../components/generic/SetterButtons";
import { incrementHelper, decrementHelper, calcHMS } from "../../utils/helpers";


const Stopwatch = () => {
  const [countHrs, setCountHrs] = useState(0);
  const [countMins, setCountMins] = useState(0);
  const [countSecs, setCountSecs] = useState(0);

  const [count, setCount] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [isStopped, setStopped] = useState(true);


  useEffect(() => {
    let t;

    if ((count < endVal) && !isPaused && !isStopped) {
      t = setTimeout(() => {
        setCount(count+1);
      }, 1000)
    }

    return () => { if (t) { clearTimeout(t); } }
  }, [count, isPaused, isStopped]);

  const startVal = 0,
  	    endVal = countHrs * 60 * 60 + countMins * 60 + countSecs;

  const { timerHrs, timerMins, timerSecs } = calcHMS(count);

  const setterBtnData = {
    	hoursLabel: 'Hours',
    	minutesLabel: 'Minutes',
    	secondsLabel: 'Seconds',
    	countHrs,
    	countMins,
    	countSecs,
    	setCountHrs,
    	setCountMins,
    	setCountSecs
  };

  return (
    <div className="main-panel">
		<div className="display">{timerHrs}:{timerMins}:{timerSecs}</div>

		{isStopped
		  ? <TimerBtn label="Start" handler={() => { 
			setCount(startVal); 
			setStopped(false); 
			setPaused(false); }}
		/>
		  : <TimerBtn label="Stop" handler={() => setStopped(true)} />
		}

		<TimerBtn label="Pause" handler={() => setPaused(!isPaused)}/>
		<br />
		<TimerBtn label="Reset" handler={() => { setCount(startVal); setStopped(true); }}/>
		<TimerBtn label="Fast Forward" handler={() => { if(!isStopped) { setCount(endVal); setStopped(true)}}}/>
		<br />
 		<br />
		<SetterButtons {...setterBtnData} />
    </div>
  );
}

export default Stopwatch;
