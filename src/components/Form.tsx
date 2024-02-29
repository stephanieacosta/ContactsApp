import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createContact, updateContact } from "../context/slices/contactsSlice";
// import { v4 as uuid } from "uuid";

function Form() {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const contacts = useSelector((state) => state.contacts);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget.getAttribute("name")!;
    setContact({
      ...contact,
      [field]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `https://reqres.in/api/users?create`;

    const response = await fetch(url, {
      method: "POST",
    }).then((r) => r.json());

    console.log({ response });
  };

  useEffect(() => {
    if (params.id) {
      setContact(contacts.find((contact) => contact.id === params.id));
    }
  }, [params, contacts]);

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        value={contact.firstName}
        placeholder="First Name"
        autoFocus
      />
      <label>Last Name:</label>
      <input
        type="text"
        name="lastName"
        onChange={handleChange}
        value={contact.lastName}
        placeholder="Last Name"
        autoFocus
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={contact.email}
        placeholder="Email"
        autoFocus
      />
      <button type="submit" className="bg-indigo-600 px-2 py-1">
        Submit
      </button>
    </form>
  );
}

export default Form;
