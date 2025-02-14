import { Grid2, Typography } from "@mui/material";
import GuessRow from "./GuessRow";

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

    return (
        <Grid2 container spacing={2} sx={{ width: '50%', minWidth: '800px' }}>
            <Grid2 container component={'div'} size={12}>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Character</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Gender</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Hair Color</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Physical Qualities</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">State</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Affiliations</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Ocupations</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Hunter Type</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Debut Arc</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Debut Episode</Typography>
                </Grid2>
                <Grid2 component={'div'} size={1.08}>
                    <Typography variant="h6" fontSize={14} align="center">Nen Type</Typography>
                </Grid2>
            </Grid2>
            {rows.map((row, index) => {
                return (
                    <GuessRow key={index} icon={row.icon} guesses={row.guesses} />
                );
            })}
        </Grid2>
    );
}