import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateJiraSummaryService} from "../../../services/jira/jiraService.js";

export function useUpdateJiraSummary() {

    const {mutate: updateJiraSummary, isPending: isUpdating} = useMutation({
        mutationFn: updateJiraSummaryService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira summary updated`);
            }
        }
    });

    return {updateJiraSummary, isUpdating};
}