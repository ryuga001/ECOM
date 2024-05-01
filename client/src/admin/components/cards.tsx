import Card from "./card"
interface PropsType {
    NOP?: number,
    NOC?: number,
    Sales?: number,
}
const Cards = ({ NOP, NOC, Sales }: PropsType) => {
    return (
        <div className="cardsContainer">
            <Card value={NOP} title={"Products"} />
            <Card value={NOC} title={"Customers"} />
            <Card value={Sales} title={"Sales"} />
        </div>
    )
}

export default Cards