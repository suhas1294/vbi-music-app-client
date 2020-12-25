import React, { Component } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import PlaylistCard from './../components/PlaylistCard';
import PlaylistDetail from './PlaylistDetail';
import { getSongDetailsWithAlbum  } from './../utils/DataHelper';
import PlaylistIndex from '../components/PlaylistIndex';
import { connect } from 'react-redux';
import * as actions from './../store/actions/index';

class Playlist extends Component {
    state = {
        showPlaylistIndex: true,
        showPlaylistDetail: null,
        selectedPlaylistSongs: []
    }

    playlistClickHandler = (pid) => {
        let currentPlaylist = this.props.playlist.filter(pl => pl.id == pid)[0];
        let songIds = currentPlaylist.songIds;
        this.getPlaylistDetails(songIds)
            .then(songs => {
                this.props.setPlaylistShown(pid);
                this.setState({
                    showPlaylistIndex: false, 
                    showPlaylistDetail: currentPlaylist,
                    selectedPlaylistSongs: songs
                })})
            .catch(err => console.error("Failed to laod playlist, error:", err));
    }

    getPlaylistDetails = async (songIds) => {
        return getSongDetailsWithAlbum(1, Number.MAX_SAFE_INTEGER)
            .then(songs => songs.filter(song => songIds.includes(song.id)))
            .catch(err => console.error("Failed to laod playlist, error:", err));
    }

    componentDidUpdate(prevProp){
        if(prevProp.playlist != this.props.playlist){
            this.playlistClickHandler(this.props.currentPlaylistDetailShown);
        }
    }

    render() {
        let content = null;
        if(this.state.showPlaylistIndex){
            content = <PlaylistIndex playlistArr={this.props.playlist} showDetail={this.playlistClickHandler} />;
        }
        if(!this.state.showPlaylistIndex && this.props.playlist.length > 0){
            content = (
                <PlaylistDetail 
                    showPlaylistDetail={this.state.showPlaylistDetail} 
                    songs={this.state.selectedPlaylistSongs}
                />
            )
        }

        return (
            <Grid container item xs={12}>
                {content}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        playlist: state.myPlaylist,
        currentPlaylistDetailShown: state.currentPlaylistIdShown
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPlaylistShown: (pid) => dispatch(actions.setCurrentPlaylistShown(pid))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);