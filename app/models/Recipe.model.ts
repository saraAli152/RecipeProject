import { Ingradients } from "./Ingradients.model";

export class Recipe {
 
  public name: string;
  public description: string;
  public imageUrl: string;
  public ingradients: Ingradients[];
  constructor(
   
    name: string,
    description: string,
    imageUrl: string,
    ingradients: Ingradients[]
  ) {
   
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.ingradients = ingradients;
  }
}
