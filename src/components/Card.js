import { useNavigate } from "react-router-dom";



function Card(props) {
  const navigate = useNavigate();
  const item = props.item;
  const addToMyTeam = props.addToMyTeam;

  const imgSrc = item.thumbnail.path + '.' + item.thumbnail.extension;

  const handleClickAdd = (e) => {
    addToMyTeam(item);
  };

  const handleClickInfo = (e) => {
    navigate("/character/" + item.id); // menjamo rutu na info stranicu pojedinanog heor
    // istovremeno i treba da upisemo u state podatke za njega
  };


  return (
    <div className="card">
      <p>Card</p>
      {item.name}
      <br />
      <img src={imgSrc} />
      <br />
      <button onClick={handleClickInfo}>Info</button>
      <button onClick={handleClickAdd}>Add</button>
    </div>
  );
}

export default Card;
