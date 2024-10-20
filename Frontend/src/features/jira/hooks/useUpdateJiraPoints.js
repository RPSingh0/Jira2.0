import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateJiraPointsService} from "../../../services/jira/jiraService.js";

export function useUpdateJiraPoints() {

    const {mutate: updateJiraPoints, isPending: isUpdating} = useMutation({
        mutationFn: updateJiraPointsService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira points updated`);
            }
        }
    });

    return {updateJiraPoints, isUpdating};
}