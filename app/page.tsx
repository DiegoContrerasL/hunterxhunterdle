'use client'

import CharacterSelect from "@/components/CharacterSelect";
import GuessesTable from "@/components/GuessesTable";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

type GuessBoxProps = {
  data: string;
  state: number;
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

export default function Home() {
  const [data, setData] = useState<GuessesTableProps>({ rows: [] });

  const dummyData = {
    rows : [
      { icon: { name: 'hi', file: ''}, guesses: [{ data: 'yes', state: 0 }, { data: 'no', state: 1 }, { data: 'maybe', state: -1 },] },
      { icon: { name: 'hi', file: ''}, guesses: [{ data: 'yes', state: 0 }, { data: 'no', state: 1 }, { data: 'maybe', state: -1 },] },
      { icon: { name: 'hi', file: ''}, guesses: [{ data: 'yes', state: 0 }, { data: 'no', state: 1 }, { data: 'maybe', state: -1 },] },
      { icon: { name: 'hi', file: ''}, guesses: [{ data: 'yes', state: 0 }, { data: 'no', state: 1 }, { data: 'maybe', state: -1 },] },
    ]
  }

  const dataUpdate = (newData: GuessRowProps) => {
    setData((prevData) => ({
      rows: [...prevData.rows, newData], // Create a new array to trigger a re-render
    }));
  };

  useEffect(() => {
    setData(dummyData);
    // GET METHOD PARA LA API
  }, []);

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
        }}>
        <Typography variant="h1" component="h1" align="center">HxHdle</Typography>
        <Typography variant="h5" component="h5" align="center">Guess today's Hunter X Hunter's character!</Typography>
        <CharacterSelect dataSetter={dataUpdate}></CharacterSelect>
        { data && GuessesTable(data) }
      </Box>
    </main>
  );
}
