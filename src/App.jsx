import { useState } from 'react';
import Sidebar from './components/sidebar'
import styles from './App.module.css'
import Middle from './components/middle'
import Playcard from './components/playcard'

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [songsQueue, setSongsQueue] = useState([]);
  const [selectedSongIndex,setSelectedSongIndex] = useState(null);
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.middle}>
        <Middle setCurrentSong={setCurrentSong} setSongsQueue={setSongsQueue} selectedSongIndex={selectedSongIndex} setSelectedSongIndex={setSelectedSongIndex}/>
      </div>
      <div className={styles.playcard}>
        <Playcard setCurrentSong={setCurrentSong} currentSong={currentSong} songsQueue={songsQueue} setSelectedSongIndex={setSelectedSongIndex}/>
      </div>
    </div>
  )
}

export default App
