import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/generic/HMSBtn";
import { incrementHelper, decrementHelper, calcHMS } from "../../utils/helpers";


const XY = () => {
  const [countHrs, setCountHrs] = useState(0);
  const [countMins, setCountMins] = useState(0);
  const [countSecs, setCountSecs] = useState(0);
  const [countRounds, setCountRounds] = useState(0);

  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [isStopped, setStopped] = useState(true);

  // useRef ??
  //let startRoundVal = roundVal;

  const startVal = countHrs * 60 * 60 + countMins * 60 + countSecs;

  useEffect(() => {
    let t;

    if (!isPaused && !isStopped) {
      if (count > 0) {
        t = setTimeout(() => {
          setCount(count-1);
        }, 1000)
      }

      if ((round-1 > 0) && count == 0) {
        t = setTimeout(() => {
          setRound(round-1);
          setCount(startVal);
        }, 1000)
      }
    }

    return () => { if (t) { clearTimeout(t); } }
  }, [round, count, isPaused, isStopped]);

    const { timerHrs, timerMins, timerSecs } = calcHMS(count);

	return (
		<div className="main-panel">
			<div className="display">Counter: {count}</div>
			<div className="display">{timerHrs}:{timerMins}:{timerSecs}</div>
			<div className="display">Round: {round}</div>
			<TimerBtn label="Start" handler={() => { 
				setCount(startVal); 
				setRound(countRounds); 
				setStopped(false); 
				setPaused(false); }}
			/>
			<TimerBtn label="Stop" handler={() => { setStopped(true); }}/>
			<TimerBtn label="Pause" handler={() => { setPaused(!isPaused); }}/><br/>
			<TimerBtn label="Clear" handler={() => { setCount(0); setRound(0); setStopped(true); }}/>
			<TimerBtn label="Fast Forward" handler={() => { if(!isStopped) { setCount(0); setRound(1);}}}/>
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
			<br />
			Rounds: <DecrementBtn handler={() => { setCountRounds(decrementHelper(countRounds)); }}/>
			{countRounds}
			<IncrementBtn handler={() => { setCountRounds(incrementHelper(countRounds)); }}/>
		</div>
	);
}

export default XY;
