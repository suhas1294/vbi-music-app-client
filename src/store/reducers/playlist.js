import * as actionType from './../actions/actionTypes';

const initialState = {
    currentPlaylistIdShown: null,
    myPlaylist: [
        {
            id: 1,
            playlistName: "playlist-1",
            songIds: [1,2,3,4],
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            playlistName: "playlist-2",
            songIds: [6,7,8,9],
            createdAt: new Date().toISOString()
        }
    ]
};

const playlistReducer = ( state=initialState, action ) => {
    switch(action.type) {
        case actionType.ADD_TO_PLAYLIST: return addSongToPlaylist(state, action.details);
        case actionType.REMOVE_FROM_PLAYLIST: return removeSongFromPlaylist(state, action.details);
        case actionType.SET_CURRENT_PLAYLIST_SHOWN: return setCurrentPlaylistIdShown(state, action.playlistId);
        default: return state;
    }
};

const addSongToPlaylist = (state, details) => {
    let playlistToBeEdited = state.myPlaylist.filter(pl => pl.id == details.pid)[0];
    let updatedPlaylistSongs = [...playlistToBeEdited.songIds, details.songId];
    playlistToBeEdited.songIds = updatedPlaylistSongs;
    let playlistArr = state.myPlaylist.filter(pl => pl.id != details.pid);
    playlistArr.push(playlistToBeEdited);
    if(playlistToBeEdited){
        return {...state, myPlaylist: playlistArr}
    }else{
        return state;
    }
}

const removeSongFromPlaylist = (state, details) => {
    let playlistObjToBeEdited = state.myPlaylist.filter(pl => pl.id == details.pid)[0];
    let toBeRemovedSongIndex = playlistObjToBeEdited.songIds.indexOf(details.songId);
    playlistObjToBeEdited.songIds.splice(toBeRemovedSongIndex, 1);
    let playlistArray = state.myPlaylist.filter(obj => obj.id != details.pid);
    playlistArray.push(playlistObjToBeEdited);
    if(playlistArray){
        return {...state, myPlaylist: [...playlistArray]}
    }else{
        return state;
    }
}

const setCurrentPlaylistIdShown = (state, pid) => {
    return {
        ...state,
        currentPlaylistIdShown: pid
    }
}

export default playlistReducer;