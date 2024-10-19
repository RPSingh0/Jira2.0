import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateJiraAssignedService} from "../../../services/jira/jiraService.js";

export function useUpdateJiraDescription() {

    const {mutate: updateJiraAssignedTo, isPending: isUpdating} = useMutation({
        mutationFn: updateJiraAssignedService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira assigned to updated`);
            }
        }
    });

    return {updateJiraAssignedTo, isUpdating};
}