import "./App.css";
import { useEffect, useState } from "react";
import { getContacts } from "./api/ContactService";
import Header from "./Components/Header";

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  //when the page is rendered we will throw this function using useEffect
  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
    <Header />
    </>
  );
}

export default App;
