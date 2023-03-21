

function ComicItem(props) {
  const item = props.item;

  // TODO sad mora da fethujemo podatke od ovog stripa


  return (
    <div className="comic-card">
      {item.name}
    </div>
  );
}

export default ComicItem;
