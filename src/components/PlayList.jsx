import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

const PlayList = () => {
    const playlist = useContext(PlaylistContext);
    const list = () => {
        if (playlist.playlist[0]) {
            return (
                <>
                <ul className="playlist__list">
                    {playlist.playlist.map((item) => {
                        return (
                            <li key={item.id} className="list__item" onClick={() => {playlist.removeItem(item)}}>
                                <img src={item.album.cover_small} alt={item.artist.name} className="item__img" />
                                <div className="item__text">
                                    <h3 className="item__title">{item.title}</h3>
                                    <h4 className="item__artist">{item.artist.name}</h4>
                                </div>
                                <i className="far fa-times-circle"></i>
                            </li>
                        );
                    })}
                </ul>
                <button className="playslist__save" onClick={playlist.changeModal}>Save<i className="fas fa-download"></i></button>
                </>
            );
        } else {
            return (
                <div className="playlist__empty">
                    <div className="empty__icons">
                        <i className="icon__empty"></i>
                        <i className="icon__empty"></i>
                        <i className="icon__empty"></i>
                    </div>
                    <h1 className="empty__title">
                        Add your songs :)
                    </h1>
                </div>
            );
        }
    }
    return (
        <div className="deezer__playlist">
            <h3 className="playlist__title">Your playlist</h3>
            <div className="playlist__content">
                {list()}
            </div>
        </div>
    );
}

export default PlayList;