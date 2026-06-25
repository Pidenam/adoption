export interface Adoptant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  situationMatrimoniale: string;
  actif: boolean;
  dateInscription: string;
}

export interface AdoptantRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone: string;
  adresse: string;
  situationMatrimoniale: string;
}