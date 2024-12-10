import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateProjectLeadService} from "../../../services/project/projectService.js";

export function useUpdateProjectLead() {

    const {mutate: updateProjectLead, isPending: isUpdating} = useMutation({
        mutationFn: updateProjectLeadService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira assignee updated`);
            }
        }
    });

    return {updateProjectLead, isUpdating};
}