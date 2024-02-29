import CardList from "../components/CardList";
import Title from "../components/Title";
import { useApi } from "../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { type Store } from "../context/store";
import {
  createInitialState,
  toggleFavorite,
} from "../context/slices/contactsSlice";
import Button from "../components/Button";
import { DeleteIcon } from "../icons/icons";
import Card from "../components/Card";

function FavoritesPage() {
  const { contacts } = useApi();
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
    </div>
  );
}

export default FavoritesPage;
