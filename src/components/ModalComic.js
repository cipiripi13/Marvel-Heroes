import Spinner from "./Spinner";


function ModalComic(props) {
  const toggleModal = props.toggleModal;
  const comic = props.comic;

  let jsx = null;

  if (comic) {
    // podaci su spremni
    // najpre obrada podataka
    let imgSrc = '';
    if (comic.images && comic.images[0]) {
      imgSrc = comic.images[0].path + '.' + comic.images[0].extension;
    }
    let price = '';
    // console.log(' ++++++', comic.prices[1].price);
    if (comic.prices && comic.prices[0] && comic.prices[0].price) {
      price = comic.prices[0].price;
    } else if (comic.prices && comic.prices[1] && comic.prices[1].price) {
      price = comic.prices[1].price;
    }
    let date = '';
    if (comic.dates && comic.dates[0] && comic.dates[0].date) {
      date = comic.dates[0].date;
    }
    jsx = (
      <>
        <div className="comic-info">
          <img src={imgSrc} />
          <div>
            <p>{comic.title}</p>
            <p>Price: <b>{price}</b></p>
            <p>First released: <b>{date}</b></p>
            <p>Creators: <b>{
              Array.isArray(comic.creators.items) && comic.creators.items.map((c) => {
                return (
                  <span>{c.name} </span>
                );
              })
            }</b></p>
            <p>Characters: <ul>{
              Array.isArray(comic.characters.items) && comic.characters.items.map((c) => {
                return (
                  <li>{c.name}, </li>
                );
              })
            }</ul></p>

          </div>
        </div>
      </>
    );
  } else {
    // podaci jos nisu spremni
    jsx = null;
  }



  return (
    <div className="modal-overlay">
      <div className="modal modal--comic">
        {
          comic ? (jsx) : (<Spinner />)
        }
        <div className="close" onClick={toggleModal}>&times;</div>
      </div>
    </div>
  );
}

export default ModalComic;
