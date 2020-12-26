import React from 'react';
import SongCard from './SongCard';

const SongList = (props) => {
    if (props.songs){
        return props.songs.map(song => {
            return (<SongCard
                    key={song.id} 
                    songId={song.id}
                    title={song.title} 
                    singers={song.singers.join(", ")} 
                    albumName={song.albumName}
                    duration={song.duration}
                    playlistMode={props.playlistMode}
                    addBtnRequired={props.addBtnRequired}
                    imgLarge={song.url}
                    imgThumb={song.thumbnailUrl} />);
        });
    }else{
        return (<h1>Loading...</h1>);
    }
}

export default SongList;