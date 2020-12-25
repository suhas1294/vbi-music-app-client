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