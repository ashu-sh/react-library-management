import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardComponantOne from "./Componants/DashboardComponantOne";
import Navbar from "./Componants/Navbar";
import AddStudents from "./DataFeeder/AddStudents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardMenu from "./Componants/DashboardMenu";
import AddTeacher from "./DataFeeder/AddTeacher";
import AddBook from "./DataFeeder/AddBook";
import Allusers from "./AllData/Allusers";
import Users from "./DashMenu/Users";
import Otherinfo from "./DashMenu/Otherinfo";
import BookCirculation from "./DashMenu/BookCirculation";
import Support from "./DashMenu/Support";
import Students from "./AllData/Students";
import BooksData from "./AllData/BooksData";
import AdminLogin from "./Admin/AdminLogin";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Footer from "./Componants/Footer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLoggedIn = (token) => {
    localStorage.setItem("token", token);
    toast.success("Welcome to LMS !");
    setLoggedIn(true);
  };

  const handleLoggout = (token) => {
    localStorage.removeItem("token", token);
    toast.success("Thank you for using LMS ! See You Again");
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position="top-right" theme="colored" />
        {loggedIn ? (
          <Routes>
            <Route path="/">
              <Route
                path="/"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <DashboardComponantOne />,
                  <Footer />,
                ]}
              />
              <Route
                path="/addstudent"
                element={[<Navbar onLogout={handleLoggout} />, <AddStudents />]}
              />
              <Route
                path="/addteacher"
                element={[<Navbar onLogout={handleLoggout} />, <AddTeacher />]}
              />
              <Route path="/addbook" element={[<Navbar />, <AddBook />]} />
              <Route
                path="/All-users"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <DashboardMenu />,
                  <Allusers />,
                ]}
              />
              <Route
                path="/students"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <Students />,
                  <DashboardMenu />,
                ]}
              />
              <Route
                path="/bookstore"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <BooksData />,
                  <DashboardMenu />,
                ]}
              />
              <Route
                path="/user"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <Users />,
                  <DashboardMenu />,
                ]}
              />
              <Route
                path="/bookstore"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <BooksData />,
                  <DashboardMenu />,
                ]}
              />
              <Route
                path="/otherinfo"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <Otherinfo />,
                  <DashboardMenu />,
                ]}
              />
              <Route
                path="/issue&return"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <BookCirculation />,
                  <DashboardMenu />,
                ]}
              />
              <Route
                path="/support"
                element={[
                  <Navbar onLogout={handleLoggout} />,
                  <Support />,
                  <DashboardMenu />,
                ]}
              />
            </Route>
          </Routes>
        ) : (
          <AdminLogin onLogin={handleLoggedIn} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
