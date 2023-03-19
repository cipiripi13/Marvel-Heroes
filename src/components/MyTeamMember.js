


function MyTeamMember(props) {
  const item = props.item;
  const deleteFromMyTeam = props.deleteFromMyTeam;

  const imgSrc = item.thumbnail.path + '.' + item.thumbnail.extension;

  const handleClickDelete = (e) => {
    deleteFromMyTeam(item.id);
  };

  return (
    <div className="member">
      <div className="image">
        <img src={imgSrc} />
      </div>
      <div className="title" onClick={handleClickDelete}>
        {item.name} <button>&times;</button>
      </div>
    </div>
  );
}

export default MyTeamMember;
