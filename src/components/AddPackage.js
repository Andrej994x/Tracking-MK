import React, { useState, useContext } from "react";
import "./AddPackage.css";
import { GlobalContex } from "../contex/GlobalState";

const AddPackage = () => {
  const { addPackage } = useContext(GlobalContex);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [descrtiption, setDescription] = useState("");

  const showFormInput = () => {
    setShowForm(!showForm);
  };

  const AddPackageInArchive = () => {
    addPackage(name, trackingNumber, descrtiption);
    setShowForm(false);
    setName("");
    setDescription("");
    setTrackingNumber("");
  };

  return (
    <div className="container ">
      <div className="button-add">
        {showForm ? null : (
          <div className="btn-img" value="Add" onClick={showFormInput}>
            <img src="https://img.icons8.com/ios/50/000000/add--v1.png" />
          </div>
        )}

        {showForm && (
          <form className="ui form">
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Tracking number</label>
              <input
                type="text"
                name="Tracking number"
                placeholder="Tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Descrtiption </label>
              <input
                type="text"
                name="Descrtiption"
                placeholder="Descrtiption"
                value={descrtiption}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              onClick={AddPackageInArchive}
              className="ui button"
              type="button"
            >
              Add Package
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="ui button"
              type="button"
            >
              No Thanks
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPackage;
