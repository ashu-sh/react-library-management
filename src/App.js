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
import Books from "./DashMenu/Books";
import Otherinfo from "./DashMenu/Otherinfo";
import BookIssue from "./DashMenu/BookIssue";
import BookReturn from "./DashMenu/BookReturn";
import Support from "./DashMenu/Support";
// import DashboardMenu from "./Componants/DashboardMenu";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position="top-right" theme="colored" />
        <Routes>
          <Route path="/">
            <Route path="/" element={[<Navbar />, <DashboardComponantOne />]} />
            <Route path="/addstudent" element={[<Navbar />, <AddStudents />]} />
            <Route path="/addteacher" element={[<Navbar />, <AddTeacher />]} />
            <Route path="/addbook" element={[<Navbar />, <AddBook />]} />
            <Route
              path="/All-users"
              element={[<Navbar />, <DashboardMenu />, <Allusers />]}
            />
            <Route
              path="/user"
              element={[<Navbar />, <DashboardMenu />, <Users />]}
            />
            <Route
              path="/books"
              element={[<Navbar />, <DashboardMenu />, <Books />]}
            />
            <Route
              path="/otherinfo"
              element={[<Navbar />, <DashboardMenu />, <Otherinfo />]}
            />
            <Route
              path="/issue&return"
              element={[
                <Navbar />,
                <DashboardMenu />,
                <BookIssue />,
                <BookReturn />,
              ]}
            />
            <Route
              path="/support"
              element={[<Navbar />, <DashboardMenu />, <Support />]}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
