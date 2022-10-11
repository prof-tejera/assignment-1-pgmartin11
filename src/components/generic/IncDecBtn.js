const IncDecBtn = ({ label, handler }) => {
    return <button onClick={() => handler()}>{label}</button>
}

export default IncDecBtn;