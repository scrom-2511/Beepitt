import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export const useAuth = () => {
    const email = useSelector((state: RootState) => state.auth.email);
    const password = useSelector((state: RootState) => state.auth.password);

    return { email, password };
};
