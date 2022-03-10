export interface Model {
  id: number;
  createdAt: string;
  updatedAt: string;
  payload: any;
}

export interface Schedule extends Model {
  coins: number;
  duration: number;
  date: string;
  progress: number;
  done: boolean;
  child?: Child;
}

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
  schedules: Array<unknown>;
}

export interface ChildPsychologie extends Model {
  point: number;
  question?: unknown;
  child?: Child;
}

export interface PsychologieQuestion extends Model {
  title: string;
  tag: unknown;
  category: "A" | "B" | "C" | "D";
}

export interface Step extends Model {
  month: number;
  year: number;
  actions?: Array<unknown>;
  childBalance?: Array<unknown>;
}

export interface User extends Model {
  mobile: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
