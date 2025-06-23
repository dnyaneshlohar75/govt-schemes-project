import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import UserDashboard from "./pages/UserDashboard";

import Page from "./pages/dashbord/Page";
// import { ThemeProvider } from "./components/theme-provider";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        
        {
          path: "/user",
          element: <UserDashboard />,
        },
        {
          path: "/dashboard",
          element: <Page />,
        },
      ],
    },
  ]);
  return (
 <RouterProvider router={route} />
   
  )
  
}

export default App;
