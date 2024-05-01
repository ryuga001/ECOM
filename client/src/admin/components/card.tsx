
interface PropsType {
    title?: string,
    value?: number,
}

const Card = ({ title, value }: PropsType) => {
    return (
        <div className="CardContainer">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    )
}

export default Card