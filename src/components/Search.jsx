import { useState, useEffect, useCallback, useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { useHttp } from "../hooks/https.hook";

const Search = () => {
    const [result, setResult] = useState([]);
    const [form, setForm] = useState({
        text: ''
    });
    const [coolDown, setCoolDown] = useState(false);
    const [reqAgain, setReqAgain] = useState(false);
    const playlist = useContext(PlaylistContext);

    const { request, loading } = useHttp();

    const changeHandler = (event) => {

        setForm({ ...form, text: event.target.value });

        if (form.text.length < 3) {
            setResult([]);
        }
    }

    const keyPressed = (e) => {
        if (e.key === 'Enter' && !coolDown) {
            handleRequest();
        }
    }

    const handleRequest = useCallback(async () => {
        setCoolDown(true);
        const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + form.text;
        const searchResult = await request(url);
        setResult(searchResult);
        if (result.data) {
            setReqAgain(false);
            setTimeout(() => {
                setCoolDown(false);
            }, 5000);
        } else {
            setReqAgain(true);
        }
    }, [form, request, result]);

    useEffect(() => {

        if (reqAgain) {
            handleRequest();
            setReqAgain(false);
        }

    }, [reqAgain, handleRequest]);

    const searchList = () => {
        if (loading) {
            return (
                'Loading...'
            );
        } else if (!result.data) {
            return (
                <div className="search__empty">
                    <div className="empty__icons">
                        <i className="icon__empty"></i>
                        <i className="icon__empty"></i>
                        <i className="icon__empty"></i>
                    </div>
                    <h1 className="empty__title">
                        Type in your favorite artist or song
                    </h1>
                </div>
            );
        } else {
            return (
                <ul className="search__list">
                    {result.data.map((item) => {
                        return (
                            <li key={item.id} className="list__item" onClick={() => {playlist.add(item)}}>
                                <img src={item.album.cover_small} alt={item.artist.name} className="item__img" />
                                <div className="item__text">
                                    <h3 className="item__title">{item.title}</h3>
                                    <h4 className="item__artist">{item.artist.name}</h4>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )
        }
    }

    return (
        <div className="deezer__seacrch">
            <input className="search__input" type="text" placeholder="Search" onChange={changeHandler} onKeyDown={keyPressed} />
            <div className="search__result">
                {searchList()}
            </div>
        </div>
    );
}

export default Search;