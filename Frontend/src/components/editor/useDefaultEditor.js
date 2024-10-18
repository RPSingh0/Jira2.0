import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

function useDefaultEditor(content) {
    const editingOn = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Highlight
        ],
        content: content,
    });

    const editingOff = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Highlight
        ],
        content: content,
        editable: false
    });

    return {editingOn, editingOff};
}

export default useDefaultEditor;