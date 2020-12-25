import React, { Component } from 'react';
import styles from './Playlist.module.css';
import { Grid, Typography, Button } from '@material-ui/core';
import SongList from './../components/SongList';
import Cockpit from './Cockpit';
import { getSongDetailsWithAlbum, getSongsBySearch } from './../utils/DataHelper';
import { connect } from 'react-redux';

class PlaylistDetail extends Component {

    state = {
        addSongsUi: false,
        songsToAdd: [],
        searchQuery: ""
    }

    addSongHandler = () => {
        getSongDetailsWithAlbum(1, Number.MAX_SAFE_INTEGER)
            .then(songs => {
                let currentPlaylist = this.props.myPlaylist.filter(pl => pl.id == this.props.currentPlaylistShown)[0];
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

    render() {
        let content = (
            <Grid container item md={12}>
                <Grid item md={3}></Grid>
                <Grid item md={6}>
                    <SongList songs={this.props.songs} playlistMode />
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
                    <Grid item md={6} container>
                        <Grid item md={7}>
                            <Typography
                                variant='subtitle1'>
                                {this.props.showPlaylistDetail.playlistName}
                            </Typography>
                        </Grid>
                        <Grid md={5} item container className={styles.BtnSpacing}>
                            <Button color="primary" variant="contained">Shuffle</Button>
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