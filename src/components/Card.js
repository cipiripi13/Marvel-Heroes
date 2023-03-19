


function Card(props) {
  const item = props.item;
  const addToMyTeam = props.addToMyTeam;

  const imgSrc = item.thumbnail.path + '.' + item.thumbnail.extension;

  const handleClickAdd = (e)=>{
    addToMyTeam(item);
  };


  return (
    <div className="card">
    <p>Card</p>
    {item.name}
    <br/>
    <img src={imgSrc}  />
    <br/>
    <button>Info</button>
    <button onClick={handleClickAdd}>Add</button>
    </div>
  );
}

export default Card;
