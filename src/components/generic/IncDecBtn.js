const IncDecBtn = ({ label, handler, disabled=false }) => {
    return <button className="time-setter" disabled={disabled} onClick={() => handler()}>{label}</button>
}

export default IncDecBtn;