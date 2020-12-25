import React, { Component } from 'react';
import styles from './App.module.css';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import AppLogo from './../static/images/app_logo.png';
import SongList from './../components/SongList';
import axios from 'axios';
import Spinner from './../components/Spinner';

const Playlist = React.lazy(() => import('./Playlist'));

class App extends Component {

  state = {
    loading: true,
    currentPage: 1,
    perPage: 5,
    showAllSongs: true,
    allSongs: [],
    albumIdMap: {},
    searchQuery: "",
    singers: ["SPB", "Rahman", "Sonu Nigam", "Argit Singh", "Vijay Bhaskar", "Yesudas", "Ariana Grande", "Snoop Dogg"]
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent = (currentPage = this.state.currentPage, perPage = this.state.perPage) => {
    let albumIdNameMap = {};
    this.getAlbumIdNameMap()
      .then(albumIdMap => {
        albumIdNameMap = albumIdMap ;
        return this.getSongs(albumIdMap, currentPage, perPage);
      })
      .then(songs => {
        this.setState({albumIdMap: albumIdNameMap, allSongs: songs, loading: false});
      })
      .catch(err => console.error("Unable to fetch Album Details, error details", err));
  }

  getAlbumIdNameMap = () => {
    const albumUrl = `https://jsonplaceholder.typicode.com/albums`;
    let albumIdMaplocal = {};
    return axios
    .get(albumUrl)
    .then(result => {
      result.data.map(album => albumIdMaplocal[album.id] = album['title'])
      return albumIdMaplocal;
    })
    .catch(err => console.error("Error while fetching album, details", err));
  }

  getSongs = (albumIdMap, currentPage, perPage) => {
    const songsUrl = `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${perPage}`;
    let songs = [];
    return axios
      .get(songsUrl)
      .then(results => {
        results.data.forEach(song => {
          let random = Math.floor(Math.random() * this.state.singers.length);
          songs.push({ ...song, albumName: albumIdMap[song.albumId]  , singer: this.state.singers[random]});
        });
        return songs;
      })
      .then(fetchedSongs => fetchedSongs)
      .catch(err => console.error('Error while fetching songs, details:', err))
  }

  songNextPageHandler = () => {
    this.setState({currentPage: this.state.currentPage+1});
    this.loadContent();
  }

  songPrevPageHandler = () => {
    this.setState({currentPage: this.state.currentPage-1});
    this.loadContent();
  }

  searchHandler = (query) => {
    if (query){
      this.setState({searchQuery: query});
        this.getSongs(this.state.albumIdMap, 1, Number.MAX_SAFE_INTEGER )
          .then(songs => {
              let filteredSongs = songs.filter(song => query.split(" ").some(word => song.title.includes(word)));
              filteredSongs.splice(10);
              return filteredSongs;
          })
          .then(searchResults => {
            this.setState({loading: false, allSongs: searchResults})
          })
          .catch(err => console.error(err));
    }else{
      this.setState({searchQuery: ""});
      this.loadContent();
    }
  }

  render() {
    let content = null;
    if (this.state.loading) content = <Spinner />;
    if (this.state.allSongs.length > 0 & this.state.showAllSongs) content = <SongList songs={this.state.allSongs} /> ;
    if (!this.state.showAllSongs){
      content = <Playlist data={this.state.allSongs} />
    }
    let prevBtn = null;
    if(this.state.currentPage > 1){
      prevBtn = <Button color="primary" variant="contained" onClick={this.songPrevPageHandler} >Previous </Button>
    }
    return (
      <Grid container direction='column' alignItems='center' >

        {/* header region containing logo and app header */}
        <Grid container item xs={12} lg={12} id={styles.AppHeader} justify="center" alignItems="center" >
          <Grid justify="center" container item lg={2}></Grid>
          <Grid justify="flex-start" container item xs={12} lg={3}>
            <img id={styles.AppLogo} src={AppLogo} />
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
              <Button color="primary" variant="contained" >All Songs </Button>
              <Button color="secondary" variant="contained" >Playlist </Button>
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>

          {/* search field */}
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
                value={this.state.searchQuery}
                onChange={event => this.searchHandler(event.target.value)}
              />
            </Grid>
            <Grid item md={3}></Grid>
          </Grid>

          <Grid item container xs={12}>
            <Grid item md={3}></Grid>
            <Grid item md={6}>
              {content}
            </Grid>
            <Grid item md={3}></Grid>
          </Grid>

          {/* pagination buttons */}
          <Grid item container xs={12}>
            <Grid item md={4}></Grid>
            <Grid container item xs={12} md={4} justify="center" className={styles.BtnGroup}>
              {prevBtn}
              {
                this.state.allSongs && this.state.allSongs.length && !this.state.searchQuery > 0 
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

export default App;
