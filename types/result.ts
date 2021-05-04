export interface Links {
  next?: string
  previous?: string
}

export interface Result {
  links: Links
  count: number
  results: any[]
}