import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateJiraAssigneeService} from "../../../services/jira/jiraService.js";

export function useUpdateJiraAssignee() {

    const {mutate: updateJiraAssignee, isPending: isUpdating} = useMutation({
        mutationFn: updateJiraAssigneeService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira assigned to updated`);
            }
        }
    });

    return {updateJiraAssignee, isUpdating};
}