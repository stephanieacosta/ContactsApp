import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { onCloseDateModal, onOpenDateModal } from "../context/slices/uiSlice";
import { createContact } from "../context/slices/contactsSlice";
import { type Store } from "../context/store";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen } = useSelector((state: Store) => state.ui);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.currentTarget.getAttribute("name")!;
    setFormValues({
      ...formValues,
      [field]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.first_name.length <= 0) return;

    const url = `https://reqres.in/api/create`;

    const { createdAt, ...data } = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then((r) => r.json());

    // TODO:
    dispatch(createContact(data));
    dispatch(onCloseDateModal());
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={() => dispatch(onCloseDateModal())}
      style={customStyles}
    >
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          onChange={handleChange}
          value={formValues.first_name}
          placeholder="First Name"
          autoFocus
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          onChange={handleChange}
          value={formValues.last_name}
          placeholder="Last Name"
          autoFocus
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formValues.email}
          placeholder="Email"
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};
