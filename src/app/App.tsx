import { Suspense } from "react";

import AppRouter from "./routes";

import { Loader } from "@shared/ui/Loader";

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <AppRouter />
        </Suspense>
    );
};

export default App;
