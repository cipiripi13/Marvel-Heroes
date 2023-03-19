import PageHeros from './PageHeros';
import './App.css';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyTeam from './MyTeam';

function App() {
  const [heros, setHeros] = useState([]);
  const [myTeam, setMyTeam] = useState([]);

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


  const addToMyTeam = (hero) => {
    // 6 - When user click “Add” button character should be added to “My Team” list (you cannot add same character two times)
    // najpre provera da li taj vec postoji
    let alreadyExist = false;
    myTeam.forEach((item) => {
      if (hero.id === item.id) {
        // vec imamo item sa istim id
        alreadyExist = true;
      }
    });
    if (alreadyExist === false) {
      // ako ne postoji, dodajemo ga sad
      setMyTeam([...myTeam, hero]);
    } else {
      window.alert('you cannot add same character two times');
    }
  };


  const deleteFromMyTeam = (id) => {
    const updatedMyTeam = myTeam.filter((item) => {
      if (item.id === id) {
        // to je taj kojeg brisemo
        return false; // ne ulazi u sastav novog niza
      }
      return true; // svi ostali ostaju u nizu
    });
    setMyTeam(updatedMyTeam); // upisujemo u state modifikovani niz u kojem vise nema onog kojeg smo obrisali
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
      <MyTeam myTeam={myTeam} deleteFromMyTeam={deleteFromMyTeam} />
      <PageHeros heros={heros} addToMyTeam={addToMyTeam} />
    </div>
  );
}

export default App;
