interface ICor {
  nome:string;
  enabled:boolean;
}

export interface IDuchCard {
  infoCard: IItemPlacar;
  isEndGame:boolean;
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement >) => void
}

export interface IError {
  erro:string;
  handleErro: React.Dispatch<React.SetStateAction<string>>;
}

export interface IInputData {
  color: string;
  score: number;
  handleChange:  (e: React.ChangeEvent<HTMLInputElement >) => void
  isDisabled: boolean;
  inputLabel:string;
  tpOp:string 
}

export interface IInfoPlayer {
  cores: ICor[];
  handleCheck: (e:React.ChangeEvent<HTMLInputElement>, idx:number) => void
  round:number;
}

export interface IItemPlacar {
  bp: number;
  dp: number;
  enabled:boolean;
  history: string;
  nome:string;
  onGame: boolean;
  score: number;
  winner: boolean;
}

export interface IPLacar {
  round:number;
  endGame:boolean;
  colors: IItemPlacar[];
}