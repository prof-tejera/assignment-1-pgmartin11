import IncDecBtn from "./IncDecBtn";

export const IncrementBtn = ({ handler }) => {
    return <IncDecBtn label="+" handler={handler} />
}

export const DecrementBtn = ({ handler }) => {
    return <IncDecBtn label="-" handler={handler} />
}