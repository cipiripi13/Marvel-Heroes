import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";



function PageHeros() {
  const [heros, setHeros] = useState([]);


  useEffect(() => {
    // ovo ce biti pozvano samo jednom kad se komponenta mounteuje (nacrta na ekranu)
    console.log('sad cem oda fetchujemo heros');
    const url = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=d2841df049ab6542a3a9ae1f3aa21c60&hash=48fb9c38ebc0b95080a17a472148183a';
    axios.get(url)
      .then((response) => {
        console.log('stigao respone od get heros', response);
        // validiramo response
        if (response && response.data && response.data.data && Array.isArray(response.data.data.results)) {
          // respnse je validan
          // podaci koje trazimo su u response.data.data.results
          // treba da ih sacuvamo u lokalni state ove komponente
          setHeros(response.data.data.results); // ovo znaci molda reactu da kad zavrsi ovo iscrtavanje da izmeni state (i onda ide u drugo iscrtavanje sa novim stateom)
          // console.log(heros);
        }
      })
    }, []);
    
  let placeholderArr = [];
  for (let index = 1; index <= 20; index++) {
    placeholderArr.push(null);
  }

  return (
    <div className="heros">
      <p>Heros page</p>
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
              return (<Card key={item.id} item={item}/>);
            })
        }
      </div>
    </div>
  );
}

export default PageHeros;
