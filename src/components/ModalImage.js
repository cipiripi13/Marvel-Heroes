import { useEffect } from "react";


function ModalImage(props) {
  const imgSrc = props.imgSrc;
  const toggleModal = props.toggleModal;

  
  useEffect(() => {
    // OVO CE BITI POZVANO samo jednom tj. na MOUNT

    if (!document.fullscreenElement) {
      // idemo u fullscrenn (kada budemo mountovali tj prikazali modal)
      document.documentElement.requestFullscreen();
    }

    return () => {
      // ovo ce biti pozvano na DISMOUNT
      if (document.exitFullscreen) {
        // izlazimo iz fullscreena-a (kad budemo brisali modal)
        document.exitFullscreen();
      }
    };
  }, []); // drugi argument [] znaci da ce prvi argument biti povan samo jednom
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <img src={imgSrc} />
        <div className="close" onClick={toggleModal}>&times;</div>
      </div>
    </div>
  );
}

export default ModalImage;
