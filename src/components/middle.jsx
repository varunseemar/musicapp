import React,{useState,useRef,useEffect} from "react";
import styles from "../styles/middle.module.css";
import background from "../images/Background.png";
import verified from "../images/verified.png";
import BillieJean from "../music/Billie Jean.mp3";
import Dangerous from "../music/Dangerous.mp3";
import HealTheWorld from "../music/Heal The World.mp3";
import SmoothCriminal from "../music/Smooth Criminal.mp3";
import TheyDontCareAboutUs from "../music/They Dont Care About Us.mp3";
import songplaying from "../images/songplaying.png";
import {useDrag,useDrop,DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
const ItemType = "SONG";

const Middle = ({setCurrentSong,setSongsQueue,selectedSongIndex,setSelectedSongIndex}) => {
  const [songs, setSongs] = useState([
    {title: "Billie Jean", artist: "Michael Jackson", audio: BillieJean, duration: "4:55", album: "Solo", thumbnail: "https://m.media-amazon.com/images/I/51IJG7kIFdL._UF1000,1000_QL80_.jpg"},
    {title: "Dangerous", artist: "Michael Jackson", audio: Dangerous, duration: "4:09", album: "Solo", thumbnail: "https://i.pinimg.com/736x/09/01/be/0901befe27e441c7c75babcbf835087a.jpg"},
    {title: "Heal The World", artist: "Michael Jackson", audio: HealTheWorld, duration: "6:22", album: "Solo", thumbnail: "https://upload.wikimedia.org/wikipedia/en/8/87/Michael_Jackson_-_Heal_the_World.png"},
    {title: "Smooth Criminal", artist: "Michael Jackson", audio: SmoothCriminal, duration: "9:25", album: "Solo", thumbnail: "https://i1.sndcdn.com/artworks-1OHOA4uZkbc36Prf-ht3dkw-t500x500.jpg"},
    {title: "They Dont Care About Us", artist: "Michael Jackson", audio: TheyDontCareAboutUs, duration: "4:41", album: "Solo", thumbnail: "https://i1.sndcdn.com/artworks-000150622312-e1npgr-t500x500.jpg"},
  ]);
  const songRefs = useRef([]);
  setSongsQueue(songs);
  const handleSongClick = (song, index) => {
    setSelectedSongIndex(index);
    setCurrentSong(song);
  };

  useEffect(() => {
    if(selectedSongIndex !== null && songRefs.current[selectedSongIndex]){
      songRefs.current[selectedSongIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  },[selectedSongIndex]);

  const moveSong = (dragIndex, hoverIndex) => {
    const updatedSongs = [...songs];
    const [removed] = updatedSongs.splice(dragIndex, 1);
    updatedSongs.splice(hoverIndex, 0, removed);
    setSongs(updatedSongs);
    setSongsQueue(updatedSongs);
    if(selectedSongIndex === dragIndex){
        setSelectedSongIndex(hoverIndex);
    } 
    else if(selectedSongIndex === hoverIndex){
        setSelectedSongIndex(dragIndex);
    }
  };

  const SongItem = ({song, index }) => {
    const [, ref] = useDrag({
      type: ItemType,
      item: {index },
    });

    const [, drop] = useDrop({
      accept: ItemType,
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveSong(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => {ref(drop(node));
        songRefs.current[index] = node;}}
        className={`${selectedSongIndex === index ? styles.selectedSong : styles.middleSongItem}`}
        onClick={() => handleSongClick(song, index)}
      >
        <p>
          {selectedSongIndex === index ? (
            <img src={songplaying} alt="Playing" className={styles.songPlayingIcon} />) : (index + 1)}
        </p>
        <div className={selectedSongIndex === index ? styles.middleSongTitleWrapperSelected : styles.middleSongTitleWrapper}>
          <img className={styles.middleSongThumbnail} src={song.thumbnail} alt={song.title} />
          <p className={styles.middleSongTitle}>{song.title}</p>
        </div>
        <p className={styles.middleSongArtist}>{song.artist}</p>
        <p className={styles.middleSongTime}>{song.duration}</p>
        <p className={styles.middleSongAlbum}>{song.album}</p>
      </div>
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.middleMain}>
        <div className={styles.middleHeader}>
          <p>Music</p>
          <p>Podcast</p>
          <p>Live</p>
          <p>Radio</p>
          <input placeholder="Search"></input>
        </div>
        <div className={styles.middleCreatorImage} style={{backgroundImage: `url(${background})` }}>
          <div className={styles.middleCreatorImageVerified}>
            <img src={verified} alt="Verified"></img>
            <p>Verified Artist</p>
          </div>
          <p className={styles.middleCreatorImageArtistName}>Michael Jackson</p>
          <p className={styles.middleCreatorImageListeners}>27.852.501 monthly listeners</p>
        </div>
        <div className={styles.middleSongs}>
          <div className={styles.middleSongsHeader}>
            <p>Popular</p>
            <p>See All</p>
          </div>
          <div className={styles.middleSongsTitle}>
            <p>#</p>
            <p className={styles.middleSongsTitleTitleText}>Title</p>
            <p className={styles.middleSongsTitlePlayingText}>Artist</p>
            <p className={styles.middleSongsTitleTimeText}>Time</p>
            <p className={styles.middleSongsTitleAlbumText}>Album</p>
          </div>
          <div className={styles.middleSongsList}>
            {songs.map((song, index) => (
              <SongItem key={index} song={song} index={index} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Middle;