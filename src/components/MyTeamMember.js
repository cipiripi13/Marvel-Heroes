import { useNavigate } from "react-router-dom";



function MyTeamMember(props) {
  const navigate = useNavigate();
  const item = props.item;
  const deleteFromMyTeam = props.deleteFromMyTeam;

  const imgSrc = item.thumbnail.path + '.' + item.thumbnail.extension;

  const handleClickDelete = (e) => {
    deleteFromMyTeam(item.id);
  };

  const handleClickInfo = (e) => {
    navigate("/character/" + item.id); // menjamo rutu na info stranicu pojedinanog heor
    // istovremeno i treba da upisemo u state podatke za njega
  };

  return (
    <div className="member">
      <div className="image">
        <img src={imgSrc} onClick={handleClickInfo} />
      </div>
      <div className="title" onClick={handleClickDelete}>
        {item.name} <button>&times;</button>
      </div>
    </div>
  );
}

export default MyTeamMember;
