import { Grid2, Typography } from "@mui/material";
import GuessRow from "./GuessRow";

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

export default function GuessesTable(props: GuessesTableProps) {
    const { rows } = props;

    return (
        <Grid2 container spacing={2} sx={{ width: '50%', minWidth: '400px' }}>
            <Grid2 container component={'div'} size={12}>
                <Grid2 component={'div'} size={3}>
                    <Typography variant="h6" component="h6" align="center">Character</Typography>
                </Grid2>
                <Grid2 component={'div'} size={3}>
                    <Typography variant="h6" component="h6" align="center">1</Typography>
                </Grid2>
                <Grid2 component={'div'} size={3}>
                    <Typography variant="h6" component="h6" align="center">2</Typography>
                </Grid2>
                <Grid2 component={'div'} size={3}>
                    <Typography variant="h6" component="h6" align="center">3</Typography>
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