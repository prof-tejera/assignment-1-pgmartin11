import { useState, useEffect, useRef } from 'react';
import TimerBtn from "../../components/generic/TimerBtn";
import { IncrementBtn, DecrementBtn } from "../../components/generic/HMSBtn";
import { incrementHelper, decrementHelper, calcHMS } from "../../utils/helpers";

const Tabata = () => {

    /******/
    const intervalStartVal = 10;
	const countStartVal = 20;
	const roundStartVal = 2;
	/******/

	const [interval, setInterval] = useState(intervalStartVal);
	const [count, setCount] = useState(countStartVal);
	const [round, setRound] = useState(roundStartVal);
{/*
	const [isPaused, setPaused] = useState(false);
	const [isStopped, setStopped] = useState(true);
 */}

	useEffect(() => {
		let t;

		if ((count > 0) && (interval > 0)) {
			t = setTimeout(() => {
				setCount(count-1);
			}, 1000)
		}

		if ((count == 0) && (interval > 0)) {
			t = setTimeout(() => {
				setInterval(interval-1);
			}, 1000)
		}
 
		if ((round-1 > 0) && (count == 0) && (interval == 0)) {
			t = setTimeout(() => {
				setRound(round-1);
				setCount(countStartVal);
				setInterval(intervalStartVal);
			}, 1000)
		}

		return () => { if (t) { clearTimeout(t); } }
	}, [round, count, interval]);

	return (
		<div className="main-panel">
		<div className="display">Interval: {interval}</div>
			<div className="display">Counter: {count}</div>
			<div className="display">Round: {round}</div>
		</div>
	);
}

export default Tabata;
