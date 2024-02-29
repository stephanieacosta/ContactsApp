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
import { DeleteIcon, HeartIcon } from "../icons/icons";
import Card from "../components/Card";

function OverviewPage() {
  const { contacts } = useApi();
  console.log({ contacts: contacts.length });
  const cState = useSelector((state: Store) => state.contacts);
  const dispatch = useDispatch();

  if (!cState.contacts.length && contacts.length) {
    dispatch(createInitialState(contacts));
  }

  return (
    <div>
      <Title title="Favorites" />
      {!!cState.contacts.length && (
        <div className="cardlist">
          {cState.contacts
            .filter((contact) => contact.favorite)
            .map((contact) => (
              <Card key={contact.id} {...contact}>
                <Button
                  color="red"
                  onClick={() => dispatch(toggleFavorite({ id: contact.id }))}
                >
                  <DeleteIcon />
                  REMOVE
                </Button>
              </Card>
            ))}
        </div>
      )}
      <Title title="Contact List" />
      {!!cState.contacts.length && (
        <div className="cardlist">
          {cState.contacts
            .filter((contact) => !contact.favorite)
            .map((contact) => (
              <Card key={contact.id} {...contact}>
                <Button
                  color="green"
                  onClick={() => dispatch(toggleFavorite({ id: contact.id }))}
                >
                  <HeartIcon />
                </Button>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

export default OverviewPage;
