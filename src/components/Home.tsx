import { useState } from 'react';
import PetCard from './PetCard';
import type { PetProps } from '../types';
import UseFetch from '../utils/UseFetch';
import styled from 'styled-components';
import { downloadSelectedPets } from '../utils/utils';

type PetsProps = Array<PetProps>;

enum SortByValue {
  None,
  Alphabetically,
  ReverseAlphabetically,
}

const ActionsBarStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const SearchWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CardSelectionStyled = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;
const LabelStyled = styled.label`
  align-self: center;
  font-weight: 500;
  font-size: 1.125rem;
`;

const ButtonStyled = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  &:hover {
    border-color: plum;
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const Home = () => {
  const { data: allPets, isLoading } = UseFetch<PetsProps>(
    'https://eulerity-hackathon.appspot.com/pets'
  );
  const [selectedPets, setSelectedPets] = useState<PetsProps>([]);
  const [search, setSearch] = useState<string>('');
  const [sortByValue, setSortByValue] = useState<SortByValue>(SortByValue.None);

  function selectDeselectPet(pet: PetProps) {
    if (selectedPets.find((curPet) => curPet.url === pet.url)) {
      setSelectedPets(selectedPets.filter((curPet) => curPet.url !== pet.url));
    } else {
      setSelectedPets([...selectedPets, pet]);
    }
  }

  return (
    <>
      <h1>Pet Image Downloader</h1>
      <h4>Choose the images that you wish to download!</h4>

      {isLoading ? (
        <h1>PETS ARE LOADING!!!!</h1>
      ) : (
        <>
          <ActionsBarStyled>
            <ButtonStyled onClick={() => setSelectedPets(allPets || [])}>Select All</ButtonStyled>
            <ButtonStyled onClick={() => setSelectedPets([])}>Clear Selection</ButtonStyled>
            <ButtonStyled onClick={() => downloadSelectedPets(selectedPets)}>
              Download Selection
            </ButtonStyled>
            <select value={sortByValue} onChange={(e) => setSortByValue(parseInt(e.target.value))}>
              <option value={SortByValue.None}>No Sorting</option>
              <option value={SortByValue.Alphabetically}>Sort By A-Z</option>
              <option value={SortByValue.ReverseAlphabetically}>Sort By Z-A</option>
            </select>
            <SearchWrapperStyled>
              <LabelStyled htmlFor="search">Search: </LabelStyled>
              <input name="search" type="text" onChange={(e) => setSearch(e.target.value.trim())} />
            </SearchWrapperStyled>
          </ActionsBarStyled>
          <CardSelectionStyled>
            {/* filter, sort, and map pets depending on app state */}
            {allPets
              ?.filter(
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
                  key={pet.url}
                />
              ))}
          </CardSelectionStyled>
        </>
      )}
    </>
  );
};

export default Home;
