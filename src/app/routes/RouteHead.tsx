import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getRouteMeta } from "./routeMeta";

const RouteHead = () => {
    const location = useLocation();
    const { title, description } = getRouteMeta(location.pathname);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};

export default RouteHead;
