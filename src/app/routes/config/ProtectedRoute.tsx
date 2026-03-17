import type { FC, ReactNode } from "react";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    console.log("Это приватный маршрут");

    return <div>{children}</div>;
};

export default ProtectedRoute;
