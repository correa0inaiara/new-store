class Breadcrumb {
  private _id: string
  private _title: string
  private _name: string
  private _link: string
  private _banner?: string
  private _icon?: string
  private _category?: string

  constructor(
    id: string,
    title: string,
    name: string,
    link: string,
    banner?: string,
    icon?: string,
    category?: string
  ) {
    if (!id) 
       throw new Error('ID não pode estar vazio')

    this._id = id
    this._title = title
    this._name = name
    this._link = link
    this._banner = banner
    this._icon = icon
    this._category = category
  }

  set title(title: string) {
    
    if (!title) 
       throw new Error('Title não pode estar vazio')

    this._title = title
  }

  set name(name: string) {
    
    if (!name) 
       throw new Error('Name não pode estar vazio')

    this._name = name
  }

  set link(link: string) {
    
    if (!link) 
       throw new Error('Link não pode estar vazio')

    this._link = link
  }

  set banner(banner: string) {
    
    if (!banner) 
       throw new Error('Banner não pode estar vazio')

    this._banner = banner
  }

  set icon(icon: string) {

    if (!icon) 
       throw new Error('Icon não pode estar vazio')

    this._icon = icon
  }

  set category(category: string) {

    if (!category) 
       throw new Error('Category não pode estar vazio')

    this._category = category
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get name(): string {
    return this._name
  }

  get link(): string {
    return this._link
  }

  get banner(): string | undefined {
    return this._banner
  }

  get icon(): string | undefined {
    return this._icon
  }

  get category(): string | undefined {
    return this._category
  }
}