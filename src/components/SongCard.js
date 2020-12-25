import React, { Component } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import styles from './SongCard.module.css';
import { connect } from 'react-redux';
import * as actions from './../store/actions/index';

class SongCard extends Component {
    render() {
        let data = {songId: this.props.songId, pid: this.props.currentPlaylistShown}
        return (
            <Grid container justify="space-between" alignItems='center' id={styles.SongCard} >
                <Grid container item xs={9} direction="column">
                    <Typography
                        variant='subtitle1'>
                        Title: {this.props.title}
                    </Typography>
                    <Typography
                        variant='subtitle1'>
                        singer: {this.props.singers}
                    </Typography>
                    <Typography
                        variant='subtitle1'>
                        album: {this.props.albumName}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Grid item >
                        <Typography
                            variant='subtitle1'>
                            {this.props.duration}
                        </Typography>
                    </Grid>
                    {
                        this.props.playlistMode ?
                            <Button 
                                color="primary"
                                onClick={this.props.removeSongFromPlaylist.bind(this, data)} 
                                variant="contained" >
                            Remove
                            </Button>
                            :
                            null
                    }
                    {
                        this.props.addBtnRequired ?
                            <Button 
                                color="primary"
                                onClick={this.props.addSongToPlaylist.bind(this, data)} 
                                variant="contained" >
                            Add Song
                            </Button>
                            :
                            null
                    }
                </Grid>
            </Grid>
        )
    }

}

const mapStateToProps = state => {
    return {
        currentPlaylistShown: state.currentPlaylistIdShown,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeSongFromPlaylist: (details) => dispatch(actions.removeFromPlaylist(details)),
        addSongToPlaylist: (details) => dispatch(actions.addSongToPlaylist(details))
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(SongCard);