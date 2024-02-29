interface IButton {
  color: "green" | "red";
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ color, children, onClick }: IButton) {
  return (
    <button
      className={`button ${
        color === "green" ? "button-success" : "button-danger"
      }`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
