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

      <div
        className="actions-bar"
        style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '2rem' }}
      >
        <button onClick={() => setSelectedPets(allPets)}>Select All</button>
        <button onClick={() => setSelectedPets([])}>Clear Selection</button>
        <button onClick={() => downloadSelectedPets()}>Download Selection</button>
      </div>
      <div className="card-selection">
        {allPets.map((pet) => (
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
