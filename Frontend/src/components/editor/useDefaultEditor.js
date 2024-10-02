import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

function useDefaultEditor(content) {
    return useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            Highlight
        ],
        content: content,
    });
}

export default useDefaultEditor;