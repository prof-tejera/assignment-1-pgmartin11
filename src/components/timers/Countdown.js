import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";

//const Countdown = ({ startVal }) => {
const Countdown = () => {
  let startVal = 5;
  
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

  return (
    <div className="main-panel">
      <div className="display">Counter: {count}</div>
      <TimerBtn label="Start" handler={() => { setCount(startVal); setStopped(false); setPaused(false); }}/>
      <TimerBtn label="Stop" handler={() => { setStopped(true); }}/>
      <TimerBtn label="Pause" handler={() => { setPaused(!isPaused); }}/><br/>
      <TimerBtn label="Clear" handler={() => { setCount(0); setStopped(true); }}/>
      <TimerBtn label="Fast Forward" handler={() => { if(!isStopped) { setCount(0); }}}/>
    </div>
  );
}

export default Countdown;
