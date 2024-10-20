import {Avatar, Box, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";

function JiraDetailCreatedBy() {

    // context states
    const {jiraMetadata} = useJiraMetadataContext();


    return (

        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Created By
            </Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
                padding: "0.5rem",
                borderRadius: "9px",
                transition: "background-color 0.2s ease",

                "&:hover": {
                    backgroundColor: grey["200"]
                }
            }}>
                <Avatar src={jiraMetadata?.data.jiraMetadata.userCreatedByProfileImage} alt="createdBy"/>
                <Typography variant="body1">
                    {jiraMetadata?.data.jiraMetadata.userCreatedByName}
                </Typography>
            </Box>

        </Box>
    );
}

export default JiraDetailCreatedBy;