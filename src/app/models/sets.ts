interface Legalities {
  unlimited: string;
  standard: string;
  expanded: string;
}

interface SetImages {
  symbol: string;
  logo: string;
}

export interface SetPokemon {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface SetsData {
  data: SetPokemon[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}