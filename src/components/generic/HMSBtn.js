import IncDecBtn from "./IncDecBtn";

export const IncrementBtn = ({ handler, disabled }) => {
    return <IncDecBtn disabled={disabled} label="+" handler={handler} />
}

export const DecrementBtn = ({ handler, disabled }) => {
    return <IncDecBtn disabled={disabled} label="-" handler={handler} />
}