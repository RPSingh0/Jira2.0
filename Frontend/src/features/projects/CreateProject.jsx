import {Autocomplete, Box, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function CreateProject() {
    return (
        // main container
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "1rem",
            columnGap: "1rem"
        }}>
            {/* Form Section */}
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                paddingTop: "1rem",
                width: "80%"
            }}>
                <Typography variant="h5" sx={(theme) => ({
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: theme.palette.defaultBlack.main,
                    marginBottom: "2rem",
                    textAlign: "center"
                })}>
                    Create New Project
                </Typography>
                <Box component={"form"} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem"
                }}>
                    <TextField
                        name={"name"}
                        label="Name"
                        variant="outlined"
                        size={"small"}
                        required={true}
                        fullWidth={true}
                    />
                    <TextField
                        name={"key"}
                        label="Key"
                        variant="outlined"
                        size={"small"}
                        helperText={"Uniquely identifies a project"}
                        fullWidth={true}
                    />
                    <TextField
                        name={"description"}
                        label="Description"
                        multiline
                        variant="outlined"
                        size={"small"}
                        required={true}
                        fullWidth={true}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Start Date" slotProps={{textField: {size: "small", required: 'true'}}}/>
                    </LocalizationProvider>
                    <Autocomplete
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label={"Select Lead"}
                                size={"small"}
                                required={true}
                            />}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Expected End Date" slotProps={{textField: {size: "small"}}}/>
                    </LocalizationProvider>
                </Box>
            </Box>

            {/* Image Section */}
            <Box sx={{flexGrow: 1}}>
                <img src={"/new/create_new_project.png"} alt={"new project image"} width={"100%"}/>
            </Box>
        </Box>
    );
}

export default CreateProject;