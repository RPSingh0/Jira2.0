import {Pagination} from "@mui/lab";
import {Stack} from "@mui/material";
import {useProjectsContext} from "./ProjectsContext.jsx";
import {StyledProjectsPagination} from "./ProjectsPaginationStyles.jsx";

function ProjectsPagination() {

    const {pages, page, setPage} = useProjectsContext();

    return (
        <StyledProjectsPagination>
            <Stack spacing={2}>
                <Pagination count={pages} page={page} variant="outlined" color="secondary"
                            onChange={(e, v) => setPage(v)}/>
            </Stack>
        </StyledProjectsPagination>
    );
}

export default ProjectsPagination;