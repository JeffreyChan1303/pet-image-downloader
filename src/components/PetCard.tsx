import React from 'react';
import './PetCard.css';
import type { PetProps } from '../types';

type PetCardProps = {
  pet: PetProps;
  onClick: () => void;
  isSelected: boolean;
};

const PetCard: React.FC<PetCardProps> = ({ pet, onClick, isSelected }) => {
  return (
    <div className={`pet-card ${isSelected && 'selected'}`} onClick={onClick}>
      <h3>Title: {pet.title}</h3>
      <h4>Details: {pet.description}</h4>
      <img className="pet-image" height="200" src={pet.url} />
      <p>Created Date: {pet.created}</p>
    </div>
  );
};

export default PetCard;
