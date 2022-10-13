import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/generic/HMSBtn";
import { incrementHelper, decrementHelper, calcHMS } from "../../utils/helpers";

const Tabata = () => {
    const [countHrs, setCountHrs] = useState(0);
    const [countMins, setCountMins] = useState(0);
    const [countSecs, setCountSecs] = useState(0);
    const [intervalHrs, setIntervalHrs] = useState(0);
    const [intervalMins, setIntervalMins] = useState(0);
    const [intervalSecs, setIntervalSecs] = useState(0);
    const [countRounds, setCountRounds] = useState(1);

	const [interval, setInterv] = useState(0);
	const [count, setCount] = useState(0);
	const [round, setRound] = useState(0);
	const [isPaused, setPaused] = useState(false);
	const [isStopped, setStopped] = useState(true);

	useEffect(() => {
		let t;

		if (!isPaused && !isStopped) {
			if ((count > 0) && (interval > 0)) {
				t = setTimeout(() => {
					setCount(count-1);
				}, 1000)
			}

			if ((count == 0) && (interval > 0)) {
				t = setTimeout(() => {
					setInterv(interval-1);
				}, 1000)
			}
	 
			if ((round-1 > 0) && (count == 0) && (interval == 0)) {
				t = setTimeout(() => {
					setRound(round-1);
					setCount(startVal);
					setInterv(intervalStartVal);
				}, 1000)
			}
		}

		return () => { if (t) { clearTimeout(t); } }
	}, [round, count, interval]);

	const startVal = countHrs * 60 * 60 + countMins * 60 + countSecs;
	const endVal = 0;
    const intervalStartVal = intervalHrs * 60 * 60 + intervalMins * 60 + intervalSecs;
    const intervalEndVal = 0;
    const roundStartVal = countRounds;
    const roundEndVal = 1;

	const { timerHrs, timerMins, timerSecs } = calcHMS(count);
	const { timerHrs: intHrs, timerMins: intMins, timerSecs: intSecs } = calcHMS(interval);

	return (
		<div className="main-panel">
			<div className="display">Interval: {intHrs}:{intMins}:{intSecs}</div>
			<div className="display">Count: {timerHrs}:{timerMins}:{timerSecs}</div>
			<div className="display">Round: {round}</div>
			<TimerBtn label="Start" handler={() => { 
				setInterv(intervalStartVal);
				setCount(startVal); 
				setRound(countRounds); 
				setStopped(false); 
				setPaused(false); }}
			/>
			<TimerBtn label="Stop" handler={() => { setStopped(true); }}/>
			<TimerBtn label="Pause" handler={() => { setPaused(!isPaused); }}/><br/>
			<TimerBtn label="Reset" handler={() => { setInterv(intervalStartVal); setCount(startVal); setRound(roundStartVal); setStopped(true); }}/>
			<TimerBtn label="Fast Forward" handler={() => { if(!isStopped) { setInterv(0); setCount(0); setRound(1);}}}/>
			<br />
			<br />
			Interval Hours: <DecrementBtn handler={() => { setIntervalHrs(decrementHelper(intervalHrs)); }}/>
			{intervalHrs}
			<IncrementBtn handler={() => { setIntervalHrs(incrementHelper(intervalHrs)); }}/> 
			<br/>
			Interval Minutes: <DecrementBtn handler={() => { setIntervalMins(decrementHelper(intervalMins)); }}/>
			{intervalMins}
			<IncrementBtn handler={() => { setIntervalMins(incrementHelper(intervalMins, 59)); }}/> 
			<br/>
			Interval Seconds: <DecrementBtn handler={() => { setIntervalSecs(decrementHelper(intervalSecs)); }}/>
			{intervalSecs}
			<IncrementBtn handler={() => { setIntervalSecs(incrementHelper(intervalSecs, 59)); }}/>
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

export default Tabata;
