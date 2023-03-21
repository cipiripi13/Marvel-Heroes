import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comics from "./Comics";
import ModalImage from "./ModalImage";


function PageCharacterInfo(props) {
  let { id } = useParams(); // uzima ID iz rute tj. browser adress bara.
  const [hero, setHero] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [comicsShown, setComicsShown] = useState(false);

  const toggleModal = () => {
    // ukljuci/iskljci modal
    if (modalOpened) {
      setModalOpened(false);
    } else {
      setModalOpened(true);
    }
  };

  const toggleComics = () => {
    // ukljuci/iskljci comics
    if (comicsShown) {
      setComicsShown(false);
    } else {
      setComicsShown(true);
    }
  }


  const fetchSingleHero = (id) => {
    console.log('sad cemo da fetchujemo za single hero sa ID-om:', id);
    const url = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=d2841df049ab6542a3a9ae1f3aa21c60&hash=48fb9c38ebc0b95080a17a472148183a' + '&id=' + id;
    axios.get(url)
      .then((response) => {
        console.log('stigao respone od get SIGNLE HERO', response);
        // validiramo response
        if (response && response.data && response.data.data && Array.isArray(response.data.data.results)) {
          // respnse je validan
          // podaci koje trazimo su u response.data.data.results
          // treba da ih sacuvamo u lokalni state ove komponente
          // setHeros(response.data.data.results); // ovo znaci molda reactu da kad zavrsi ovo iscrtavanje da izmeni state (i onda ide u drugo iscrtavanje sa novim stateom)
          // console.log(heros);
          if (response.data.data.results[0]) {
            // ukoliko smo pronasli nekog hero sa tim id-om onda je on jedini odnosno prvi u tom nisu
            setHero(response.data.data.results[0]);
          }
        }
      })
  };

  useEffect(() => {
    fetchSingleHero(id);
  }, [id]); // ako je drugi argument [] znaci prvi argument ce biti pizvan samo jednom kad se komponenta mountuje. Ako je drugi argument [id] onda useEffect prati promenjivu id i pozvace prvi argument svaki put kad se id promeni.


  // kada nemamo podatke jer ih jos uvek cekamo da stignu sa interneta
  let imgSrc = '';
  if (hero) {
    // kada podaci stignu
    imgSrc = hero.thumbnail.path + '.' + hero.thumbnail.extension;
  }
  console.log(imgSrc);

  return (
    <div className={"character-info" + (comicsShown ? " prikazani" : " skriven")}>
      <p>Character info</p>
      ID je: {id}
      {
        hero ? (
          <>
            <h1>{hero.name}</h1>
            <p>{hero.description}</p>
            <br />
            <img src={imgSrc} onClick={toggleModal} />
            <br />
          </>
        ) : (<div>Spinner...</div>)
      }
      {
        modalOpened && (<ModalImage imgSrc={imgSrc} toggleModal={toggleModal} />)
        /* neki komentar */
      }
      {
        comicsShown ? (<div onClick={toggleComics}>On</div>) : (<div onClick={toggleComics}>Off</div>)
      } Show Comics <br/>
      <label>
      <input
        type="checkbox"
        name="comicsShown"
        checked={comicsShown}
        onChange={(e)=>{setComicsShown(e.target.checked)}}
      />Show Comics</label>
      {
        comicsShown ? (<Comics  comics={hero.comics.items} />) : null
      }


    </div>
  );
}

export default PageCharacterInfo;
