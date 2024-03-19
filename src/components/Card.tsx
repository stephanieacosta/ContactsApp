interface Props {
  first_name: string;
  last_name: string;
  email: string;
  favorite: boolean;
  children: React.ReactNode;
  avatar: string;
}

function Card({
  first_name,
  last_name,
  email,
  favorite,
  children,
  avatar,
}: Props) {
  return (
    <div className="card">
      <img src={avatar} className={`avatar ${favorite ? "circle" : ""}`}></img>
      <div className="fullname">
        <p>{first_name}</p>
        <p>{last_name}</p>
      </div>
      {/* <p>favorite: {favorite ? "Si" : "No"}</p> */}
      <p className="email">{email}</p>
      <div className="divisor"></div>
      {children}
    </div>
  );
}

export default Card;
