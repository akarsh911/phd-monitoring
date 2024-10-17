import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import Login from "./Pages/Login/Login.jsx";
import ConstituteOfInstitutionalResearchBoard from "./Pages/Constitute of Institutional Research Board/ConstituteOfInstitutionalResearchBoard.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/constitute-of-institutional-research-board",
		element: <ConstituteOfInstitutionalResearchBoard />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
