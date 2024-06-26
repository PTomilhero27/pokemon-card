import { SetPokemon } from './sets';

interface Ability {
  name: string;
  text: string;
  type: string;
}

interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Weakness {
  type: string;
  value: string;
}

interface Legalities {
  unlimited: string;
  standard: string;
  expanded: string;
}

interface Images {
  small: string;
  large: string;
}

interface Prices {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: {
    normal: Prices;
    reverseHolofoil?: Prices;
  };
}

interface CardmarketPrices {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow?: any;
  suggestedPrice?: any;
  reverseHoloSell?: any;
  reverseHoloLow?: any;
  reverseHoloTrend?: any;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1?: any;
  reverseHoloAvg7?: any;
  reverseHoloAvg30?: any;
}

interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: CardmarketPrices;
}

export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom: string;
  abilities: Ability[];
  attacks: Attack[];
  weaknesses: Weakness[];
  resistances: Weakness[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: SetPokemon;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: Images;
  tcgplayer: Tcgplayer;
  cardmarket: Cardmarket;
}

export interface CardData {
  data: Card[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}
