import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './pages/Layout';
import UserDashboard from './pages/UserDashboard';
import SchemeDashboard from './pages/SchemeDashboard';

function App() {
const route = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'',element:<Login />
      },
      {
        path:"/user",
        element:<UserDashboard/>
      },
      {
        path:"/dashboard",
        element:<SchemeDashboard/>
      }
    ]
  }
])
  return <RouterProvider router={route}/>
}

export default App;
