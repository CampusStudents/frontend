import type { FC, ReactNode } from "react";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    console.log("Это приватный маршрут");

    // TODO: реализовать логику приватного маршрута
    return <div>{children}</div>;
};

export default ProtectedRoute;
