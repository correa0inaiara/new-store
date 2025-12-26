import { Products } from "./products";

export type CategoryType = {
   name: string
   title: string
   image: string
   category_id: string
}

export type SubcategoryType = {
  name: string
  title: string
  image: string
  subcategory_id: string
  category_id: string
  category: CategoryType
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

export interface SubcategoriesInterface {
  [subcategory: string]: SubcategoryDetails
}

export type SubcategoryDetails = {
  name: string
  title: string
  link: string
  banner?: string
  icon?: string
  category: keyof typeof Category // Referência à categoria pai
}

export const Subcategory: SubcategoriesInterface = {
  SMARTPHONES: {
    name: 'smartphones',
    title: 'Smartphones',
    link: '/electronics/smartphones',
    category: 'ELECTRONICS'
  },
  LAPTOPS: {
    name: 'laptops',
    title: 'Laptops',
    link: '/electronics/laptops',
    category: 'ELECTRONICS'
  },
  AUDIO: {
    name: 'audio',
    title: 'Audio',
    link: '/electronics/audio',
    category: 'ELECTRONICS'
  },
  GAMING: {
    name: 'gaming',
    title: 'Gaming',
    link: '/electronics/gaming',
    category: 'ELECTRONICS'
  },
  KITCHEN: {
    name: 'kitchen',
    title: 'Kitchen',
    link: '/home-appliances/kitchen',
    category: 'HOME_APPLIANCES'
  },
  CLEANING: {
    name: 'cleaning',
    title: 'Cleaning',
    link: '/home-appliances/cleaning',
    category: 'HOME_APPLIANCES'
  },
  CLIMATE: {
    name: 'climate',
    title: 'Climate',
    link: '/home-appliances/climate',
    category: 'HOME_APPLIANCES'
  },
  MENS_CLOTHING: {
    name: 'mens_clothing',
    title: 'Mens Clothing',
    link: '/fashion/mens-clothing',
    category: 'FASHION'
  },
  WOMENS_CLOTHING: {
    name: 'womens_clothing',
    title: 'Womens Clothing',
    link: '/fashion/womens-clothing',
    category: 'FASHION'
  },
  SHOES: {
    name: 'shoes',
    title: 'Shoes',
    link: '/fashion/shoes',
    category: 'FASHION'
  },
  ACCESSORIES: {
    name: 'accessories',
    title: 'Accessories',
    link: '/fashion/accessories',
    category: 'FASHION'
  },
  FITNESS: {
    name: 'fitness',
    title: 'Fitness',
    link: '/sports/fitness',
    category: 'SPORTS'
  },
  OUTDOOR: {
    name: 'outdoor',
    title: 'Outdoor',
    link: '/sports/outdoor',
    category: 'SPORTS'
  },
  TEAM_SPORTS: {
    name: 'team_sports',
    title: 'Team Sports',
    link: '/sports/team-sports',
    category: 'SPORTS'
  },
  BOOKS: {
    name: 'books',
    title: 'Books',
    link: '/books-and-media/books',
    category: 'BOOKS_AND_MEDIA'
  },
  MUSIC: {
    name: 'music',
    title: 'Music',
    link: '/books-and-media/music',
    category: 'BOOKS_AND_MEDIA'
  },
  MOVIES: {
    name: 'movies',
    title: 'Movies',
    link: '/books-and-media/movies',
    category: 'BOOKS_AND_MEDIA'
  }
}

export const SubcategoryEnum = {
   SMARTPHONES: Subcategory.SMARTPHONES.name,
   LAPTOPS: Subcategory.LAPTOPS.name,
   AUDIO: Subcategory.AUDIO.name,
   GAMING: Subcategory.GAMING.name,
   KITCHEN: Subcategory.KITCHEN.name,
   CLEANING: Subcategory.CLEANING.name,
   CLIMATE: Subcategory.CLIMATE.name,
   MENS_CLOTHING: Subcategory.MENS_CLOTHING.name,
   WOMENS_CLOTHING: Subcategory.WOMENS_CLOTHING.name,
   SHOES: Subcategory.SHOES.name,
   ACCESSORIES: Subcategory.ACCESSORIES.name,
   FITNESS: Subcategory.FITNESS.name,
   OUTDOOR: Subcategory.OUTDOOR.name,
   TEAM_SPORTS: Subcategory.TEAM_SPORTS.name,
   BOOKS: Subcategory.BOOKS.name,
   MUSIC: Subcategory.MUSIC.name,
   MOVIES: Subcategory.MOVIES.name
}

export interface AgregacaoPorCategoria {
  [categoria: string]: Products;
}

export interface AgregacaoPorSubcategoria {
  [subcategoria: string]: Products;
}

export interface ContagemPorCategoria {
  [categoria: string]: number;
}

export interface ContagemPorSubcategoria {
  [subcategoria: string]: number;
}

export interface BreadcrumbCategoria {
  nome: keyof typeof Category
  link: string
}

export interface BreadcrumbSubcategoria {
  nome: keyof typeof Subcategory
  link: string
  order: number
}

export interface BreadcrumbsType {
  categoria: BreadcrumbCategoria
  subcategorias: BreadcrumbSubcategoria[]
}