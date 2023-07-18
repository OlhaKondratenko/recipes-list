import {createBrowserRouter} from "react-router-dom";
import List from "./components/List/List";
import Recipe from "./components/Recipe/Recipe";

const router = createBrowserRouter([
    {
        path: "/",
        element: <List/>,
    },
    {
        path: "/recipe/:id",
        element: <Recipe/>,
    },
]);

export default router;
