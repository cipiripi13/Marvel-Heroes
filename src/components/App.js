import PageHeros from './PageHeros';
import './App.css';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyTeam from './MyTeam';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PageCharacterInfo from './PageCharacterInfo';
import { Footer } from './Footer';

function App() {
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const [heros, setHeros] = useState([]);
  const [myTeam, setMyTeam] = useState([]);

  useEffect(() => {
    // INICIJALIZACIJA
    // citamo iz local storage ranije sacuvan myTeam ukoliko ga uopste ima
    try {
      const json = window.localStorage.getItem("myteam");
      const previouslyStoredMyTeam = JSON.parse(json);
      if (Array.isArray(previouslyStoredMyTeam)) {
        // sve je u redu proslo i prociatli smo podatak i uverili se da je podatak ispravan Array
        setMyTeam(previouslyStoredMyTeam); // upisujemo ranije (pre restartovanja) sacuvan myTeam u aktuelni state
      }
    } catch (error) {

    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    // sada useEffect prati promenjivu myTeam
    // ovo ce biti pozvano sam okad se myTeam promeni

    // 8 - Extend functionality of “My Team” list so it can be preserved even when page is reloaded
    // zapisujemo myTeam u localStorage stanu memoriju browsera
    try {
      if (initialized === true) {
        // zapisujemo aktuelni state u localStorage samo ako je vec obavljena inicijalizacija
        const json = JSON.stringify(myTeam); // pretvaramo myTeam u json string
        window.localStorage.setItem("myteam", json);
        /*
        Dakle, pored toga sto podatak smo vec upisali u state myTeam ovaj useEffect ce da taj podatak TAKODJE UPISE I U LOCALSTORAGE da b ipreziveo i gasenje kompjutera.
        */
      }
    } catch (error) {

    }
  }, [myTeam, initialized]);

// glavi fetch podataka
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
          setHeros(response.data.data.results); // ovo znaci molba reactu da kad zavrsi ovo iscrtavanje da izmeni state (i onda ide u drugo iscrtavanje sa novim stateom)
          // console.log(heros);
        }
      })
  };

  // fetch na pretragu
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


  const clickLogo = () => {
    fetchCharacters(); // fetvhujemo pocetn ispisak charactera
    navigate("/"); // i takodje oldazimo na pocetnu stranu
  };

  return (
    <>
      <div className="App">
        <div onClick={clickLogo} className='logo'>Marvel Heros </div>
        <div>

          <Routes>
            <Route path="/" element={
              <>
                <SearchBar fetchSearchResults={fetchSearchResults} />
                <MyTeam myTeam={myTeam} deleteFromMyTeam={deleteFromMyTeam} />
                <PageHeros heros={heros} addToMyTeam={addToMyTeam} />
              </>
            }
            />
            <Route path="/character/:id" element={<PageCharacterInfo />} />
            <Route path="*" element={<div>ROUTE NOT FOUND</div>} />
            
          </Routes>
        </div>
        <div onClick={clickLogo} className='logo'><span>&#169;</span> Katarina Krstić</div>
      </div>
    </>
  );
}

export default App;
