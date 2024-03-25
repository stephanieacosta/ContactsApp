import Card from "./Card";
import type { IContact } from "../redux/slices/contactsSlice";

interface ICardList {
  contactsArr: IContact["contacts"];
  children: React.ReactNode;
}

function CardList({ contactsArr, children }: ICardList) {
  return (
    <div className="cardlist">
      {contactsArr.map((contact) => (
        <Card key={contact.id} {...contact}>
          {children}
        </Card>
      ))}
    </div>
  );
}

export default CardList;
