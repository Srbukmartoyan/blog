import { useContext } from "react";
import { GlobalContext } from './context';

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}