import Navbar from "../navbar/Navbar";
import { useAuth } from '../../../contexts/AuthContext';
import NotAuthNavbar from "../navbar/NotAuthNavbar";

export default function Layout({ children }) {

  const {user} = useAuth();

  return (
    <>
      {user ? <Navbar /> : <NotAuthNavbar/>}
      <main>{children}</main>
    </>
  )
}