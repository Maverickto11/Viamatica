import { Product } from "./Product";

export interface Category {
    CategoriaId: number;
    Nombre: string;
    imagen: string;
    Productos: Product[];
  }