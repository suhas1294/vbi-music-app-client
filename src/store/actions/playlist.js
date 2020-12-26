import * as actionType from './actionTypes';

export const addSongToPlaylist = (details) => {
    return{
        type: actionType.ADD_TO_PLAYLIST,
        details: details
    }
}

export const removeFromPlaylist = (details) => {
    return{
        type: actionType.REMOVE_FROM_PLAYLIST,
        details: details
    }
}

export const editPlayistTitle = (playlistId) => {
    return{
        type: actionType.REMOVE_FROM_PLAYLIST,
        playlistId: playlistId
    }
}

export const setCurrentPlaylistShown = (playlistId) => {
    return{
        type: actionType.SET_CURRENT_PLAYLIST_SHOWN,
        playlistId: playlistId
    }
}

export const savePlaylist = (playlistName) => {
    return{
        type: actionType.SAVE_PLAYLIST,
        playlistName: playlistName
    }
}

export const loadPlaylist = () => {
    return{
        type: actionType.LOAD_PLAYLIST
    }
}

export const clearCurrentShownPlaylist = () => {
    return{
        type: actionType.CLEAR_CURRENT_SHOWN_PLAYLIST
    }
}