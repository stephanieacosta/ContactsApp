interface Props {
  title: string;
}

function Title({ title }: Props) {
  return (
    <div className="title-container">
      <h3>{title}</h3>
      <div></div>
    </div>
  );
}

export default Title;
