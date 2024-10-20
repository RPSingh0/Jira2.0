import {Avatar, TextField} from "@mui/material";
import {CircularProgressBarSize20} from "../progress/ProgressBars.jsx";

export function AutoCompleteRenderInputWithUserAvatar(params, label, isLoading, value) {
    return (
        <TextField
            {...params}
            label={label}
            placeholder={value ? value["name"] : "Unassigned"}
            slotProps={{
                input: {
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {isLoading ? <CircularProgressBarSize20/> : null}
                            {params.InputProps.endAdornment}
                        </>
                    ),
                    startAdornment: (
                        <>
                            <Avatar
                                src={value?.['profileImage']}
                                alt={value?.['name']}
                                sx={{height: 24, width: 24}}
                            />
                        </>
                    ),
                },
            }}
        />
    );
}

export function AutoCompleteRenderInputDefault(params, label, isLoading) {
    return (
        <TextField
            {...params}
            label={label}
            placeholder={"Unassigned"}
            slotProps={{
                input: {
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {isLoading ? <CircularProgressBarSize20/> : null}
                            {params.InputProps.endAdornment}
                        </>
                    )
                },
            }}
        />
    );
}