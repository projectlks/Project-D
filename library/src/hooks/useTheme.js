import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";


export default function useTheme() {

    let contexts = useContext(ThemeContext);

    if (contexts === 'undefined') {
        new Error (' theme should be only used in ThemeContextProvider')
    }
      return contexts;
      
}
