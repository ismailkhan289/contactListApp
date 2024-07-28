/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getContact } from "../api/ContactService";

const ContactDetails = ({ updateContact, updateImage }) => {
  const updateImageRef = useRef();
  const [updateContactValues, setUpdateContactValues] = useState({
    id:"",
    name: "",
    email: "",
    phone: "",
    address: "",
    titles: "",
    status: "",
    photoUrl: "",
  });
  // to catch id from the URL we use useParams() fuction
  const { id } = useParams();
  // console.log(id);
  // after getting the id we need to get the contact details of that id
  const fetchDetails = async (id) => {
    try {
      const { data } = await getContact(id);
      setUpdateContactValues(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (event) => {
    setUpdateContactValues({ ...updateContactValues, [event.target.name]: event.target.value });
    // console.log(updateContactValues)
  };

  const onUpdateContact = async (event) => {
    event.preventDefault();
    await updateContact(updateContactValues);
    fetchDetails(id);
  };

  const selectImage = () => {
    updateImageRef.current.click();
  };
  const updateContactPhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      // console.log(formData);
      // alert("laksjdf");
      await updateImage(formData);
      setUpdateContactValues((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`,
      }));
    } catch (error) {}
  };

  useEffect(() => {
    fetchDetails(id);
  }, [id]);
  return (
    <>
      <Link to={"/"}>
        <i className="bi bi-arrow-left"></i>Back to Home Page
      </Link>
      <div className="profile">
        <div className="profile__details">
          <img
            src={updateContactValues.photoUrl}
            alt={`Profile photo of ${updateContactValues.name}`}
          />
          <div className="profile__metadata">
            <p className="profile__name">{updateContactValues.name}</p>
            <p className="profile__muted">JPG, PNG, or GIF. Max of 10MB</p>
            <button className="btn" onClick={selectImage}>
              <i className="bi bi-cloud-upload"></i>Change Photo
            </button>
          </div>
        </div>
        <div className="profile__settings">
          <div>
            <form onSubmit={onUpdateContact} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  name="id"
                  required
                  value={updateContactValues.id}
                />
                <div className="input-box">
                  <span className="details">Name</span>
                  <input
                    value={updateContactValues.name}
                    type="text"
                    name="name"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    value={updateContactValues.email}
                    type="email"
                    name="email"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Title</span>
                  <input
                    value={updateContactValues.titles}
                    type="text"
                    name="titles"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Phone Number</span>
                  <input
                    value={updateContactValues.phone}
                    type="text"
                    name="phone"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Address</span>
                  <input
                    value={updateContactValues.address}
                    type="text"
                    name="address"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Account Status</span>
                  <input
                    value={updateContactValues.status}
                    type="text"
                    name="status"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form_footer">
                  <button type="submit" className="btn">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={updateImageRef}
          name="file"
          onChange={(event) => updateContactPhoto(event.target.files[0])}
          accept="image/*"
        />
      </form>
    </>
  );
};

export default ContactDetails;
