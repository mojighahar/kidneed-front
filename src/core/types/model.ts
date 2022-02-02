export interface Model {
  id: number;
  createdAt: string;
  updatedAt: string;
  payload: any;
}

export interface Action extends Model {
  type: "coin" | "energy";
  status: "earned" | "used";
  child?: Child;
  reward?: unknown;
  activity?: Activity;
  step?: unknown;
}

export interface Activity extends Model {
  coins: number;
  duration: number;
  date: string;
  progress: number;
  done: boolean;
  child?: Child;
  content?: unknown;
}

export interface Article extends Model {
  title: string;
  body: string;
  selected: boolean;
  views: number;
  writer?: unknown;
  image?: unknown;
}

export interface Category extends Model {
  name: string;
  type: "reward" | "content";
}

export interface Challenge extends Model {}

export interface Character extends Model {
  name: string;
  image?: unknown;
}

export interface Child extends Model {
  name: string;
  gender: "boy" | "girl";
  age: number;
  budget: number;
  characters: Array<unknown>;
  psychologies: Array<unknown>;
  activities: Array<unknown>;
}

export interface ChildBalance extends Model {
  coins: number;
  energy: number;
  child?: Child;
  step?: unknown;
}

export interface ChildPsychologie extends Model {
  point: number;
  question?: unknown;
  child?: Child;
}

export interface Content extends Model {
  title: string;
  description: string;
  image?: unknown;
  tags: Array<unknown>;
  attachments?: Array<unknown>;
  links: Array<unknown>;
  category?: Category;
}

export interface PsychologieQuestion extends Model {
  title: string;
  tag: unknown;
}

export interface Reward extends Model {
  coins: number;
  name: string;
  image?: unknown;
  category?: unknown;
  minBudget: number;
  maxBudget: number;
}

export interface Step extends Model {
  month: number;
  year: number;
  stepRewards?: Array<unknown>;
  actions?: Array<unknown>;
  childBalance?: Array<unknown>;
}

export interface StepReward extends Model {
  level: number;
  claimedAt: string;
  child?: Child;
  rewards?: Array<Reward>;
  step?: Step;
}

export interface User extends Model {
  mobile: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface Writer extends Model {
  name: string;
  avatar?: unknown;
  articles?: Array<Article>;
}

export interface Media {}

export interface Link {}

export interface Tag {}
