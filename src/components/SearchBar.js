import { useState } from "react";



function SearchBar(props) {
  const fetchSearchResults = props.fetchSearchResults;
  const [search, setSearch] = useState('abc');

  const handleChange = (e) => {
    const target = e.target; // html element na kojem se event desio
    const value = target.value; // value iz input polja na kojem se desio event
    setSearch(value);
  };

  const handleClick = (e) => {
    console.log('kliknuli smo da pretrazimo na rec', search);
    if (search.trim() !== '') {
      // pretrazujemo
      fetchSearchResults(search.trim());
    }
  };

  let disabled = true;
  if (search.trim() !== '') {
    disabled = false; // ukljuceno
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
      >Search</button>
    </div>
  );
}

export default SearchBar;
