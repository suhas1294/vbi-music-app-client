import React from 'react';
import PlaylistCard from './PlaylistCard';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

const PlaylistIndex = (props) => {
    return (
        <React.Fragment>
            <Grid item md={3}></Grid>
            <Grid container item xs={12} md={6} direction='column' style={{ border: '2px solid red' }}>
                {
                    props.playlistArr.map(playlist => {
                        return (
                            <PlaylistCard
                                pid={playlist.id}
                                key={playlist.id}
                                name={playlist.playlistName}
                                createdAt={playlist.createdAt}
                                showDetails={props.showDetail} />
                        )
                    })
                }
            </Grid>
            <Grid item md={3}></Grid>
        </React.Fragment>



    )
}

export default PlaylistIndex;