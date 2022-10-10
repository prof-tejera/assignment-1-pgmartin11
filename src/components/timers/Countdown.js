import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";

//const Countdown = ({ startVal }) => {
const Countdown = () => {
  //const startVal = 5;

  const countHrs = 0,
  	countMins = 2,
  	countSecs = 5;

  const startVal = countHrs * 60 * 60 + countMins * 60 + countSecs;

  const [count, setCount] = useState(startVal);
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

  const timerHrsRemaining = Math.floor(count / (60 * 60));
  const timerMinsRemaining = Math.floor((count - timerHrsRemaining * 60 * 60) / 60);
  const timerSecsRemaining = count - timerHrsRemaining * 60 * 60 - timerMinsRemaining * 60;

  return (
    <div className="main-panel">
      <div className="display">Counter: {count}</div>
      <div className="display">{timerHrsRemaining}:{timerMinsRemaining}:{timerSecsRemaining}</div>
      <TimerBtn label="Start" handler={() => { setCount(startVal); setStopped(false); setPaused(false); }}/>
      <TimerBtn label="Stop" handler={() => setStopped(true) }/>
      <TimerBtn label="Pause" handler={() => setPaused(!isPaused) }/><br/>
      <TimerBtn label="Clear" handler={() => { setCount(0); setStopped(true) }}/>
      <TimerBtn label="Fast Forward" handler={() => { if(!isStopped) { setCount(0); }}}/>
    </div>
  );
}

export default Countdown;
