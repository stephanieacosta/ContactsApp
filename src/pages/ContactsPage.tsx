import Title from "../components/Title";
import { useApi } from "../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { type Store } from "../redux/store";
import {
  createInitialState,
  deleteContact,
  toggleFavorite,
} from "../redux/slices/contactsSlice";
import Button from "../components/Button";
import { DeleteIcon2, HeartIcon, RubbishBinIcon } from "../icons/icons";
import Card from "../components/Card";
import { useEffect, useState } from "react";

function ContactsPage() {
  const { contacts } = useApi();
  const cState = useSelector((state: Store) => state.contacts);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // o en 0
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const lowerLimit = (currentPage - 1) * itemsPerPage; // si currentPage = 1: lowerLimit = 0, currentPage = 2: lowerLimit = 10
  const upperLimit = lowerLimit + itemsPerPage; // 10, 20

  const totalPages = Math.ceil(cState.contacts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (!cState.contacts.length && contacts.length) {
      dispatch(createInitialState(contacts));
    }
  }, [cState.contacts, contacts, dispatch]);

  return (
    <div>
      <Title title="Contact List" />
      {!!cState.contacts.length && (
        <div className="cardlist">
          {cState.contacts
            .filter((contact) => contact)
            .slice(lowerLimit, upperLimit)
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
                    color={contact.favorite ? "red" : "green"}
                    onClick={() => dispatch(toggleFavorite({ id: contact.id }))}
                  >
                    {contact.favorite ? <DeleteIcon2 /> : <HeartIcon />}
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
      {totalPages > 1 && (
        <div className="pagination">
          <span style={{ margin: "0 1rem" }}>
            {currentPage} de {totalPages}
          </span>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt;
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default ContactsPage;
