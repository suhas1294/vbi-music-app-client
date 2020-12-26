import React, { Component } from 'react';
import styles from './Playlist.module.css';
import { Grid, Button } from '@material-ui/core';
import SongList from './../components/SongList';
import Cockpit from './Cockpit';
import { getSongDetailsWithAlbum, getSongsBySearch, shuffle } from './../utils/DataHelper';
import { connect } from 'react-redux';

class PlaylistDetail extends Component {

    state = {
        addSongsUi: false,
        songsToAdd: [],
        searchQuery: "",
        songs: []
    }

    componentDidMount(){
        this.setState({songs: this.props.songs});
    }
    
    componentDidUpdate(){
        let updatedPlaylist = this.props.myPlaylist.filter(pl => pl.id === this.props.currentPlaylistShown)[0];
        let updatedSongIds = updatedPlaylist.songIds.sort();
        let oldSongIds = this.state.songs.map(s => s.id).sort();
        if ((JSON.stringify(updatedSongIds) !== JSON.stringify(oldSongIds)) && !this.state.addSongsUi){
            let updatedSongsList = this.state.songs.filter(s => updatedSongIds.includes(s.id));
            this.setState({songs: updatedSongsList})
        }
    }

    addSongHandler = () => {
        getSongDetailsWithAlbum(1, Number.MAX_SAFE_INTEGER)
            .then(songs => {
                let currentPlaylist = this.props.myPlaylist.filter(pl => pl.id === this.props.currentPlaylistShown)[0];
                let minusExisting = songs.filter(song => !currentPlaylist.songIds.includes(song.id))
                minusExisting = minusExisting.slice(1, 15);
                return minusExisting;
            })
            .then(songs => {
                this.setState({ addSongsUi: true, songsToAdd: songs });
            })
            .catch(err => console.error(err));
    }

    addSearchHandler = (query) => {
        this.setState({searchQuery: query});
        getSongsBySearch(query)
            .then(searchedMatches => {
                this.setState({songsToAdd: searchedMatches})
            })
            .catch(err => console.error(err));
    }

    shuffleHandler = () => {
        let shuffledSongs = shuffle(this.state.songs);
        this.setState({songs: shuffledSongs});
    }

    render() {
        let content = (
            <Grid container item md={12}>
                <Grid item md={3}></Grid>
                <Grid item xs={12} md={6}>
                    <SongList songs={this.state.songs} playlistMode />
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
        );
        if (this.state.addSongsUi) {
            content = <Cockpit
                searchQuery={this.state.searchQuery}
                onSearch={this.addSearchHandler}
                songs={this.state.songsToAdd}
                playlistMode={false}
                addBtnRequired />

        }
        return (
            <React.Fragment>
                <Grid item container xs={12} alignItems="baseline" style={{ margin: '1rem 0' }}>
                    <Grid item md={3}></Grid>
                    <Grid item xs={12} md={6} container>
                        <Grid item md={7}>
                            <p id={styles.PlaylistTitle}>
                                Playlist Name: <span> {this.props.showPlaylistDetail.playlistName} </span>
                            </p>
                            {/* <Typography
                                variant='subtitle1'>
                                {this.props.showPlaylistDetail.playlistName}
                            </Typography> */}
                        </Grid>
                        <Grid md={5} item container className={styles.BtnSpacing}>
                            <Button color="primary" onClick={this.shuffleHandler} variant="contained">Shuffle</Button>
                            <Button color="secondary" onClick={this.addSongHandler} variant="contained">Add Songs</Button>
                        </Grid>
                    </Grid>
                    {content}
                </Grid>
                <Grid item md={3}></Grid>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        myPlaylist: state.myPlaylist,
        currentPlaylistShown: state.currentPlaylistIdShown
    }
}

export default connect(mapStateToProps)(PlaylistDetail);