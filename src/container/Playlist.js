import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import PlaylistDetail from './PlaylistDetail';
import { getSongDetailsWithAlbum } from './../utils/DataHelper';
import PlaylistIndex from '../components/PlaylistIndex';
import { connect } from 'react-redux';
import * as actions from './../store/actions/index';
import AddPlaylist from './AddPlaylist';

class Playlist extends Component {
    state = {
        showPlaylistIndex: true,
        showPlaylistDetail: null,
        selectedPlaylistSongs: [],
        allSongs: [],
        createPlaylistMode: false
    }

    playlistClickHandler = (pid) => {
        let currentPlaylist = this.props.playlist.filter(pl => pl.id == pid)[0];
        if (!currentPlaylist){
            this.setState({showPlaylistIndex: true, showPlaylistDetail: null});
        }else{
            // this.props.loadPlaylist();
            let songIds = currentPlaylist.songIds;
            this.getPlaylistDetails(songIds)
                .then(songs => {
                    this.props.setPlaylistShown(pid);
                    this.setState({
                        showPlaylistIndex: false,
                        showPlaylistDetail: currentPlaylist,
                        selectedPlaylistSongs: songs
                    })
                })
                .catch(err => console.error("Failed to laod playlist, error:", err));
        }
    }

    getPlaylistDetails = async (songIds) => {
        return getSongDetailsWithAlbum(1, Number.MAX_SAFE_INTEGER)
            .then(songs => songs.filter(song => songIds.includes(song.id)))
            .catch(err => console.error("Failed to laod playlist, error:", err));
    }

    componentDidUpdate(prevProp) {
        if (prevProp.playlist != this.props.playlist && this.props.currentPlaylistDetailShown) {
            this.playlistClickHandler(this.props.currentPlaylistDetailShown);
        }
    }

    createPlaylistHandler = () => {
        this.props.clearCurPlaylist();
        this.setState({createPlaylistMode: true});
        getSongDetailsWithAlbum(1, 100)
            .then(songs => this.setState({allSongs: songs}))
            .catch(err => console.error(err));
    };

    componentDidMount(){
        this.props.loadPlaylist();
    }

    render() {
        let content = null;
        if (this.state.showPlaylistIndex && this.props.playlist && this.props.playlist.length > 0) {
            content = <PlaylistIndex playlistArr={this.props.playlist} showDetail={this.playlistClickHandler} />;
        }
        if (!this.state.showPlaylistIndex && this.props.playlist.length > 0 & !this.state.createPlaylistMode) {
            content = (
                <PlaylistDetail
                    showPlaylistDetail={this.state.showPlaylistDetail}
                    songs={this.state.selectedPlaylistSongs}
                />
            )
        }
        if (this.state.createPlaylistMode){
            content = (
                <AddPlaylist songs={this.state.allSongs} />
            )
        }
        return (
            <Grid container item xs={12}>
                <Grid container item style={{ marginTop: '1rem' }}>
                    <Grid item md={3}></Grid>
                    <Grid item md={6} container justify="center" alignItems="center">
                        <Button color="primary" variant="contained" onClick={this.createPlaylistHandler} >Create Playlist</Button>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
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
        setPlaylistShown: (pid) => dispatch(actions.setCurrentPlaylistShown(pid)),
        loadPlaylist: () => dispatch(actions.loadPlaylist()),
        clearCurPlaylist: () => dispatch(actions.clearCurrentShownPlaylist())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);