import { useAppSelector } from "../../store/hook";

const AdminCard = () => {
    const user = useAppSelector((state) => state.user.user);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <img
                src={user?.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
            />
            <span className="text-lg font-semibold text-gray-800">{user?.username || "Admin"}</span>
        </div>
    );
};

export default AdminCard;
