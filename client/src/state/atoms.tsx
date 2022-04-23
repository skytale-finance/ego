import { atom } from "recoil";

export interface UserToken{
  description:string;
  image:string;
  name:string;
}

 export const userCurrentAccount = atom({
    key: 'userCurrentAccount',
    default: undefined,
  });

  export const userTokens = atom<UserToken[]>({
    key: 'userTokens',
    default: undefined,
  });