import * as actionType from './../actions/actionTypes';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    currentPlaylistIdShown: null,
    myPlaylist: []
};

const playlistReducer = ( state=initialState, action ) => {
    switch(action.type) {
        case actionType.ADD_TO_PLAYLIST: return addSongToPlaylist(state, action.details);
        case actionType.REMOVE_FROM_PLAYLIST: return removeSongFromPlaylist(state, action.details);
        case actionType.SET_CURRENT_PLAYLIST_SHOWN: return setCurrentPlaylistIdShown(state, action.playlistId);
        case actionType.SAVE_PLAYLIST: return savePlaylist(state, action.playlistName);
        case actionType.LOAD_PLAYLIST: return loadPlaylist(state);
        case actionType.CLEAR_CURRENT_SHOWN_PLAYLIST: return clearCurrentShownPlaylist(state);
        default: return state;
    }
};

const addSongToNewPlaylist = (state, details) => {
    let generatedId = uuidv4();
    let tempPlaylist = {
        id: generatedId,
        playlistName: 'unsaved',
        songIds: [details.songId],
        createdAt: new Date().toLocaleString()
    }
    let updatedArr = state.myPlaylist ? [...state.myPlaylist] : [];
    updatedArr.push(tempPlaylist);
    return {...state, myPlaylist: updatedArr, currentPlaylistIdShown: generatedId };
}

const addSongToPlaylist = (state, details) => {
    if(!details.pid){
        return addSongToNewPlaylist(state, details)
    }
    let playlistToBeEdited = state.myPlaylist.filter(pl => pl.id === details.pid)[0];
    let updatedPlaylistSongs = [...playlistToBeEdited.songIds, details.songId];
    playlistToBeEdited.songIds = [...new Set(updatedPlaylistSongs)];
    let playlistArr = state.myPlaylist.filter(pl => pl.id !== details.pid);
    playlistArr.push(playlistToBeEdited);
    // playlistArr = playlistArr.filter(pl => !pl.playlistName.includes('unsaved'));
    if(playlistToBeEdited){
        let newState = {...state, myPlaylist: playlistArr};
        localStorage.setItem('playlist', JSON.stringify(playlistArr));
        return newState;
    }else{
        return state;
    }
}

const removeSongFromPlaylist = (state, details) => {
    let playlistObjToBeEdited = state.myPlaylist.filter(pl => pl.id === details.pid)[0];
    let toBeRemovedSongIndex = playlistObjToBeEdited.songIds.indexOf(details.songId);
    playlistObjToBeEdited.songIds.splice(toBeRemovedSongIndex, 1);
    let playlistArray = state.myPlaylist.filter(obj => obj.id !== details.pid);
    // delete playlist if all songs are removed in it.
    if(playlistObjToBeEdited.songIds.length !== 0 ){
        playlistArray.push(playlistObjToBeEdited);
    }
    if(playlistArray){
        let newState = {...state, myPlaylist: [...playlistArray]};
        localStorage.setItem('playlist', JSON.stringify(playlistArray));
        return newState;
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

const loadPlaylist = (state) => {
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    if(playlist){
        let removeUnsavedPlaylist = playlist.filter(pl => !pl.playlistName.includes('unsaved'));
        localStorage.setItem('playlist', JSON.stringify(removeUnsavedPlaylist));
    }
    return {...state, myPlaylist: playlist}
}

const clearCurrentShownPlaylist = (state) => {
    return {...state, currentPlaylistIdShown: null}
}

const savePlaylist = (state, newName) => {
    let playlistObjToBeEdited = state.myPlaylist.filter(pl => pl.id === state.currentPlaylistIdShown)[0];
    playlistObjToBeEdited.playlistName = newName;
    let playlistArray = state.myPlaylist.filter(obj => obj.id !== state.currentPlaylistIdShown);
    playlistArray.push(playlistObjToBeEdited);
    if(playlistArray){
        let newState = {...state, myPlaylist: [...playlistArray], currentPlaylistIdShown: null};
        localStorage.setItem('playlist', JSON.stringify([...playlistArray]));
        return newState;
    }else{
        return state;
    }
}

export default playlistReducer;