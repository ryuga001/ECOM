interface PropsType {
    title?: string;
    value?: number;
}

const Card = ({ title, value }: PropsType) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2 transition-transform transform hover:scale-105
        h-48 
        ">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-indigo-600">{value}</p>
        </div>
    );
};

export default Card;
