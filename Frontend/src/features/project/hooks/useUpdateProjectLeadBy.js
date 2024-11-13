import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateProjectLeadByService} from "../../../services/project/projectService.js";

export function useUpdateProjectLeadBy() {

    const {mutate: updateProjectLeadBy, isPending: isUpdating} = useMutation({
        mutationFn: updateProjectLeadByService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira assignee updated`);
            }
        }
    });

    return {updateProjectLeadBy, isUpdating};
}