'use client'

import { Box, TextField, Autocomplete, Button } from "@mui/material";
import { useState } from "react";

interface CharacterSelectProps {
    dataSetter: (data: any) => void;
}

const options = [
    { value: "1", label: "Character 1", img: "/images/character1.png" },
    { value: "2", label: "Character 2", img: "/images/character2.png" },
    { value: "3", label: "Character 3", img: "/images/character3.png" }
];

export default function CharacterSelect(props: CharacterSelectProps) {
    const { dataSetter } = props;
    const [selected, setSelected] = useState<{ value: string, label: string, img: string } | null>(null);
    const [inputValue, setInputValue] = useState(""); // Track input text

    const test = true;

    const handleButtonClick = () => {
        console.log("Button clicked");
        if (test) dataSetter({ icon: { name: 'bye', file: ''}, guesses: [{ data: 'no', state: 0 }, { data: 'maybe', state: 1 }, { data: 'yes', state: -1 },] });
        else if (selected) dataSetter(selected.value);
    };

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                    <li {...props} key={option.value} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={option.img} alt={option.label} style={{ width: 30, height: 30 }} />
                        {option.label}
                    </li>
                )}
                onChange={(_, newValue) => setSelected(newValue)}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => setInputValue(newInputValue)} // Update input state
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder={inputValue.length > 0 ? "" : "Search Character"} // Hide placeholder when typing
                        variant="outlined"
                        InputLabelProps={{ shrink: true }} // Prevent label from floating
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
                onClick={handleButtonClick}
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
