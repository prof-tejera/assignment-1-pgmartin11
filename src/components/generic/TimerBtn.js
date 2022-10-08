const TimerBtn = ({ label, handler }) => {
    return <button onClick={() => handler()}>{label}</button>
}

export default TimerBtn;