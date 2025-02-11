'use client'

import { Box, TextField, Autocomplete, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import characters_data from "@/data/characters.json"
import axios from "axios";
import Cookies from "js-cookie";

interface CharacterSelectProps {
    dataSetter: (data: any) => void;
}

function getGuesses() {
  const dayData = Cookies.get("dayHxHdle") || "";
  const today = new Date().toDateString();
  if (dayData == today) {
    const guessesData = Cookies.get("guessesHxHdle") || "";
    return guessesData ? guessesData.split("_") : [];
  } else {
    return [];
  }
}

function setGuess(newGuess: string) {
  const dayData = Cookies.get("dayHxHdle") || "";
  const today = new Date().toDateString();

  if (dayData === today) {
    const guessesData = Cookies.get("guessesHxHdle") || "";
    const guessesArray = guessesData ? guessesData.split("_") : [];
    guessesArray.unshift(newGuess);
    const newGuessesData = guessesArray.join("_");

    Cookies.set("guessesHxHdle", newGuessesData, { expires: 1 });
  } else {
    Cookies.set("guessesHxHdle", newGuess, { expires: 1 });
    Cookies.set("dayHxHdle", today, { expires: 1 });
  }
  }

function compareArrays(arr1: string[], arr2: string[]): string {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  console.log(arr1)
  console.log(arr2)

  if (arr1.length === arr2.length && arr1.every(item => set2.has(item))) {
      return "right"; // Both arrays contain the same elements
  }

  for (const item of set1) {
      if (set2.has(item)) {
          return "partial"; // At least one common element
      }
  }

  return "wrong"; // No common elements
}

const characters: { [key: string]: { name: string; [key: string]: any } } = characters_data

const optionsDummy = Object.keys(characters).map((key) => ({
    value: key, 
    label: characters[key]['name'],
    img: "/characters/" + key + ".png"
}));

export default function CharacterSelect(props: CharacterSelectProps) {
    const { dataSetter } = props;
    const [selected, setSelected] = useState<{ value: string, label: string, img: string } | null>(null);
    const [inputValue, setInputValue] = useState(""); // Track input text
    const [options, setOptions] = useState(
      [...optionsDummy].sort((a, b) => a.label.localeCompare(b.label))
  );
    const [used, setUsed] = useState<string[]>([]);
    const [correctCharacter, setCorrectCharacter] = useState<string>("0");

    const test = true;

    const arcs = [
      "Hunter Exam Arc",
      "Zoldyck Family Arc",
      "Heavens Arena Arc",
      "Yorknew City Arc",
      "Greed Island Arc",
      "Chimera Ant Arc",
      "13th Hunter Chairman Election Arc"
    ];

    const retrieveAPIData = async () => {
      try {
        const response = await axios.get("https://hunterxhunterdleapi.onrender.com/get-daily-character");
        setCorrectCharacter(response.data['current_character'])
      } catch (error) {
        console.error(error);
      }
    }

    const sendGuess = async (guess: string) => {
      try {
        const response = await axios.post(
          "https://hunterxhunterdleapi.onrender.com/guess",
          { guess },
          {
            headers: { "Content-Type": "application/json" }
          }
        );
    
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error sending guess:", error);
      }
    };

    useEffect(() => {
      const res = getGuesses(); // Fetch guesses from API
      console.log("guesses",res); // Log the retrieved guesses
      setUsed(res); // Update state with guesses
      retrieveAPIData();
    }, [])

    useEffect(() => {
      setOptions((prevOptions) =>
        prevOptions.filter((option) => !used.includes(option.value))
      );
    }, [used])

    const submitCharacter = () => {
        if (!selected) {
            return;
        }
        setGuess(selected.value);
        sendGuess(selected.value);
        const newData = {
          icon: {
            name: characters[selected.value]['name'],
            file: '/characters/' + selected.value + '.png'
          },
          guesses: [
            {
              data: characters[selected.value]['gender'],
              state: characters[selected.value]['gender'][0] == characters[correctCharacter]['gender'][0] ? 'right' : 'wrong'
            },
            {
              data: characters[selected.value]['species'],
              state: characters[selected.value]['species'][0] == characters[correctCharacter]['species'][0] ? 'right' : 'wrong'
            },
            {
              data: characters[selected.value]['is_alive'],
              state: characters[selected.value]['is_alive'][0] == characters[correctCharacter]['is_alive'][0] ? 'right' : 'wrong'
            },
            {
              data: characters[selected.value]['occupation'],
              state: compareArrays(characters[selected.value]['occupation'], characters[correctCharacter]['occupation'])
            },
            {
              data: characters[selected.value]['nen_type'],
              state: compareArrays(characters[selected.value]['nen_type'], characters[correctCharacter]['nen_type'])
            },
            {
              data: characters[selected.value]['introduced_in_arc'],
              state:  arcs.indexOf(characters[selected.value]['introduced_in_arc'][0]) == arcs.indexOf(characters[correctCharacter]['introduced_in_arc'][0]) ?
                      'right' :
                      arcs.indexOf(characters[selected.value]['introduced_in_arc'][0]) > arcs.indexOf(characters[correctCharacter]['introduced_in_arc'][0]) ?
                      'higher' : 'lower'
            }
          ]
        }
        dataSetter(newData);
        setSelected(null);
        setInputValue("");
        const newUsed = used.concat(selected.value);
        setUsed(newUsed);
    }

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Autocomplete
                key={options.length}
                options={options}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                    <li {...props} key={option.value} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Image src={option.img} alt={option.label} width={40} height={40} />
                        {option.label}
                    </li>
                )}
                onChange={(_, newValue) => setSelected(newValue)}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder={inputValue.length > 0 ? "" : "Search Character"}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 0 10px #00ffcc",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#00ffcc" },
                                "&:hover fieldset": { borderColor: "#00e6b8" },
                                "&.Mui-focused fieldset": { borderColor: "#00e6b8" }
                            }
                        }}
                    />
                )}
                sx={{ width: 250 }}
            />
            
            <Button 
                variant="contained" 
                color="primary" 
                onClick={submitCharacter}
                sx={{
                    backgroundColor: "#00ffcc",
                    color: "black",
                    "&:hover": { backgroundColor: "#00e6b8" }
                }}
            >
                GUESS
            </Button>
        </Box>
    );
}
