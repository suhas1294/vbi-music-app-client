import axios from 'axios';

const albumUrl = `https://jsonplaceholder.typicode.com/albums`;
const defaultPerPage = 5;
const defaultCurrentPage = 1;
const singers = ["SPB", "Rahman", "Sonu Nigam", "Argit Singh", "Vijay Bhaskar", "Yesudas", "Ariana Grande", "Snoop Dogg"];

const getRandomElementFromArray = (dataArray) => {
    let random = Math.floor(Math.random() * dataArray.length);
    return dataArray[random];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getRandomSingers = () => {
    return [getRandomElementFromArray(singers), getRandomElementFromArray(singers)];
}

const getSongDetailsWithAlbum = async (currentPage = defaultCurrentPage, perPage = defaultPerPage) => {
    const albumIdNameMap = await getAlbumIdName();
    const songsUrl = `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${perPage}`;
    let songs = [];
    return axios
        .get(songsUrl)
        .then(results => {
            results.data.forEach(song => {

                songs.push({
                    duration: `${getRandomInt(1, 15)}:${getRandomInt(10, 60)}`,
                    ...song,
                    albumName: albumIdNameMap[song.albumId],
                    singers: getRandomSingers()
                });
            });
            return songs;
        })
        .then(fetchedSongs => fetchedSongs)
        .catch(err => console.error('Error while fetching songs, details:', err))
}

const getSongsBySearch = async(query) => {
    return getSongDetailsWithAlbum(defaultCurrentPage, 500)
    .then(songs => {
        let filteredSongs = songs.filter(song => query.split(" ").some(word => song.title.includes(word)));
        filteredSongs.splice(10);
        return filteredSongs;
      })
      .catch(err => console.error(err));
}

const getAlbumIdName = async () => {
    let albumIdMaplocal = {};
    return axios
        .get(albumUrl)
        .then(result => {
            result.data.map(album => albumIdMaplocal[album.id] = album['title'])
            return albumIdMaplocal;
        })
        .catch(err => console.error("Error while fetching album, details", err));
}

export const shuffle = (arra1) => {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

export { getSongDetailsWithAlbum, getAlbumIdName, getRandomSingers, getSongsBySearch };