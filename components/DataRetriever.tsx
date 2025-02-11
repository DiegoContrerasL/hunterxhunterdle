import { useEffect } from "react";
import characters_data from "@/data/characters.json";
import { getGuessesCookie, setGuessesCookie } from "@/utils/cookiesUtils";

interface DataRetrieverProps {
    dataSetter: (data: any) => void;
    correctCharacterSetter: (data: any) => void;
    lastCharacterSetter: (data: any) => void;
}

export default function DataRetriever(props: DataRetrieverProps) {
    
    const cookieDataConverter = (cookieData: string[]) => {
        const rowsData = cookieData.map((guess) => ({
          icon: {
            name: characters[guess]['name'],
            file: '/public/img/' + guess + '.png'
          },
          guesses: [
            {
              data: characters[guess],
              state: '0'
            },
    
          ]
        }))
      };
    
      const retrieveAPIData = async () => {
        try {
          const response = await axios.get("https://hunterxhunterdleapi.onrender.com/get-daily-character");
          setCorrectCharacter(response.data['current_character'])
          setLastCharacter(response.data['last_character'])
        } catch (error) {
          console.error(error);
        }
      }


    return;
}