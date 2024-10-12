import {Avatar, TextField} from "@mui/material";
import {CircularProgressBarSize20} from "../ProgressBars.jsx";

export function AutoCompleteRenderInputWithUserAvatar(params, label, isLoading, value) {
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
                    ),
                    startAdornment: (
                        <>
                            <Avatar
                                src={value?.['profile_image']}
                                alt={value?.['image_alt_text']}
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