export interface Orphelin {
  id: number;
  numeroDossier: string;
  nom: string;
  prenom: string;
  age: number;
  sexe: string;
  situationFamiliale: string;
  etatSante: string;
  niveauScolarisation: string;
  regionOrigine: string;
  villeOrigine: string;
  structureAccueil: string;
  dateEnregistrement: string;
  statut: string;
  actif: boolean;
}

export interface OrphelinRequest {
  nom: string;
  prenom: string;
  age: number | null;
  sexe: string;
  situationFamiliale: string;
  etatSante: string;
  niveauScolarisation: string;
  regionOrigine: string;
  villeOrigine: string;
  structureAccueil: string;
  statut: string;
}