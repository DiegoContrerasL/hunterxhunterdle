import { Box, Grid2, Typography } from "@mui/material";
import GuessRow from "./GuessRow";
import { useEffect } from "react";

type GuessBoxProps = {
    data: string[] | number;
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

export default function GuessesTable(props: GuessesTableProps) {
    const { rows } = props;

    const columns = ['Character', 'Gender', 'Hair Color',
                    'Physical Qualities', 'State',
                    'Affiliations', 'Occupations', 'Hunter Type',
                    'Debut Arc', 'Debut Episode', 'Nen Type']

    const hovers: Record<string, string> = {
        'Gender': 'Male\nFemale\nUnknown',
        'Physical Qualities': 'SPECIFIC FOR CHIMERA ANTS\nInformation about their animal class(es)',
        'State': 'Alive\nDeceased\nUnknown',
        'Affiliations': 'Principal affiliations of the character',
        'Occupations': 'Principal occupations of the character',
        'Hunter Type': 'UNIQUE FOR HUNTERS\nInformation about their hunter type/rank',
        'Debut Arc': 'Arc on which the character physically appeared for the first time',
        'Debut Episode': 'Hunter Exam Arc (1 - 21)\nZoldyck Family Arc (22 - 26)\nHeavens Arena Arc (27 - 36)\nYorknew City Arc (37 - 58)\nGreed Island Arc (59 - 75)\nChimera Ant Arc (76 - 136)\n13th Hunter Chairman\nElection Arc (137 - 148)',
        'Nen Type': 'Enhancement, Conjuration\nManipulation, Transmutation\nEmission, Specialization\nUnknown'
    }

    return (
        <Grid2 container spacing={2} sx={{ width: '50%', minWidth: '600px' }}>
            <Grid2 container component={'div'} size={12}>
                {columns.map((column, index) => {
                    const hoverText = hovers[column] || "";
                    const textLength = hoverText.length;
                    const hoverBoxWidth = Math.min(textLength * 6, 220); // Adjust width dynamically
                    return (
                        <Grid2
                            key={index}
                            component={'div'}
                            size={1.08}
                            alignContent={'center'}
                            position={'relative'}
                            onMouseEnter={(e) => {
                                const box = document.getElementById(column+'-box');
                                if (box) box.style.display = "block";
                                }}
                            onMouseLeave={(e) => {
                            const box = document.getElementById(column+"-box");
                            if (box) box.style.display = "none";
                            }}
                        >
                            <Typography color="white" variant="h6" fontSize={14} align="center">{column}</Typography>
                            {
                                hovers[column] &&
                                <Box
                                    id={column+'-box'}
                                    borderColor={'white'}
                                    border={2}
                                    borderRadius={2}
                                    bgcolor={'black'}
                                    position={'absolute'}
                                    top={'100%'}
                                    left={`-${hoverBoxWidth/2 - 36}px`}
                                    display={'none'}
                                    padding={2}
                                    zIndex={10}
                                    sx={{
                                        whiteSpace: "pre-wrap",
                                        wordWrap: "break-word",
                                        width: `${hoverBoxWidth}px`,
                                        minWidth: "80px",
                                        maxWidth: "220px",
                                    }}
                                >
                                    <Typography
                                    color="white"
                                    variant="h6"
                                    fontSize={14}
                                    align="center"
                                    >
                                        {hovers[column]}
                                    </Typography>
                                </Box>
                            }
                        </Grid2>
                    )
                })}
            </Grid2>
            {rows.map((row, index) => {
                return (
                    <GuessRow key={index} icon={row.icon} guesses={row.guesses} />
                );
            })}
        </Grid2>
    );
}