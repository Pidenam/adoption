export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  actif: boolean;
  roleNom: string; 
   dateCreation: string;
}

export interface UtilisateurRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone: string;
  roleId: number;  
}