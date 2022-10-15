import { IncrementBtn, DecrementBtn } from "./HMSBtn";
import { incrementHelper, decrementHelper, calcHMS } from "../../utils/helpers";

const SetterButtons = ({ hoursLabel, minutesLabel, secondsLabel, 
	                     countHrs, countMins, countSecs, setCountHrs, setCountMins, setCountSecs }) => {
	return (
		<>
			{hoursLabel}: <DecrementBtn handler={() => { setCountHrs(decrementHelper(countHrs)); }}/>
			{countHrs}
			<IncrementBtn handler={() => { setCountHrs(incrementHelper(countHrs)); }}/> 
			<br/>
			{minutesLabel}: <DecrementBtn handler={() => { setCountMins(decrementHelper(countMins)); }}/>
			{countMins}
			<IncrementBtn handler={() => { setCountMins(incrementHelper(countMins, 59)); }}/> 
			<br/>
			{secondsLabel}: <DecrementBtn handler={() => { setCountSecs(decrementHelper(countSecs)); }}/>
			{countSecs}
			<IncrementBtn handler={() => { setCountSecs(incrementHelper(countSecs, 59)); }}/>
		</>
	);
}

export default SetterButtons;