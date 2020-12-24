import React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import styles from './SongCard.module.css';

const SongCard = (props) => {
    return (
        <Grid container justify="space-between" alignItems='center' id={styles.SongCard} >
            <Grid container item xs={9} direction="column">
                <Typography
                    // className={styles.MenuItem}
                    // data-goto='dept'
                    // onClick={(event) => this.companyPageMenuHandler(event.target)}
                    variant='subtitle1'>
                    Title: {props.title}
                </Typography>
                <Typography
                    // className={styles.MenuItem}
                    // data-goto='dept'
                    // onClick={(event) => this.companyPageMenuHandler(event.target)}
                    variant='subtitle1'>
                    singer: {props.singer}
                </Typography>
                <Typography
                    // className={styles.MenuItem}
                    // data-goto='dept'
                    // onClick={(event) => this.companyPageMenuHandler(event.target)}
                    variant='subtitle1'>
                    album: {props.albumName}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Grid item style={{textAlign: 'center'}}>
                    <Typography
                        // className={styles.MenuItem}
                        // data-goto='dept'
                        // onClick={(event) => this.companyPageMenuHandler(event.target)}
                        variant='subtitle1'>
                        12:45
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SongCard;