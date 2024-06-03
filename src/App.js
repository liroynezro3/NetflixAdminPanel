import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import ListMovies from "./pages/listList/ListMovies";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Router>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      {user ? (
        <>
          <Topbar user={user.id}/>
          <div className="container">
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/lists">
                <ListMovies />
              </Route>
              <Route path="/list/:productId">
                <List />
              </Route>
              <Route path="/newlist">
                <NewList />
              </Route>
              <Route path="*">{<Redirect to="/" />}</Route>
            </Switch>
            {/*
          <Route path="/lists/:listId">
            <ListMovies />
          </Route>
          <Route path="/newList">
            <ListMovies />
          </Route>
          */}
          </div>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </Router>
  );
}

export default App;
