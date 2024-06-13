import { useAppSelector } from "../../store/hook";

const AdminCard = () => {
    const user = useAppSelector((state) => state.user.user);

    return (
        <div className="AdminCardContainer">
            <img src={user?.profileImage} alt="Image" />
            <span>{user?.username}</span>
        </div>
    )
}

export default AdminCard