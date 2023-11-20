import { useState, useEffect } from 'react';
import './App.css';

type petProps = Array<{
  title: string;
  description: string;
  created: string;
  url: string;
}>;

function App() {
  const [pets, setPets] = useState<petProps>([]);

  useEffect(() => {
    getPets();
  }, []);

  async function getPets() {
    try {
      const response = await fetch('https://eulerity-hackathon.appspot.com/pets');
      const data = await response.json();
      setPets(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      {pets.map((pet) => (
        <div>
          <h3>{pet.title}</h3>
          <h4>{pet.description}</h4>
          <p>{pet.created}</p>
          <img width="200" src={pet.url} />
        </div>
      ))}
    </>
  );
}

export default App;
