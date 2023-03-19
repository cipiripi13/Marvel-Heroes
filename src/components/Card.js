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
    navigate("/character/" + item.id);
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
