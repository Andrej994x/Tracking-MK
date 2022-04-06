import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Heades.css";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  const [showLogout, setShowLogout] = useState(false);

  const onClick = () => {
    // localStorage.clear();
    // navigate("login");
    localStorage.clear();
    window.location.href = "/login";
  };

  const showButtonToLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="ui sizer vertical segment">
      <div className="ui medium header">
        <div className="truckimg">
          <FaTruck
            style={{ marginRight: "10px", width: "40px", height: "25px" }}
          />
          <h3>Tracking MK</h3>
        </div>

        <div className="logOutbtn">
          <div>
            <BsThreeDotsVertical
              size={23}
              style={{ cursor: "pointer" }}
              onClick={showButtonToLogout}
            />
          </div>

          {showLogout && (
            <div onClick={onClick} className="detailsForLogout">
              <div className="iconLog">
                <BiLogOut size={23} />
                <div className="textForLogout">
                  <h3>Logout</h3>{" "}
                </div>
              </div>
            </div>
          )}

          {/* <button onClick={onClick} class="negative ui button">
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
