


function Card(props) {
  const item = props.item;

  const imgSrc = item.thumbnail.path + '.' + item.thumbnail.extension;


  return (
    <div className="card">
    <p>Card</p>
    {item.name}
    <br/>
    <img src={imgSrc}  />
    </div>
  );
}

export default Card;
