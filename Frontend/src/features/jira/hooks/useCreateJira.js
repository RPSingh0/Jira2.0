import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {createJiraService} from "../../../services/jira/jiraService.js";

export function useCreateJira() {

    const {mutate: createJira, isPending: isCreating} = useMutation({
        mutationFn: createJiraService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira created ${data.data.jiraKey}`);
            }
        }
    });

    return {createJira, isCreating};
}