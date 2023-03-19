import CardPlaceholder from "./CardPlaceholder";



function PageHeros() {

  let placeholderArr = [];
  for (let index = 1; index <= 20; index++) {
    placeholderArr.push(null);
  }

  return (
    <div className="heros">
      <p>Heros page</p>
      <div className="heros-list">
        {
          placeholderArr.map((item) => {
            return (<CardPlaceholder />);
          })
        }
      </div>
    </div>
  );
}

export default PageHeros;
