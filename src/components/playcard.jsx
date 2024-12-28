import React, { useState, useEffect,useRef } from "react";
import { Howl } from "howler";
import styles from "../styles/playcard.module.css";
import {
    PlayArrow,
    Pause,
    SkipNext,
    SkipPrevious,
    Shuffle,
    ShuffleOn,
    Repeat,
    RepeatOn,
} from "@mui/icons-material";

const Playcard =({setCurrentSong,currentSong ,songsQueue,setSelectedSongIndex})=> {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [howlInstance, setHowlInstance] = useState(null);
  const [isShuffleEnabled, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const repeatModeRef = useRef(repeatMode);

  useEffect(()=> {
    if(howlInstance){
      howlInstance.unload();
    }
    if(currentSong?.audio){
      const newHowl = new Howl({
        src: [currentSong.audio],
        html5: true,
        onload:()=> setDuration(newHowl.duration()),
        onplay:()=> requestAnimationFrame(updateProgress),
        onend:()=> handleEnd(),
        autoplay: true,
      });
      setIsPlaying(true);
      setHowlInstance(newHowl);
      setCurrentTime(0);
      newHowl.play();
    }
  }, [currentSong]);
  
  useEffect(()=> {
    let animationId;
    
    const updateProgress =()=> {
      if(howlInstance && isPlaying){
        const currentSeek = howlInstance.seek();
        if(typeof currentSeek === 'number'){
          setCurrentTime(currentSeek);
        }
        animationId = requestAnimationFrame(updateProgress);
      }
    };
 
    if(isPlaying && howlInstance){
      updateProgress();
    }
 
    return()=> {
      if(animationId){
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying, howlInstance]);

  const togglePlayPause =()=> {
    if(howlInstance){
      if(isPlaying){
        howlInstance.pause();
      } 
      else{
        howlInstance.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress =()=> {
    if(howlInstance?.playing()){
      setCurrentTime(howlInstance.seek());
      requestAnimationFrame(updateProgress);
    }
  };

  const formatTime =(time)=> {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    repeatModeRef.current = repeatMode;
  }, [repeatMode]);

  const handleNext = () => {
    const currentIndex = songsQueue.findIndex(
      (song) => song.title === currentSong.title
    );
    if(isShuffleEnabled){
      const randomIndex = Math.floor(Math.random() * songsQueue.length);
      setCurrentSong(songsQueue[randomIndex]);
      setSelectedSongIndex(randomIndex);
    } 
    else{
      const nextIndex = (currentIndex + 1) % songsQueue.length;
      setCurrentSong(songsQueue[nextIndex]);
      setSelectedSongIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    const currentIndex = songsQueue.findIndex(
      (song) => song.title === currentSong.title
    );
    const prevIndex = (currentIndex - 1 + songsQueue.length) % songsQueue.length;
    setCurrentSong(songsQueue[prevIndex]);
    setSelectedSongIndex(prevIndex);
  };

  const handleEnd = () => {
    const currentRepeatMode = repeatModeRef.current;
    if(currentRepeatMode === 0){
        setIsPlaying(false);
    }
    else if(currentRepeatMode === 1){   
        handleNext();
    }
  };

  const toggleShuffle = () => {
    setShuffle(!isShuffleEnabled);
  };

  const toggleRepeat = () => {
    if(repeatMode === 0){
      setRepeatMode(1);
    } 
    else if(repeatMode === 1){
      setRepeatMode(0);
    }
  };

  const handleSeek =(time)=> {
    if(howlInstance){
      howlInstance.seek(time);
      setCurrentTime(time);
    }
  };

  return(
    <div className={styles.playcardMain}>
      <div className={styles.nowPlaying}>Now Playing</div>
      <div className={styles.imageContainer}>
        {currentSong && <img src={currentSong ? currentSong.thumbnail : ""} className={styles.songImage} />}
      </div>
      <div className={styles.songDetails}>
        <div className={styles.songName}>{currentSong?.title || "--"}</div>
        <div className={styles.artistName}>{currentSong?.artist || "--"}</div>
      </div>

      <div className={styles.progressBar}>
        <span>{formatTime(currentTime)}</span>
        <input type="range" className={styles.seekBar} min="0" max={duration || 0} value={currentTime} onChange={(e)=> handleSeek(Number(e.target.value))}/>
        <span>{formatTime(duration)}</span>
      </div>

      <div className={styles.controls}>
        {isShuffleEnabled ? (<ShuffleOn className={styles.icon} onClick={toggleShuffle} />) : (<Shuffle className={styles.icon} onClick={toggleShuffle} />)}
        <SkipPrevious className={styles.icon} onClick={handlePrevious} />
        {!isPlaying ? (<PlayArrow className={styles.icon} onClick={togglePlayPause} />) : (<Pause className={styles.icon} onClick={togglePlayPause} />)}
        <SkipNext className={styles.icon} onClick={handleNext} />
        {repeatMode === 0 ? (<Repeat className={styles.icon} onClick={toggleRepeat} />) : (<RepeatOn className={styles.icon} onClick={toggleRepeat} />)}
      </div>
    </div>
  );
};

export default Playcard;
