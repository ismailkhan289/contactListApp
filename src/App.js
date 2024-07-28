import "./App.css";
import { useEffect, useRef, useState } from "react";
import { getContacts, saveContact, updatePhoto } from "./api/ContactService";
import Header from "./Components/Header";
import ContactList from "./Components/ContactList";
import { Routes, Route, Navigate } from "react-router-dom";
import ContactDetails from "./Components/ContactDetails";

function App() {
  const [data, setData] = useState({}); //This data will be set when the data is fetch
  // using the constant getAllContact which calls the funcation
  //getContacts declared in api/ContactService.js file
  const [currentPage, setCurrentPage] = useState(0);
  //calling function to get all contacts giving parameter of page and size and then
  //set the fetched data Using hook to setData to data
  const getAllContacts = async (page = 0, size = 2) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Modal save section start
  // this is for modal section showing modal and saving data of contact
  const modalRef = useRef();
  //handle the contact photo saving and update function
  const photoRef = useRef();
  const toggleModal = (show) => show ? modalRef.current.showModal() : modalRef.current.close();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    titles: "",
    status: "",
  });
  // now bind this formValues instances to html form using value attribute.
  //here we define on onChange event function onChage which simultaneously capture
  // the data of the form on change.
  const onChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  //this hook is define for photo
  const [formFile, setFormFile] = useState(undefined);

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      //calling the method of api and giving the value of form, here the data is the object in response
      const { data } = await saveContact(formValues);
      // console.log(data);
      //once the data.id is get from the response then we will save the photo as well
      const formData = new FormData();
      formData.append("file", formFile, formFile.name);
      formData.append("id", data.id);
      //here we are sending the photo along with id of the current saving contact
       await updatePhoto(formData);
      // console.log(photoUrl);
      //closing the toggleModal
      toggleModal(false);
      //setting or emptying the file photo and form values entries
      setFormFile(undefined);
      //Now using useRef(photoRef) we set the current value of file to empty
      photoRef.current.value = null;
      //make form values empty or null
      setFormValues({
        name: "",
        email: "",
        address: "",
        phone: "",
        titles: "",
        status: "",
      });
      //get updated contact list
      getAllContacts();
    } catch (error) {
      console.log(error);
    }
  };
  // Modal Section ends here

  // For updateContact and updatedImage we define two const function

  const updateContact= async(contactDate)=>{
    try {
      const {data}=await saveContact(contactDate);
      console.log(data);
    } catch (error) {
      
    }
  };
  const updateImage= async(formData)=>{
    try {
      // alert("lakjsdf");
     await updatePhoto(formData);
    //  console.log(formData);
    } catch (error) {      
    }
  };
  //when the page is rendered we will throw this function using useEffect
  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      {/* About Components header Component is showing at the top bind, whereas ContactList and 
      ContactDetails components are object to path if the path is set for them */}
      <Header toggleModal={toggleModal} noOfContacts={data.numberOfElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path={'/'} element={<Navigate to={"/contacts"} />}></Route>
            <Route path={'/contact'} element={<Navigate to={"/contacts"} />}></Route>
            <Route
              path="/contacts"
              element={
                <ContactList
                  data={data}
                  currentPage={currentPage}
                  getAllContacts={getAllContacts}
                />
              }
            ></Route>
            <Route
              path="/contacts/:id"
              element={
                <ContactDetails
                  updateContact={updateContact}
                  updateImage={updateImage}
                />
              }
            ></Route>
          </Routes>
        </div>
      </main>
      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  value={formValues.name}
                  onChange={onChange}
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  value={formValues.email}
                  onChange={onChange}
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  value={formValues.titles}
                  onChange={onChange}
                  type="text"
                  name="titles"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  value={formValues.phone}
                  onChange={onChange}
                  type="text"
                  name="phone"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  value={formValues.address}
                  onChange={onChange}
                  type="text"
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input
                  value={formValues.status}
                  onChange={onChange}
                  type="text"
                  name="status"
                  required
                />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input
                  onChange={(event) => setFormFile(event.target.files[0])}
                  ref={photoRef}
                  type="file"
                  name="photo"
                  required
                />
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default App;
