import Card from "./card";

interface PropsType {
    NOP?: number;
    NOC?: number;
    Sales?: number;
    Orders?: number;
}

const Cards = ({ NOP, NOC, Sales, Orders }: PropsType) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 " >
            <Card value={NOP} title={"Products"} />
            <Card value={NOC} title={"Customers"} />
            <Card value={Sales} title={"Sales"} />
            <Card value={Orders} title={"Total Orders"} />
        </div>
    );
};

export default Cards;
