import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { onCloseDateModal } from "../redux/slices/uiSlice";
import { createContact } from "../redux/slices/contactsSlice";
import { type Store } from "../redux/store";

Modal.setAppElement("#root");

export const ContactModal = () => {
  const { isDateModalOpen } = useSelector((state: Store) => state.ui);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    favorite: false,
    avatar: "/avatarglobant.png",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormValues({
      ...formValues,
      [name]: newValue,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.first_name.length <= 0) return;
    if (formValues.last_name.length <= 0) return;
    if (formValues.email.length <= 0) return;

    const url = `https://reqres.in/api/users`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      const { createdAt, ...restData } = data;

      dispatch(createContact(restData));
    } catch (error) {
      console.error("Error:", error);
    }

    dispatch(onCloseDateModal());

    setFormValues({
      first_name: "",
      last_name: "",
      email: "",
      favorite: false,
      avatar: "/avatarglobant.png",
    });
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={() => {
        dispatch(onCloseDateModal());
      }}
      className="formmodal"
    >
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="first_name"
          onChange={handleChange}
          value={formValues.first_name}
          placeholder="First Name"
          autoFocus
        />
        <input
          type="text"
          name="last_name"
          onChange={handleChange}
          value={formValues.last_name}
          placeholder="Last Name"
          autoFocus
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formValues.email}
          placeholder="Email"
          autoFocus
        />
        <div className="div-favorites">
          <label> Enable like favorite</label>
          <input
            type="checkbox"
            name="favorite"
            onChange={handleChange}
            checked={formValues.favorite}
          />
        </div>
        <button type="submit">SAVE</button>
      </form>
    </Modal>
  );
};
