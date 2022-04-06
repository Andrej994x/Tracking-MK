import React, { useEffect, useState, useContext } from "react";
import { FaTruck } from "react-icons/fa";
import "./Dashboard.css";
import { GlobalContex } from "../contex/GlobalState";
import PackageDetails from "./PackageDetails";
import { useNavigate } from "react-router-dom";
import AddPackage from "./AddPackage";

export default function Dashboard() {
  const { removePackage, updatePackage, getPackages, data } =
    useContext(GlobalContex);

  const [packages, setPackages] = useState([]);
  const [archived, setArchived] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    getPackages();
  }, []);

  useEffect(() => {
    const pck = data.filter((p) => p.archived === false);
    const arc = data.filter((p) => p.archived === true);

    setPackages(pck);
    setArchived(arc);
  }, [data]);

  let navigate = useNavigate();
  // const onPackagesClick = () => {
  //   navigate(`packages/10`);
  // };

  return (
    <>
      <div className="ui tabular menu">
        <div
          className={activeTab === 1 ? "active item" : "item"}
          onClick={() => setActiveTab(1)}
          data-tab="tab-name"
        >
          Active
        </div>

        <div
          className={activeTab === 2 ? "active item" : "item"}
          onClick={() => setActiveTab(2)}
          data-tab="tab-name2"
        >
          Archive
        </div>
      </div>
      <div className={activeTab === 1 ? "" : "ui tab"} data-tab="tab-name">
        {packages.map((p) => (
          <div className="ui relaxed divided list">
            <div className="item" style={{ padding: "15px 20px" }}>
              <div className="content">
                <a
                  key={p.id}
                  onClick={() => {
                    navigate(`/packages/${p.id}`);
                  }}
                  className="header"
                  style={{ fontWeight: "200" }}
                >
                  <FaTruck style={{ marginRight: "16px" }} /> {p.name} -{" "}
                  {p.trackingNumber}
                </a>
                <div className="delete-btn">
                  <button
                    type="button"
                    onClick={() => updatePackage(p, true)}
                    className="ui button"
                  >
                    Archive
                  </button>
                  <div className="archive-btn">
                    <button
                      type="button"
                      onClick={() => removePackage(p.id)}
                      className="ui button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={activeTab === 2 ? "active ui tab" : "ui tab"}
        data-tab="tab-name2"
      >
        {archived.map((p) => (
          <div className="ui relaxed divided list">
            <div className="item" style={{ padding: "15px" }}>
              <div className="content">
                <a
                  key={p.id}
                  onClick={() => {
                    navigate(`/packages/${p.id}`);
                  }}
                  className="header"
                  style={{ fontWeight: "200" }}
                >
                  <FaTruck style={{ marginRight: "16px" }} /> {p.name} -{" "}
                  {p.trackingNumber}
                </a>

                <div className="delete-btn">
                  <button
                    className="ui button"
                    onClick={() => updatePackage(p, false)}
                  >
                    Unarchive
                  </button>
                  <div className="archive-btn">
                    <button
                      onClick={() => removePackage(p.id)}
                      className="ui button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
