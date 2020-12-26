import React, { Component } from 'react';
import styles from './App.module.css';
import { Grid, Typography, Button } from '@material-ui/core';
import AppLogo from './../static/images/app_logo.png';
import Spinner from './../components/Spinner';
import Playlist from './Playlist';
import Cockpit from './Cockpit';
import { getSongDetailsWithAlbum } from './../utils/DataHelper';
import { connect } from 'react-redux';
import * as actions from './../store/actions/index';

// const Playlist = React.lazy(() => import('./Playlist'));

class App extends Component {

  state = {
    loading: true,
    currentPage: 1,
    perPage: 5,
    showAllSongs: true,
    allSongs: [],
    searchQuery: ""
  }

  componentDidMount() {
    getSongDetailsWithAlbum()
      .then(songs => this.setState({ loading: false, allSongs: songs }));
  }

  songNextPageHandler = () => {
    getSongDetailsWithAlbum(this.state.currentPage + 1, 5)
      .then(songs => this.setState({ loading: false, allSongs: songs, currentPage: this.state.currentPage + 1 }));
  }

  songPrevPageHandler = () => {
    getSongDetailsWithAlbum(this.state.currentPage - 1, 5)
      .then(songs => this.setState({ loading: false, allSongs: songs, currentPage: this.state.currentPage - 1 }));
  }

  searchHandler = (query) => {
    if (query) {
      this.setState({ searchQuery: query });
      getSongDetailsWithAlbum(1, Number.MAX_SAFE_INTEGER)
      .then(songs => {
        let filteredSongs = songs.filter(song => query.split(" ").some(word => song.title.includes(word)));
        filteredSongs.splice(10);
        return filteredSongs;
      })
      .then(searchResults => {
        this.setState({ loading: false, allSongs: searchResults })
      })
      .catch(err => console.error(err));
    } else {
      this.setState({ searchQuery: "" });
      getSongDetailsWithAlbum()
        .then(songs => this.setState({ loading: false, allSongs: songs }));
    }
  }

  playlistClickHandler = () => {
    this.props.clearCurrentShown();
    this.setState({ showAllSongs: false })
  }

  songsClickHandler = () => {
    this.setState({ showAllSongs: true })
  }

  render() {
    let content = null;
    if (this.state.loading) content = <Spinner />;
    if (this.state.allSongs.length > 0 & this.state.showAllSongs) {
      content = <Cockpit
        searchQuery={this.state.searchQuery}
        onSearch={this.searchHandler}
        songs={this.state.allSongs}
        playlistMode={false}
        addBtnRequired={false} />
    }
    if (!this.state.showAllSongs) {
      content = <Playlist data={this.state.allSongs} playlistIndex />
    }

    let prevBtn = null;
    if (this.state.currentPage > 1) {
      prevBtn = <Button color="primary" variant="contained" onClick={this.songPrevPageHandler} >Previous </Button>
    }
    return (
      <Grid container direction='column' alignItems='center' className={styles.AppContainer}>

        {/* header region containing logo and app header */}
        <Grid container item xs={12} lg={12} id={styles.AppHeader} justify="center" alignItems="center" >
          <Grid justify="center" container item lg={2}></Grid>
          <Grid justify="flex-start" container item xs={12} lg={3}>
            <img id={styles.AppLogo} src={AppLogo} alt="app-logo"/>
          </Grid>
          <Grid justify="center" container item xs={12} lg={5}>
            <Typography id={styles.AppName} variant='h2'>VBI Music</Typography>
          </Grid>
          <Grid justify="center" container item lg={2}></Grid>
        </Grid>

        {/* main region containing toggle button and corresponding area */}
        <Grid container item direction='column' xs={12} lg={12} alignItems='center' id={styles.ContentContainer} >

          {/* button row */}
          <Grid item container xs={12}>
            <Grid item md={4}></Grid>
            <Grid container item xs={12} md={4} justify="center" className={styles.BtnGroup}>
              <Button color={this.state.showAllSongs ? 'primary' : 'default'} onClick={this.songsClickHandler} variant="contained" >All Songs </Button>
              <Button color={this.state.showAllSongs ? 'default' : 'primary'} onClick={this.playlistClickHandler} variant="contained" >Playlist </Button>
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>

          {content}

          {/* pagination buttons */}
          <Grid item container xs={12}>
            <Grid item md={4}></Grid>
            <Grid container item xs={12} md={4} justify="center" className={styles.BtnGroup}>
              {prevBtn}
              {
                this.state.allSongs && this.state.showAllSongs && this.state.allSongs.length && !this.state.searchQuery > 0
                  ?
                  <Button onClick={this.songNextPageHandler} color="secondary" variant="contained" >Next </Button>
                  :
                  null
              }
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      clearCurrentShown: (newName) => dispatch(actions.clearCurrentShownPlaylist(newName))
  }
}
export default connect(null, mapDispatchToProps)(App);