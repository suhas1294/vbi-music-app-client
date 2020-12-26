import React, { Component } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import styles from './SongCard.module.css';
import { connect } from 'react-redux';
import * as actions from './../store/actions/index';

class SongCard extends Component {

    removeBtnHandler = () => {
        let data = {songId: this.props.songId, pid: this.props.currentPlaylistShown};
        this.props.removeSongFromPlaylist(data);
    }

    addBtnHandler = (event) => {
        event.target.textContent = "Added";
        let data = {songId: this.props.songId, pid: this.props.currentPlaylistShown};
        this.props.addSongToPlaylist(data);
    }

    render() {
        return (
            <Grid xs={12} item container justify="space-between" alignItems='center' id={styles.SongCard} >
                <Grid xs={2} container item>
                    {/* <img src={this.props.imgLarge} alt="song_img" style={{height: '7rem', width: 'auto'}} />
                    <img src={this.props.imgThumb} alt="song_img" style={{height: '7rem', width: 'auto'}} /> */}
                    <img src='https://picsum.photos/200' alt="song_img" style={{height: '7rem', width: 'auto'}} />
                </Grid>
                <Grid container item xs={7} direction="column">
                    <p className={styles.SongTitle}>{this.props.title}</p>
                    <p className={styles.Singers}>singers: {this.props.singers}</p>
                    <Typography
                        variant='subtitle1'>
                        album: {this.props.albumName}
                    </Typography>
                </Grid>
                <Grid item container xs={3} direction="column" alignItems='center'>
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
                                onClick={this.removeBtnHandler} 
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
                                //onClick={this.props.addSongToPlaylist.bind(this, data)} 
                                onClick={event => this.addBtnHandler(event)} 
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