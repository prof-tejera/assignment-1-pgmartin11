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

    if (!isPaused && !isStopped) {
	    if (count < endVal) {
	      t = setTimeout(() => {
	        setCount(count+1);
	      }, 1000)
	    }

	    if (count == endVal) {
	    	setStopped(true);
    	}
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

  const pauseLabel = isPaused ? "Resume" : "Pause"; 

  return (
    <div className="main-panel">
 		<div className="display"><span className="time-category">Count:</span>{timerHrs}:{timerMins}:{timerSecs}</div>
    	<div className="control-btn-wrapper">
			{isStopped &&
			    <TimerBtn label="Start" handler={() => { 
				    setCount(startVal); 
				    setStopped(false); 
				    setPaused(false); }}
			    />
			}
			{!isStopped && <TimerBtn label={pauseLabel} handler={() => setPaused(!isPaused)}/>}
			<TimerBtn disabled={isStopped} label="Reset" handler={() => { setCount(startVal); setStopped(true); }}/>
			<TimerBtn disabled={isStopped} label="Fast Forward" handler={() => { if(!isStopped) { setCount(endVal); setStopped(true); }}}/>
		</div>
		{isStopped && <SetterButtons {...setterBtnData} />}
    </div>
  );
}

export default Stopwatch;
