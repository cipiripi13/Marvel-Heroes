import MyTeamMember from "./MyTeamMember";



function MyTeam(props) {
  const myTeam = props.myTeam;

  return (
    <div className="my-team">
      <h3>My Team</h3>
      <div className="my-team-list">
        {
          myTeam.map((item)=>{
            return (
              <MyTeamMember key={item.id} item={item} deleteFromMyTeam={props.deleteFromMyTeam}/>
            );
          })
        }
      </div>
    </div>
  );
}

export default MyTeam;
