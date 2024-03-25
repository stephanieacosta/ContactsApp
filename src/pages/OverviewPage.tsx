import Title from "../components/Title";
import { useApi } from "../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { type Store } from "../redux/store";
import {
  createInitialState,
  toggleFavorite,
} from "../redux/slices/contactsSlice";
import Button from "../components/Button";
import { DeleteIcon, HeartIcon } from "../icons/icons";
import Card from "../components/Card";
import { useEffect } from "react";

function OverviewPage() {
  const { contacts } = useApi();
  const cState = useSelector((state: Store) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cState.contacts.length && contacts.length) {
      dispatch(createInitialState(contacts));
    }
  }, [cState.contacts, contacts, dispatch]);

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
            .slice(0, 6)
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
