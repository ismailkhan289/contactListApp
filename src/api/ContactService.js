import axios from "axios";

//the first we need to define the API_URL to the server
const API_URL = "http://localhost:8080/contacts";

export async function saveContact(contact) {
  return await axios.post(API_URL, contact);
}

export async function getContacts(page = 0, size = 10) {
  return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}
export async function getContact(id) {
  return await axios.get(`${API_URL}/${id}`);
}
export async function updatedContact(contact) {
  return await axios.post(API_URL, contact);
}

export async function updatePhoto(formData) {
  return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteContact(id) {
  return await axios.delete(`${API_URL}/${id}`);
}
