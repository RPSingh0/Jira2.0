import {Avatar, TextField} from "@mui/material";
import {CircularProgressBarSize20} from "../progress/ProgressBars.jsx";
import Label from "../label/Label.jsx";

export function AutoCompleteRenderInputWithUserAvatar(params, id, labelText, isLoading, error, helperText, currentSelected) {
    return (
        <>
            <Label id={id} labelText={labelText}/>
            <TextField
                {...params}
                id={id}
                placeholder={"Unassigned"}
                error={error}
                helperText={helperText}
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
                                    src={currentSelected?.['profileImage']}
                                    alt={currentSelected?.['name']}
                                    sx={{height: 24, width: 24}}
                                />
                            </>
                        ),
                    },
                }}
            />
        </>
    );
}

export function AutoCompleteRenderInputDefault(params, id, labelText, isLoading, error, helperText) {
    return (
        <>
            <Label id={id} labelText={labelText}/>
            <TextField
                {...params}
                id={id}
                placeholder={"Unassigned"}
                error={error}
                helperText={helperText}
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
        </>
    );
}