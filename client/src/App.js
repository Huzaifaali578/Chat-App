import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './feature/Auth/component/SignUp';
import CheckEmail from './feature/Auth/component/CheckEmail';
import Home from './feature/pages/Home';
import MessagePage from './feature/message/MessagePage';
import Logo from './feature/pages/Logo';
import { Toaster } from 'react-hot-toast';
import ForgetPassword from './feature/Auth/component/ForgetPassword';
import SignIn from './feature/Auth/component/SignIn';

function App() {
  const router = createBrowserRouter([
    { path: "/signup", element: <Logo><SignUp /></Logo> },
    { path: "/email", element: <Logo><CheckEmail /></Logo> },
    { path: "/signin", element: <Logo><SignIn /></Logo> },
    { path: "/forgot-password", element: <Logo><ForgetPassword /></Logo> },
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/:id", element: <MessagePage /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
