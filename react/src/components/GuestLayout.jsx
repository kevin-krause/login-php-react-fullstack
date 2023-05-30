import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProviders";

export const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to={"/"} />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};
