import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/generic/HMSBtn";
import SetterButtons from "../../components/generic/SetterButtons";
import { incrementHelper, decrementHelper, calcHMS } from "../../utils/helpers";


const XY = () => {
	const [countHrs, setCountHrs] = useState(0);
	const [countMins, setCountMins] = useState(0);
	const [countSecs, setCountSecs] = useState(0);
	const [countRounds, setCountRounds] = useState(1);

	const [count, setCount] = useState(0);
	const [round, setRound] = useState(1);
	const [isPaused, setPaused] = useState(false);
	const [isStopped, setStopped] = useState(true);

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

			if (round == 1 && count == 0) {
				setStopped(true);
			}
		}

		return () => { if (t) { clearTimeout(t); } }
	}, [round, count, isPaused, isStopped]);

    const startVal = countHrs * 60 * 60 + countMins * 60 + countSecs,
		endVal = 0,
		roundStartVal = countRounds,
		roundEndVal = 1;

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

    const titleClass = !isStopped ? 'time-setter-title disabled' : 'time-setter-title';
	const valClass = !isStopped ? 'time-setter-val disabled' : 'time-setter-val';

	return (
		<div className="main-panel">
			<div className="display"><span className="time-category">Count:</span>{timerHrs}:{timerMins}:{timerSecs}</div>
			<div className="display"><span className="time-category">Round:</span>{round}</div>
			<div className="control-btn-wrapper">
				{isStopped &&
				<TimerBtn label="Start" handler={() => { 
					setCount(startVal); 
					setRound(countRounds); 
					setStopped(false); 
					setPaused(false); }}
				/>
				}
				{!isStopped && <TimerBtn label={pauseLabel} handler={() => setPaused(!isPaused)}/>}
				<TimerBtn disabled={isStopped} label="Clear" handler={() => { setCount(startVal); setRound(roundStartVal); setStopped(true); }}/>
				<TimerBtn disabled={isStopped} label="Fast Forward" handler={() => { if(!isStopped) { setCount(endVal); setRound(roundEndVal ); setStopped(true); }}}/>
			</div>
			<SetterButtons disabled={!isStopped} {...setterBtnData} />
			<br />
			<span className={titleClass}>Rounds:</span><DecrementBtn disabled={!isStopped} handler={() => { setCountRounds(decrementHelper(countRounds, 1)); }}/>
			<span className={valClass}>{countRounds}</span>
			<IncrementBtn disabled={!isStopped} handler={() => { setCountRounds(incrementHelper(countRounds)); }}/>
		</div>
	);
}

export default XY;