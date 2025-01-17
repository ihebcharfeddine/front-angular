import { Publication } from "./Publication";
import { Event } from "./Event";
import { Tool } from "./Tool";

export interface Member {
    id:String,
    cin:String,
    nom:String,
    prenom:String,
    dateNaissance:String,
    createdDate:String,
    cv:String,
    email:String,
    password:String,
    type?:string,
    pubs:Publication[],
    events?:Event[],
    outils?:Tool[],

    //etudiant
    sujet?:String,
    dateInscription?:String,
    diplome?:String,

    //enseignant
    grade?:String,
    etablissement?:String,
}