import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styles from './Playlist.module.css';

const PlaylistCard = (props) => {
    return (
        <Grid item xs={12} container id={styles.PlaylistCard} justify="center">
            <Grid item xs={9}>
                <p className={styles.PlaylistTitle} onClick={() => props.showDetails(props.pid)}>
                    {props.name}
                </p>
            </Grid>
            <Grid item xs={3}>
                <Typography
                    variant='subtitle1'>
                    {props.createdAt}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default PlaylistCard;