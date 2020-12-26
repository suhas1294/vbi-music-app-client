import React, { Component } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import Cockpit from './Cockpit';
import { getSongDetailsWithAlbum, getSongsBySearch } from './../utils/DataHelper';
import { connect } from 'react-redux';
import * as actions from './../store/actions/index';

class AddPlaylist extends Component {
    
    state = {
        songs: [],
        playlistName: "",
        searchQuery: ""
    }

    componentDidMount(){
        getSongDetailsWithAlbum(1, 100)
            .then(songs => {
                this.setState({songs: songs})
            })
            .catch(err => console.error("failed to fetch songs, error details", err))
    }

    onSearchHandler = (query) => {
        this.setState({searchQuery: query});
        getSongsBySearch(query)
            .then(searchResults => {
                this.setState({songs: searchResults});   
            })
            .catch(err => console.error("Failed to search songs", err))
    }

    saveHandler = () => {
        this.props.savePlaylist(this.state.playlistName);
        window.location.reload();
    }

    render() {
        return (
            <Grid container item style={{ marginTop: '1%' }}>
                <Grid container item>
                    <Grid item md={3}></Grid>
                    <Grid item container md={6}>
                        <TextField
                            placeholder="Playlist Name"
                            name="playlist_name"
                            type="text"
                            fullWidth
                            color="primary"
                            variant='outlined'
                            value={this.state.playlistName}
                            onChange={(event) => { this.setState({playlistName: event.target.value}) }}
                        />
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
                <Cockpit
                    searchQuery={this.state.searchQuery}
                    onSearch={this.onSearchHandler}
                    songs={this.state.songs}
                    playlistMode={false}
                    addBtnRequired />

                <Grid container item style={{ marginTop: '1%' }}>
                    <Grid container item>
                        <Grid item md={3}></Grid>
                        <Grid item container md={6} justify='center'>
                            <Button color="primary" variant="contained" onClick={this.saveHandler} >Save</Button>
                        </Grid>
                        <Grid item md={3}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        savePlaylist: (newName) => dispatch(actions.savePlaylist(newName))
    }
}
export default connect(null, mapDispatchToProps)(AddPlaylist);