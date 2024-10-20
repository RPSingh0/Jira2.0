import {Box, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";

function JiraDetailProject() {

    // context states
    const {jiraMetadata} = useJiraMetadataContext();
    const project = `${jiraMetadata?.data.jiraMetadata.projectKey} | ${jiraMetadata?.data.jiraMetadata.projectName}`;

    return (

        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Project
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
                <Typography variant="body1">
                    {project}
                </Typography>
            </Box>

        </Box>
    );
}

export default JiraDetailProject;