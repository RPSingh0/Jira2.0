import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {createProjectService} from "../../../services/project/projectService.js";

export function useCreateProject() {

    // hit endpoint to get user details with email and password
    const {mutate: createProject, isPending: isCreating} = useMutation({
        mutationFn: createProjectService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Project created, redirecting...");
            }
        }
    });

    return {createProject, isCreating};
}