import React, { useState, useContext, useEffect } from "react";
import "./PackageDetails.css";
import { GlobalContex } from "../contex/GlobalState";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PackageDetails = () => {
  const [packages, setPackages] = useState([]);
  const { data } = useContext(GlobalContex);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const pck = data.filter((p) => p.id === id);

    setPackages(pck);
  }, [data]);

  return (
    <>
      {packages.map((p) => (
        <div key={p.id} className="details">
          <div className="text">
            <div className="nameOfPackage">
              <div className="arrow">
                <FaArrowLeft onClick={() => navigate("/dashboard")} size={25} />
              </div>
              <div className="textForPackage">
                <h1> {p.name}</h1>
              </div>
            </div>
            <div className="trackingNumber">
              <h1>Description: {p.description}</h1>
            </div>
          </div>
          <div className="description">
            <Barcode value={p.trackingNumber} />
            <div>
              <h1> Tracking Number</h1>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PackageDetails;
