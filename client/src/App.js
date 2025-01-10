import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SignUp from './feature/Auth/component/SignUp';
import SignIn from './feature/Auth/component/SignIn';
import CheckEmail from './feature/Auth/component/CheckEmail';
import CheckPassword from './feature/Auth/component/CheckPassword';
import Home from './feature/pages/Home';
import MessagePage from './feature/message/MessagePage';
import Logo from './feature/pages/Logo';

function App() {
  const router = createBrowserRouter([
    { path: "/signup", element: <Logo><SignUp /></Logo> },
    { path: "/signin", element: <Logo><SignIn /></Logo> },
    { path: "/email", element: <CheckEmail /> },
    { path: "/password", element: <CheckPassword /> },
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/", element: <MessagePage /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
