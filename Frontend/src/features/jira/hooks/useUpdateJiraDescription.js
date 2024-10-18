import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateJiraDescriptionService} from "../../../services/jira/jiraService.js";

export function useUpdateJiraDescription() {

    const {mutate: updateJiraDescription, isPending: isUpdating} = useMutation({
        mutationFn: updateJiraDescriptionService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira description update`);
            }
        }
    });

    return {updateJiraDescription, isUpdating};
}