import React from 'react'
import { useState,useEffect } from 'react'
import styles from '../styles/middle.module.css'
import background from '../images/Background.png'
import verified from '../images/verified.png'
import BillieJean from '../music/Billie Jean.mp3'
import Dangerous from '../music/Dangerous.mp3'
import HealTheWorld from '../music/Heal The World.mp3'
import SmoothCriminal from '../music/Smooth Criminal.mp3'
import TheyDontCareAboutUs from '../music/They Dont Care About Us.mp3'

const middle = () => {
    const songs = [
        { title: "Billie Jean", artist: "Michael Jackson", audio: {BillieJean}, duration:"4:55" ,album:"Solo", thumbnail:"https://m.media-amazon.com/images/I/51IJG7kIFdL._UF1000,1000_QL80_.jpg" },
        { title: "Dangerous", artist: "Michael Jackson", audio: {Dangerous}, duration:"4:09" ,album:"Solo", thumbnail:"https://i.pinimg.com/736x/09/01/be/0901befe27e441c7c75babcbf835087a.jpg"  },
        { title: "Heal The World", artist: "Michael Jackson", audio: {HealTheWorld}, duration:"6:22" ,album:"Solo", thumbnail:"https://upload.wikimedia.org/wikipedia/en/8/87/Michael_Jackson_-_Heal_the_World.png"  },
        { title: "Smooth Criminal", artist: "Michael Jackson", audio: {SmoothCriminal}, duration:"9:25" ,album:"Solo", thumbnail:"https://i1.sndcdn.com/artworks-1OHOA4uZkbc36Prf-ht3dkw-t500x500.jpg"  },
        { title: "They Dont Care About Us", artist: "Michael Jackson", audio: {TheyDontCareAboutUs}, duration:"4:41" ,album:"Solo", thumbnail:"https://i1.sndcdn.com/artworks-000150622312-e1npgr-t500x500.jpg"  },
    ];
  return (
    <div className={styles.middleMain}>
        <div className={styles.middleHeader}>
            <p>Music</p>
            <p>Podcast</p>
            <p>Live</p>
            <p>Radio</p>
            <input placeholder='Search'></input>
        </div>
        <div className={styles.middleCreatorImage} style={{backgroundImage: `url(${background})`}}>
            <div className={styles.middleCreatorImageVerified}>
                <img src={verified}></img>
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
                    <div className={styles.middleSongItem} key={index}>
                        <p>{index + 1}</p>
                        <div className={styles.middleSongTitleWrapper}>
                            <img className={styles.middleSongThumbnail} src={song.thumbnail} alt={song.title} />
                            <p className={styles.middleSongTitle}>{song.title}</p>
                        </div>
                        <p className={styles.middleSongArtist}>{song.artist}</p>
                        <p className={styles.middleSongTime}>{song.duration}</p>
                        <p className={styles.middleSongAlbum}>{song.album}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default middle