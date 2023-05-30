import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProviders";

export const DefaultLayout = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div>
            Default
            <Outlet />
        </div>
    );
};
