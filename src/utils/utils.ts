import type { PetProps } from '../types';

export const downloadSelectedPets = (selectedPets: Array<PetProps>) => {
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
