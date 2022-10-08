import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";

const XY = () => {
  let startVal = 5;
  let roundVal = 2;

  const [count, setCount] = useState(startVal);
  const [round, setRound] = useState(roundVal);
  const [isPaused, setPaused] = useState(false);
  const [isStopped, setStopped] = useState(true);

  // useRef ??
  let startRoundVal = roundVal;

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

  return (
    <div className="main-panel">
      <div className="display">Counter: {count}</div>
      <div className="display">Round: {round}</div>
      <TimerBtn label="Start" handler={() => { setCount(startVal); setRound(roundVal); setStopped(false); setPaused(false); }}/>
      <TimerBtn label="Stop" handler={() => { setStopped(true); }}/>
      <TimerBtn label="Pause" handler={() => { setPaused(!isPaused); }}/><br/>
      <TimerBtn label="Clear" handler={() => { setCount(0); setRound(0); setStopped(true); }}/>
      <TimerBtn label="Fast Forward" handler={() => { if(!isStopped) { setCount(0); setRound(1);}}}/>
    </div>
  );
}

export default XY;
