import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";

const Stopwatch = () => {
  const countHrs = 5,
  	countMins = 5,
  	countSecs = 5;

  const countupVal = countHrs * 60 * 60 + countMins * 60 + countSecs;

  const [count, setCount] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [isStopped, setStopped] = useState(true);

  useEffect(() => {
    let t;

    if ((count < countupVal) && !isPaused && !isStopped) {
      t = setTimeout(() => {
        setCount(count+1);
      }, 1000)
    }

    return () => { if (t) { clearTimeout(t); } }
  }, [count, isPaused, isStopped]);

  const timerHrsRemaining = Math.floor(count / (60 * 60));
  const timerMinsRemaining = Math.floor((count - timerHrsRemaining * 60 * 60) / 60);
  const timerSecsRemaining = count - timerHrsRemaining * 60 * 60 - timerMinsRemaining * 60;

  return (
    <div className="main-panel">
    <div className="display">Counter: {count}</div>
    <div className="display">{timerHrsRemaining}:{timerMinsRemaining}:{timerSecsRemaining}</div>
	<TimerBtn label="Start" handler={() => { setCount(0); setStopped(false); setPaused(false); }}/>
	<TimerBtn label="Stop" handler={() => setStopped(true)} />
	<TimerBtn label="Pause" handler={() => setPaused(!isPaused)}/>
	<TimerBtn label="Clear" handler={() => { setCount(0); setStopped(true); }}/>
	<TimerBtn label="Fast Forward<" handler={() => { if(!isStopped) { setCount(countupVal); }}}/>
    </div>
  );
}

export default Stopwatch;
