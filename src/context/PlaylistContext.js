import { createContext } from "react";

function noop() {}

export const PlaylistContext = createContext({
    playlist: null,
    add: noop,
    save: noop,
    removeItem: noop,
    modal: null,
    changeModal: noop,
    done: null,
});