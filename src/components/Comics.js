import ComicItem from "./ComicItem";


function Comics(props) {
  const comics = props.comics;


  return (
    <div className="comics-list">
      {
        comics.map((item, index) =>{
          return (
            <ComicItem key={index} item={item} />
          )
        })
      }
    </div>
  );
}

export default Comics;
