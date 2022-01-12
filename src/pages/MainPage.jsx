import { useContext } from "react";
import PlayList from "../components/PlayList";
import SaveModal from "../components/SaveModal";
import Search from "../components/Search";
import { PlaylistContext } from "../context/PlaylistContext";

const MainPage = () => {
    const playlist = useContext(PlaylistContext);
    return (
        <div className="deezer__content">
            <PlayList />
            <Search />
            {playlist.modal && (
                <>
            <SaveModal />
            <div className="bg-black"></div>
            </>
            )}
            {playlist.done && (
                <div className="succes">
                    <i className="far fa-check-circle"></i>
                    Successfully saved playlist
                </div>
            )}
        </div>
    );
}

export default MainPage;