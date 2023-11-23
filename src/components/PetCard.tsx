import React from 'react';
import type { PetProps } from '../types';
import styled from 'styled-components';

type PetCardProps = {
  pet: PetProps;
  onClick: () => void;
  isSelected: boolean;
};

const PetCardStyled = styled.div`
  // position: relative;
  padding: 1rem;
  border-radius: 1rem;
  border: solid 2px white;
  max-width: 20rem;
  cursor: pointer;
  opacity: 0.85;
  &:hover {
    opacity: 1;
  }
  &.selected {
    border-color: #646cff;
  }
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  // object-fit: contain;
`;

const PetCard: React.FC<PetCardProps> = ({ pet, onClick, isSelected }) => {
  return (
    <PetCardStyled className={isSelected ? 'selected' : ''} onClick={onClick}>
      <h3>Title: {pet.title}</h3>
      <h4>Details: {pet.description}</h4>
      <StyledImage className="pet-image" src={pet.url} />
      <p>Created Date: {pet.created}</p>
    </PetCardStyled>
  );
};

export default PetCard;
