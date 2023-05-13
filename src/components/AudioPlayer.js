import React, { useState, useEffect, useRef } from 'react';
import "../pomodoro.css"
import rain from '../audio/rain1.mp3';
import water from '../audio/water_stream1.mp3';
import jungle from '../audio/jungle_night1.mp3';
import fire from '../audio/fire1.mp3';
import bird from '../audio/bird1.mp3';
import beach from '../audio/beach_waves1.mp3';

//images
import Rain from '../images/rain.jpg';
import Water from '../images/water.jpg';
import Fire from '../images/fire.jpg';
import Bird from '../images/bird.jpg';
import Jungle from '../images/jungle_night.jpg';
import Beach from '../images/beach.jpg';


const musics = [
  {
    id: 1,
    source: rain,
    title: 'Rain',
    image: Rain,
    volume: 1
  },
  {
    id: 2,
    source: water,
    title: 'Water Stream',
    image: Water,
    volume: 1
  },
  {
    id: 3,
    source: jungle,
    title: 'Jungle Night',
    image: Jungle,
    volume: 1
  },
  {
    id: 4,
    source: fire,
    title: 'Fire',
    image: Fire,
    volume: 1
  },
  {
    id: 5,
    source: bird,
    title: 'Bird',
    image: Bird,
    volume: 1
  },
  {
    id: 6,
    source: beach,
    title: 'Beach Waves',
    image: Beach,
    volume: 1
  },
];

const AudioPlayer = () => {
  const [currentMusic, setCurrentMusic] = useState(0);
  const [isPlaying, setIsPlaying] = useState(Array(musics.length).fill(false));
  const [audio] = useState(musics.map(music => new Audio(music.source)));
  const [currentVolume, setCurrentVolume] = useState(Array(musics.volume).fill(1));
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audio[currentMusic].addEventListener('timeupdate', () => {
      if (audio[currentMusic].currentTime > audio[currentMusic].duration - 4) {
        audio[currentMusic].currentTime = 2;
      }
    });

    return () => {
      audio[currentMusic].removeEventListener('timeupdate', () => {});
    };
  }, [currentMusic]);

  const togglePlay = (id) => {
    if (isPlaying[id - 1]) {
      audio[id - 1].pause();
      setIsPlaying(prevState => {
        const newState = [...prevState];
        newState[id - 1] = false;
        return newState;
      });
      setCurrentPlaying(null);
    } else {
      if (audioRef.current !== null) {
        audioRef.current.pause();
      }
      audio[id - 1].play();
      setIsPlaying(prevState => {
        const newState = [...prevState];
        newState[id - 1] = true;
        return newState;
      });
      setCurrentPlaying(id);
      setActiveCard(id);
      audioRef.current = audio[id - 1];
    }
  };

  const handleMusicChange = (id) => {
    setCurrentMusic(id - 1);
    setIsPlaying(Array(musics.length).fill(false));
    setActiveCard(id);
    audioRef.current = null;
    togglePlay(id);
  };

    const handleVolumeChange = (id, volume) => {
    audio[id - 1].volume = volume;
    setCurrentVolume(prevState => {
      const newState = [...prevState];
      newState[id - 1] = volume;
      return newState;
    });
  };

  return (
    <div className='parent'>
      <div className="audio-player">
        {musics.map(music => (
          <div
            key={music.id}
            className={` ${currentPlaying === music.id ? "playing" : ""} ${isPlaying[music.id - 1] ? "active" : ""}`}
          >
            <div className="music-card music-card-image" onClick={() => togglePlay(music.id)}>
              <img src={music.image} alt={music.title} className={currentPlaying === music.id ? "playing" : ""} />
            </div>
            <h2>{music.title}</h2>
            <div className="volume-control">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentVolume[music.id - 1]}
                onChange={(e) => handleVolumeChange(music.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;


