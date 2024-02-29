import CardList from "../components/CardList";
import Title from "../components/Title";
import { useApi } from "../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { type Store } from "../context/store";
import {
  createInitialState,
  deleteContact,
  toggleFavorite,
} from "../context/slices/contactsSlice";
import Button from "../components/Button";
import { HeartIcon, RubbishBinIcon } from "../icons/icons";
import Card from "../components/Card";

function ContactsPage() {
  const { contacts } = useApi();
  console.log({ contacts: contacts.length });
  const cState = useSelector((state: Store) => state.contacts);
  const dispatch = useDispatch();

  if (!cState.contacts.length && contacts.length) {
    dispatch(createInitialState(contacts));
  }

  return (
    <div>
      <Title title="Contact List" />
      {!!cState.contacts.length && (
        <div className="cardlist">
          {cState.contacts
            .filter((contact) => contact)
            .map((contact) => (
              <Card key={contact.id} {...contact}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    gap: "1rem",
                  }}
                >
                  <Button
                    color="green"
                    onClick={() => dispatch(toggleFavorite({ id: contact.id }))}
                  >
                    <HeartIcon />
                  </Button>
                  <Button
                    color="red"
                    onClick={() => dispatch(deleteContact({ id: contact.id }))}
                  >
                    <RubbishBinIcon />
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

export default ContactsPage;
