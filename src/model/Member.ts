import { Publication } from './Publication';
import { Tool } from './Tool';
import { Event } from './Event';

export interface Member {
  id: number; // Changed from String to string
  cin: string; // Changed from String to string
  name: string; // Changed from name to nom to match the data
  prenom: string; // Changed from String to string
  dateNaissance: string; // Changed from String to string
  photo: string | null; // Added photo field to match the data
  cv: string; // Changed from String to string
  email: string; // Changed from String to string
  password: string; // Changed from String to string
  pubs: Publication[] | null; // Changed to match the data (null is possible)
  events?: Event[] | null; // Changed to match the data (null is possible)
  outils?: Tool[] | null; // Changed to match the data (null is possible)

  dateInscription?: string; // Changed from String to string
  diplome?: string; // Changed from String to string

  // Enseignant fields
  grade?: string; // Changed from String to string
  etablissement?: string; // Changed from String to string
}
