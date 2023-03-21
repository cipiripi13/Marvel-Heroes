import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";



function PageHeros(props) {
  const heros = props.heros;
      
  let placeholderArr = [];
  for (let index = 1; index <= 20; index++) {
    placeholderArr.push(null);
  }

  return (
    <div className="heros">
      <p style={{fontSize: '20px',}}>All Heros Page</p>
      <div className="heros-list">
        {
          heros.length === 0 &&
            placeholderArr.map((item, index) => {
              return (<CardPlaceholder key={index} />);
            })
        }
        {
          heros.length > 0 &&
            heros.map((item) => {
              return (<Card key={item.id} item={item} addToMyTeam={props.addToMyTeam}/>);
            })
        }
      </div>
    </div>
  );
}

export default PageHeros;
