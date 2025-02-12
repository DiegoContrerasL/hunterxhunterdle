'use client'

import CharacterSelect from "@/components/CharacterSelect";
import GuessesTable from "@/components/GuessesTable";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import characters_data from "@/data/characters.json";
import Cookies from "js-cookie";

type GuessBoxProps = {
  data: string[];
  state: string;
}

type GuessIconBoxProps = {
  name: string;
  file: string;
}

type GuessRowProps = {
  icon: GuessIconBoxProps;
  guesses: GuessBoxProps[];
}

type GuessesTableProps = {
  rows: GuessRowProps[];
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

export default function Home() {
  const [data, setData] = useState<GuessesTableProps>();
  const [correctCharacter, setCorrectCharacter] = useState<string>("0");
  const [lastCharacter, setLastCharacter] = useState<string>("0");
  const [guessed, setGuessed] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([])

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const characters: { [key: string]: { name: string; [key: string]: any } } = characters_data

  const arcs = [
    "Hunter Exam Arc",
    "Zoldyck Family Arc",
    "Heavens Arena Arc",
    "Yorknew City Arc",
    "Greed Island Arc",
    "Chimera Ant Arc",
    "13th Hunter Chairman Election Arc"
  ];

  const dataUpdate = (newData: GuessRowProps) => {
    setData((prevData) => ({
      rows: prevData ? [newData, ...prevData.rows] : [newData], // Create a new array to trigger a re-render
    }));
    const allCorrect = newData.guesses.every(guess => guess.state === 'right');
    setGuessed(allCorrect);
  };

  useEffect(() => {
    const res = getGuesses();
    console.log("guesses",res); // Log the retrieved guesses
    setGuesses(res); // Update state with guesses
    retrieveAPIData();
  }, [])

  useEffect(() => {
    if (guesses.length > 0 && correctCharacter != '0') {
      console.log("entered")
      const rowsData = guesses.map((guess) => 
        ({
        icon: {
          name: characters[guess]['name'],
          file: `${basePath}/characters/${guess}.png`
        },
        guesses: [
          {
            data: characters[guess]['gender'],
            state: characters[guess]['gender'][0] === characters[correctCharacter]['gender'][0] ? 'right' : 'wrong'
          },
          {
            data: characters[guess]['species'],
            state: characters[guess]['species'][0] === characters[correctCharacter]['species'][0] ? 'right' : 'wrong'
          },
          {
            data: characters[guess]['is_alive'],
            state: characters[guess]['is_alive'][0] === characters[correctCharacter]['is_alive'][0] ? 'right' : 'wrong'
          },
          {
            data: characters[guess]['occupation'],
            state: compareArrays(characters[guess]['occupation'], characters[correctCharacter]['occupation'])
          },
          {
            data: characters[guess]['nen_type'],
            state: compareArrays(characters[guess]['nen_type'], characters[correctCharacter]['nen_type'])
          },
          {
            data: characters[guess]['introduced_in_arc'],
            state:  arcs.indexOf(characters[guess]['introduced_in_arc'][0]) == arcs.indexOf(characters[correctCharacter]['introduced_in_arc'][0]) ?
                    'right' :
                    arcs.indexOf(characters[guess]['introduced_in_arc'][0]) > arcs.indexOf(characters[correctCharacter]['introduced_in_arc'][0]) ?
                    'higher' : 'lower'
          }
        ]
      }))
      setData({ rows: rowsData});
      console.log(guesses.at(0),correctCharacter,guesses.at(0) == correctCharacter)
      if (guesses.at(0) == correctCharacter) {
        setGuessed(true);
      }
    }
  }, [guesses, correctCharacter])

  const retrieveAPIData = async () => {
    try {
      const response = await axios.get("https://hunterxhunterdleapi.onrender.com/get-daily-character");
      setCorrectCharacter(response.data['current_character'])
      setLastCharacter(response.data['last_character'])
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          height: '100vh',
          width: '100vw',
          mb: 15
        }}>
        <Typography variant="h1" component="h1" align="center">HxHdle</Typography>
        <Typography variant="h5" component="h5" align="center">Guess todays Hunter X Hunters character!</Typography>
        {!guessed && <CharacterSelect dataSetter={dataUpdate}></CharacterSelect>}
        {guessed &&
          <Typography color="green" fontSize={40} fontWeight={'bold'}>Correct! It was {characters[correctCharacter]['name']}</Typography>
        }
        {guessed &&
          <img
            src={`${basePath}/characters/${correctCharacter}.png`}
            width={100}
            height={100}
            alt=""
          />
        }
        { data && GuessesTable(data) }
        <Typography variant="h5" component="h5" align="center">{characters[lastCharacter]? "The last character was: " + characters[lastCharacter]['name']: ""}</Typography>
      </Box>
    </main>
  );
}
