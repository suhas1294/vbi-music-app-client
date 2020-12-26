import React, { Component } from 'react';
import styles from './App.module.css';
import { Grid, TextField } from '@material-ui/core';
import SongList from '../components/SongList';


class Cockpit extends Component {
    render() {
        return (
            <React.Fragment>
                <Grid item container xs={12}>
                    <Grid item md={3}></Grid>
                    <Grid container item xs={12} md={6} justify="center" id={styles.SongSearch}>
                        <TextField
                            placeholder="Search your favorite song here..."
                            name="songSearch"
                            type="search"
                            fullWidth
                            color="primary"
                            variant='outlined'
                            value={this.props.searchQuery}
                            onChange={event => this.props.onSearch(event.target.value)}
                        />
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>

                <Grid item container xs={12} >
                    <Grid item md={3}></Grid>
                    <Grid item xs={12} md={6} style={{height: '30rem', overflowY: 'scroll'}}>
                        <SongList 
                            songs={this.props.songs} 
                            playlistMode={this.props.playlistMode}
                            addBtnRequired={this.props.addBtnRequired}/>
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Cockpit;