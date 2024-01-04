import React, { useContext, useEffect, useState } from "react";
import "../Header/Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Rightheader from "./Rightheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function Navbar() {
  const { account, setAccount } = useContext(LoginContext);
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  console.log("navbar", account);

  const [dropen, setDropen] = useState(false);

  const getdetailValiduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("data...", data);
    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data Valid");
      setAccount(data);
    }
  };

  const handleOpen = () => {
    setDropen(true);
  };
  const handleClose = () => {
    setDropen(false);
  };

  const [text, setText] = useState("");
  console.log(text);

  const [liopen, setLiopen] = useState(true);

  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.getproductsdata);
console.log("product.....",products)

  const logoutUser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    console.log("data...", data2);
    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("data Valid");
      //  alert("LogOut")
      toast.success("user Logout ", {
        position: "top-center",
      });
      history("/");
      setAccount(false);
    }
  };
  const getText = (item) => {
    setText(item);
    setLiopen(false);
  };

  useEffect(() => {
    getdetailValiduser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleOpen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handleClose}>
            <Rightheader logclose={handleClose}  userlog={logoutUser}/>
          </Drawer>

          <div className="navlogo">
            <NavLink to={"/"}>
              <img src="amazon_PNG25.png" alt="img" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search Your Product"
              onChange={(e) => getText(e.target.value)}
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/*  Search Filter */}
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {
                  products.filter(product =>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map((product) => (
                    <ListItem>
                    <NavLink to={`/getproductsone/${product.id}`} onClick={()=>setLiopen(true)}>
                    {product.title.longTitle}
                    </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to={"/login"}>Sign In</NavLink>
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to={"/buynow"}>
                <Badge badgeContent={account?.carts?.length} color="secondary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to={"/login"}>
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
            <ToastContainer />
            <p> Cart</p>
          </div>
          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account?.name[0]?.toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></Avatar>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
            {account ? (
              <MenuItem onClick={handleCloseMenu} onClick={logoutUser}>
                <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

// "proxy": "http://localhost:4001/",
  // "dev": "nodemon app.js",