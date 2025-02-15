'use client'

import CharacterSelect from "@/components/CharacterSelect";
import GuessesTable from "@/components/GuessesTable";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import characters_data from "@/data/characters.json";
import Cookies from "js-cookie";
import InformationTable from "@/components/InformationTable";

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

export default function Home() {
  const [data, setData] = useState<GuessesTableProps>();
  const [correctCharacter, setCorrectCharacter] = useState<string>("0");
  const [lastCharacter, setLastCharacter] = useState<string>("0");
  const [guessed, setGuessed] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([])


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
            data: characters[guess]['hair_color'],
            state: compareArrays(characters[guess]['hair_color'], characters[correctCharacter]['hair_color'])
          },
          {
            data: characters[guess]['physical_qualities'],
            state: compareArrays(characters[guess]['physical_qualities'], characters[correctCharacter]['physical_qualities'])
          },
          {
            data: characters[guess]['state'],
            state: characters[guess]['state'][0] === characters[correctCharacter]['state'][0] ? 'right' : 'wrong'
          },
          {
            data: characters[guess]['affiliations'],
            state: compareArrays(characters[guess]['affiliations'], characters[correctCharacter]['affiliations'])
          },
          {
            data: characters[guess]['occupation'],
            state: compareArrays(characters[guess]['occupation'], characters[correctCharacter]['occupation'])
          },
          {
            data: characters[guess]['hunter_type'],
            state: compareArrays(characters[guess]['hunter_type'], characters[correctCharacter]['hunter_type'])
          },
          {
            data: characters[guess]['debut_arc'],
            state:  arcs.indexOf(characters[guess]['debut_arc'][0]) == arcs.indexOf(characters[correctCharacter]['debut_arc'][0]) ?
                    'right' :
                    arcs.indexOf(characters[guess]['debut_arc'][0]) > arcs.indexOf(characters[correctCharacter]['debut_arc'][0]) ?
                    'higher' : 'lower'
          },
          {
            data: characters[guess]['debut_episode'],
            state:  characters[guess]['debut_episode'] == characters[correctCharacter]['debut_episode'] ?
                    'right' :
                    characters[guess]['debut_episode'] > characters[correctCharacter]['debut_episode'] ?
                    'higher' : 'lower'
          },
          {
            data: characters[guess]['nen_type'],
            state: compareArrays(characters[guess]['nen_type'], characters[correctCharacter]['nen_type'])
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
          gap: 3,
          height: '100vh',
          width: '100vw',
          mb: 15,
          bgcolor: 'black'
        }}>
        <Typography variant="h1" align="center" color="white">HxHdle</Typography>
        <Typography variant="h5" align="center" color="white">Guess today{"'"}s Hunter X Hunter character!</Typography>
        <Typography fontSize={14} align="center" color="white">(Data corresponding to the status of the last episode of the 2011 anime version)</Typography>
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
        <InformationTable/>
        <Typography variant="h5" component="h5" align="center" color="white">{characters[lastCharacter]? "The last character was: " + characters[lastCharacter]['name']: ""}</Typography>
      </Box>
    </main>
  );
}
