import { useState, useEffect } from 'react';
import './App.css';
import PetCard from './components/PetCard';
import type { PetProps } from './types';

type PetsProps = Array<PetProps>;

enum SortByValue {
  None,
  Alphabetically,
  ReverseAlphabetically,
}

function App() {
  const [allPets, setAllPets] = useState<PetsProps>([]);
  const [selectedPets, setSelectedPets] = useState<PetsProps>([]);
  const [search, setSearch] = useState('');
  const [sortByValue, setSortByValue] = useState<SortByValue>(SortByValue.None);

  useEffect(() => {
    getPets();
  }, []);

  async function getPets() {
    try {
      const response = await fetch('https://eulerity-hackathon.appspot.com/pets');
      const data = await response.json();
      setAllPets(data);
    } catch (e) {
      console.log(e);
    }
  }

  function selectDeselectPet(pet: PetProps) {
    if (selectedPets.find((curPet) => curPet.url === pet.url)) {
      setSelectedPets(selectedPets.filter((curPet) => curPet.url !== pet.url));
    } else {
      setSelectedPets([...selectedPets, pet]);
    }
  }

  const downloadSelectedPets = () => {
    selectedPets.forEach(async (curPet) => {
      try {
        const response = await fetch(curPet.url);
        const blob = await response.blob();

        // Create a download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${curPet.title}.jpg`;

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading image:', (error as Error).message);
      }
    });
  };

  return (
    <>
      <h1>Pet Image Downloader</h1>
      <h4>Choose the images that you wish to download!</h4>

      <div className="actions-bar">
        <button onClick={() => setSelectedPets(allPets)}>Select All</button>
        <button onClick={() => setSelectedPets([])}>Clear Selection</button>
        <button onClick={() => downloadSelectedPets()}>Download Selection</button>
        <select value={sortByValue} onChange={(e) => setSortByValue(parseInt(e.target.value))}>
          <option value={SortByValue.None}>No Sorting</option>
          <option value={SortByValue.Alphabetically}>Sort By A-Z</option>
          <option value={SortByValue.ReverseAlphabetically}>Sort By Z-A</option>
        </select>
        <div className="search-wrapper">
          <label htmlFor="search">Search: </label>
          <input name="search" type="text" onChange={(e) => setSearch(e.target.value.trim())} />
        </div>
      </div>
      <div className="card-selection">
        {/* filter, sort, and map pets depending on app state */}
        {allPets
          .filter(
            (curPet) =>
              curPet.title.toLowerCase().includes(search.toLowerCase()) ||
              curPet.description.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => {
            if (sortByValue === SortByValue.Alphabetically) {
              return a.title.localeCompare(b.title);
            } else if (sortByValue === SortByValue.ReverseAlphabetically) {
              return b.title.localeCompare(a.title);
            }
            return 0;
          })
          .map((pet) => (
            <PetCard
              pet={pet}
              onClick={() => selectDeselectPet(pet)}
              isSelected={selectedPets.indexOf(pet) > -1}
            />
          ))}
      </div>
    </>
  );
}

export default App;
