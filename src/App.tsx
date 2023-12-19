import { useState } from 'react'
import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthService } from './services/authService';
import { DataService } from './services/dataService';
import NavBar from './components/navbar';
import LoginComponent from './components/login/loginComponent';
import CreatePassword from './components/password/createPassword';
import PasswordListings from './components/password/passwordListings';


const authService = new AuthService();
const dataService = new DataService(authService);

function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar userName={userName}/>
          <Outlet />
        </>
      ),
      children:[
        {
          path: "/",
          element: <div>Password</div>,
        },
        {
          path: "/login",
          element: <LoginComponent authService={authService} setUserNameCb={setUserName}/>,
        },
        {
          path: "/new",
          element: <CreatePassword dataService={dataService} username ={userName}/>,
        },
        {
          path: "/passwords",
          element: <PasswordListings dataService={dataService} username ={userName}/>,
        },
      ]
    },
  ]);
  return (
    <div className="wrapper">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
