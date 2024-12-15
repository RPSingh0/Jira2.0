import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {createProjectCommentService} from "../../../services/comments/commentsService.js";

export function useCreateProjectComment() {

    // hit endpoint to get user details with email and password
    const {mutate: createProjectComment, isPending: isCreating} = useMutation({
        mutationFn: createProjectCommentService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("SingleComment added...");
            }
        }
    });

    return {createProjectComment, isCreating};
}