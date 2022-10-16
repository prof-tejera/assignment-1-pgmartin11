const TimerBtn = ({ label, handler, disabled=false }) => {
    return <button disabled={disabled} onClick={() => handler()}>{label}</button>
}

export default TimerBtn;