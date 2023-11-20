import { useState, useEffect } from 'react';
import './App.css';
import PetCard from './components/PetCard';
import type { PetProps } from './types';

type PetsProps = Array<PetProps>;

function App() {
  const [allPets, setAllPets] = useState<PetsProps>([]);
  const [selectedPets, setSelectedPets] = useState<PetsProps>([]);

  useEffect(() => {
    getPets();
  }, []);

  async function getPets() {
    try {
      const response = await fetch('https://eulerity-hackathon.appspot.com/pets');
      const data = await response.json();
      setAllPets(data);
      console.log(data);
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
    console.log(selectedPets);
  }

  return (
    <>
      <h1>Pet Image Downloader</h1>
      <h4>Choose the images that you wish to download!</h4>

      <button onClick={() => setSelectedPets(allPets)}>Select All</button>
      <button>Clear Selection</button>
      <div className="card-selection">
        {allPets.map((pet) => (
          <PetCard pet={pet} onClick={() => selectDeselectPet(pet)} />
        ))}
      </div>
    </>
  );
}

export default App;
