import { useParams } from "react-router-dom";


function PageCharacterInfo(props) {
  let { id } = useParams();

  return (
    <div className="character-info">
      <p>Character info</p>
      ID je: {id}
    </div>
  );
}

export default PageCharacterInfo;
