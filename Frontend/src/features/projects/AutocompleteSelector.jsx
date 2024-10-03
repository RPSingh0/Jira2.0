import {Autocomplete, Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText, TextField} from "@mui/material";

function AutocompleteSelector({
                                  options, name, label, avatarNameKey, avatarSourceKey, optionText, isLoading,
                                  value, setValue
                              }) {
    return (
        <Autocomplete
            fullWidth={true}
            options={options}
            name={name}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            getOptionLabel={(option) => option.name}

            renderOption={(props, option) => {
                const {key, ...other} = props;
                return (
                    <ListItem key={key} {...other}>
                        <ListItemAvatar>
                            <Avatar alt={option[avatarNameKey]} src={option[avatarSourceKey]}/>
                        </ListItemAvatar>
                        <ListItemText primary={option[optionText]}/>
                    </ListItem>
                );
            }}

            renderInput={(params) => <TextField
                {...params}
                label={label}
                slotProps={{
                    input: {
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                        startAdornment: (
                            <>
                                <Avatar src={value?.[avatarSourceKey]} alt={value?.[avatarNameKey]}/>
                            </>
                        ),
                    },
                }}
            />}
        />
    );
}

export default AutocompleteSelector;