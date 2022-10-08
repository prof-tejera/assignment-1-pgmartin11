import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";

const Stopwatch = () => {
  let countupVal = 5;

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

  console.log('Rendering component, count is '+count);

  return (
    <div className="main-panel">
      <div className="display">Counter: {count}</div>
      <button onClick={() => { setCount(0); setStopped(false); setPaused(false); }} >Start</button>
      <button onClick={() => { setStopped(true); }} >Stop</button>
      <button onClick={() => setPaused(!isPaused)}>Pause</button><br/>
      <button onClick={() => { setCount(0); setStopped(true); }}>Clear</button>
      <button onClick={() => { if(!isStopped) { setCount(countupVal); }}} >Fast Forward</button>
    </div>
  );
}

export default Stopwatch;
