export enum eCriteria {
   Estado,
   Agencia,
   Tipo
  }

export interface Agencie {
  id: number;
  name: string;
}

export interface TypeMission {
  id: number;
  name: string;
}

export interface TypeStatus {
  id: number;
  name: string;
}

export interface Launch {
  id: number;
  name: string;
  agencie: number;
  status: number;
  typeMission: number;
}
