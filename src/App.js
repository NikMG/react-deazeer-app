import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { PlaylistContext } from './context/PlaylistContext';
import { useSavePlaylist } from './hooks/savePlaylist.hook';
import { UseRoutes } from './routes';

function App() {
  const { save, add, playlist, removeItem, modal, changeModal, done } = useSavePlaylist();
  const routes = UseRoutes();
  return (
    <div className='deezer'>
      <Header />
      <PlaylistContext.Provider value={{
        playlist: playlist,
        save: save,
        add: add,
        removeItem: removeItem,
        modal: modal,
        changeModal: changeModal,
        done: done, 
      }}>
        <BrowserRouter>
          <div className="deezer__wrapper">
            {routes}
          </div>
        </BrowserRouter>
      </PlaylistContext.Provider>
    </div>
  );
}

export default App;
