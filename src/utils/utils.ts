import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { PetProps } from '../types';

export const downloadSelectedPets = async (selectedPets: Array<PetProps>) => {
  try {
    const zip = JSZip();

    // wait for all images to be in the zip file
    await Promise.all(
      selectedPets.map(async (pet) => {
        const response = await fetch(pet.url);
        const blob = await response.blob();
        zip.file(`${pet.title}.jpg`, blob);
      })
    );

    // Generate the zip file asynchronously
    const content = await zip.generateAsync({ type: 'blob' });

    // Save the zip file
    saveAs(content, 'selectedPets.zip');
  } catch (error) {
    console.error('Error downloading images:', (error as Error).message);
  }
};
