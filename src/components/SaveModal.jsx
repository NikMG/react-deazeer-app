import { useContext, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import validator from "validator";

const SaveModal = () => {
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [disable, setDisable] = useState(true);
    const playlist = useContext(PlaylistContext);

    const validName = (event) => {
        let name = '';
        name = event.target.value;

        if (name.length < 3) {
            setNameError('Min length for this field is: 3');
            setDisable(true);
        } else {
            setNameError('');
        }
    }

    const validEmail = (event) => {
        let email = event.target.value;

        if (validator.isEmail(email)) {
            setEmailError('');
            setDisable(false);
        } else {
            setEmailError('Required format name@example.com');
            setDisable(true);
        }
    }

    return (
        <div className="save__modal">
            <h2 className="modal__title">Save</h2>
            <div className="modal__inputs">
                <div className="input__block">
                    <input placeholder="name of playlist" onChange={validName} type="text" name="name" className="modal__name" />
                    <span className="error">{nameError}</span>
                </div>
                <div className="input__block">
                    <input placeholder="email" onChange={validEmail} type="text" name="email" className="modal__email" />
                    <span className="error">{emailError}</span>
                </div>
            </div>
            <div className="modal__controls">
                <button className="control__btn" onClick={playlist.changeModal}>Cancel</button>
                <button disabled={disable} className="control__btn" onClick={playlist.save}>Save</button>
            </div>
        </div>
    );
}

export default SaveModal;