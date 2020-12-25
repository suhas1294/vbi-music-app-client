import React from 'react';
import SongCard from './SongCard';

const SongList = (props) => {
    if (props.songs){
        return props.songs.map(song => {
            return (<SongCard key={song.id} title={song.title} singer={song.singer} albumName={song.albumName} />);
        });
    }else{
        return (<h1>Loading...</h1>);
    }
}

export default SongList;