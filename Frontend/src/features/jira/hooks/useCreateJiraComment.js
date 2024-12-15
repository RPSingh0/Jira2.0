import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {createJiraCommentService} from "../../../services/comments/commentsService.js";

export function useCreateJiraComment() {

    // hit endpoint to get user details with email and password
    const {mutate: createJiraComment, isPending: isCreating} = useMutation({
        mutationFn: createJiraCommentService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("SingleComment added...");
            }
        }
    });

    return {createJiraComment, isCreating};
}