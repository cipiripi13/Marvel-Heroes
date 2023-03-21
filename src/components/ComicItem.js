import axios from "axios";
import { useEffect, useState } from "react";
import ModalComic from "./ModalComic";
import Spinner from "./Spinner";


function ComicItem(props) {
  const item = props.item;
  const resourceURI = item.resourceURI;
  const [comic, setComic] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => {
    // ukljuci/iskljci modal
    if (modalOpened) {
      setModalOpened(false);
    } else {
      setModalOpened(true);
    }
  };

  const fetchSingleComic = (resourceURI) => {
    console.log('sad cemo da fetchujemo za COMIC:', resourceURI);
    const url = resourceURI + '?ts=1&apikey=d2841df049ab6542a3a9ae1f3aa21c60&hash=48fb9c38ebc0b95080a17a472148183a';
    axios.get(url)
      .then((response) => {
        console.log('stigao respone od get COMIC', response);
        // validiramo response
        if (response && response.data && response.data.data && Array.isArray(response.data.data.results)) {
          // respnse je validan
          // podaci koje trazimo su u response.data.data.results
          // treba da ih sacuvamo u lokalni state ove komponente
          // setHeros(response.data.data.results); // ovo znaci molda reactu da kad zavrsi ovo iscrtavanje da izmeni state (i onda ide u drugo iscrtavanje sa novim stateom)
          // console.log(heros);
          if (response.data.data.results[0]) {
            // ukoliko smo pronasli nekog hero sa tim id-om onda je on jedini odnosno prvi u tom nisu
            setComic(response.data.data.results[0]);
          }
        }
      })
  };

  useEffect(() => {
    fetchSingleComic(resourceURI);
  }, [resourceURI]);


  return (
    <>
      <div className="comic-card" onClick={toggleModal}>
        {item.name}
        {
          comic ? (<div>{/* nista smao ime i spinner */}</div>) : (<Spinner />)
        }

      </div>
      {
        modalOpened ? (<ModalComic toggleModal={toggleModal} comic={comic} />) : (null)
      }

    </>
  );
}

export default ComicItem;
