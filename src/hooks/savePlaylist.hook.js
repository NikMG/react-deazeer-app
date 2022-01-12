import { useEffect, useState } from "react"

const storageName = "myPlaylist";

export const useSavePlaylist = () => {
    const [playlist, setPlaylist] = useState([]);
    const [modal, setModal] = useState(false);
    const [done, setDone] = useState(false);

    const add = (playlistItem) => {
        setPlaylist([...playlist, playlistItem]);
    }

    const save = () => {
        localStorage.setItem(storageName, JSON.stringify({
            data: playlist
        }));
        setModal(false);
        setDone(true);
        setTimeout(() => {
            setDone(false);
        }, 2000);
    }

    const changeModal = () => {
        setModal(!modal);
    }

    const removeItem = (item) => {
        let index = playlist.indexOf(item);
        let newPlaylist = [...playlist];

        if (index > -1) {
            newPlaylist.splice(index, 1);
            setPlaylist(newPlaylist);
        }
    }

    useEffect(() => {
        const dataPlaylist = JSON.parse(localStorage.getItem(storageName));

        if (dataPlaylist && dataPlaylist.data) {
            setPlaylist(dataPlaylist.data);
        }
    }, []);

    return { add, save, playlist, removeItem, modal, changeModal, done };
}