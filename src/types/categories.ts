import { Products } from "./products";
import { BreadcrumbSubcategoria } from "./subcategories";

export type CategoryResponse = {
  name: string
  title: string
  category_id: string
}

export type CategoryType = {
   name: string
   title: string
   image: string
   image_name: string
   category_id: string
}

export interface CategoriesInterface {
  [category: string]: CategoriesDetails
}

export type CategoriesDetails = {
  name: string
  title: string
  link: string
  banner?: string
  icon?: string
}

export const Category: CategoriesInterface = {
    ELECTRONICS: {
      name: 'electronics',
      title: 'Electronics',
      link: '/electronics'
    },
    HOME_APPLIANCES: {
      name: 'home_appliances',
      title: 'Home Appliances',
      link: '/home-appliances'
    },
    FASHION: {
      name: 'fashion',
      title: 'Fashion',
      link: '/fashion'
    },
    SPORTS: {
      name: 'sports',
      title: 'Sports',
      link: '/sports'
    },
    BOOKS_AND_MEDIA: {
      name: 'books_and_media',
      title: 'Books and Media',
      link: '/books-and-media'
    },
    TRAVEL: {
      name: 'travel',
      title: 'Travel',
      link: '/travel'
    }
}

export const CategoryEnum = {
  ELECTRONICS: Category.ELECTRONICS.name,
  HOME_APPLIANCES: Category.HOME_APPLIANCES.name,
  FASHION: Category.FASHION.name,
  SPORTS: Category.SPORTS.name,
  BOOKS_AND_MEDIA: Category.BOOKS_AND_MEDIA.name,
  TRAVEL: Category.TRAVEL.name
};


export interface AgregacaoPorCategoria {
  [categoria: string]: Products;
}

export interface ContagemPorCategoria {
  [categoria: string]: number;
}

export interface BreadcrumbCategoria {
  nome: keyof typeof Category
  link: string
}

export interface BreadcrumbsType {
  categoria: BreadcrumbCategoria
  subcategorias: BreadcrumbSubcategoria[]
}