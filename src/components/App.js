import PageHeros from './PageHeros';
import './App.css';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [heros, setHeros] = useState([]);

  const fetchCharacters = () => {
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
  };

  const fetchSearchResults = (q) => {
    console.log('sad cemo da pretrazujemo na rec', q);
    const url = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=d2841df049ab6542a3a9ae1f3aa21c60&hash=48fb9c38ebc0b95080a17a472148183a' + '&name=' + q;
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
  };



  useEffect(() => {
    // ovo ce biti pozvano samo jednom kad se komponenta mounteuje (nacrta na ekranu)
    console.log('useEffect kad se komponenta mountuje - sad cemo da fetchujemo heros');
    fetchCharacters();
  }, []);



  return (
    <div className="App">
      <div onClick={fetchCharacters}>LOGO</div>
      <SearchBar fetchSearchResults={fetchSearchResults} />
      <PageHeros heros={heros} />
    </div>
  );
}

export default App;
