import { IncrementBtn, DecrementBtn } from "./HMSBtn";
import { incrementHelper, decrementHelper, calcHMS } from "../../utils/helpers";

const SetterButtons = ({ hoursLabel, minutesLabel, secondsLabel, 
	                     countHrs, countMins, countSecs, setCountHrs, setCountMins, setCountSecs }) => {
	return (
		<>
			<span className="time-setter-title">{hoursLabel}:</span><DecrementBtn handler={() => { setCountHrs(decrementHelper(countHrs)); }}/>
			<span className="time-setter-val">{countHrs}</span>
			<IncrementBtn handler={() => { setCountHrs(incrementHelper(countHrs)); }}/> 
			<br/>
			<span className="time-setter-title">{minutesLabel}:</span><DecrementBtn handler={() => { setCountMins(decrementHelper(countMins)); }}/>
			<span className="time-setter-val">{countMins}</span>
			<IncrementBtn handler={() => { setCountMins(incrementHelper(countMins, 59)); }}/> 
			<br/>
			<span className="time-setter-title">{secondsLabel}:</span><DecrementBtn handler={() => { setCountSecs(decrementHelper(countSecs)); }}/>
			<span className="time-setter-val">{countSecs}</span>
			<IncrementBtn handler={() => { setCountSecs(incrementHelper(countSecs, 59)); }}/>
		</>
	);
}

export default SetterButtons;