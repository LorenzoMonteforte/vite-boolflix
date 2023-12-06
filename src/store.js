import { reactive } from "vue";
import axios, { isCancel, AxiosError } from 'axios';
export const store = reactive({
    search: "",
    foundFilms: [],
    indexPageFilms: 1,
    showMoreFilm: false,
    foundTVseries: [],
    indexPageTVseries: 1,
    showMoreTVseries: false,
    notFound: "",
    genresFilms: [],
    genresTVseries: [],
    methods: {
        downloadAPIgenres: function () {
            axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=99d73ffb466f6133b596f43c0724d28c")
                .then(response => {
                    store.genresFilms = response.data.genres;
                });
            axios.get("https://api.themoviedb.org/3/genre/tv/list?api_key=99d73ffb466f6133b596f43c0724d28c")
                .then(response => {
                    store.genresTVseries = response.data.genres;
                });
        },
        downloadAPIfilms: function (daSvuotare) {
            if (daSvuotare == true) {
                store.foundFilms = [];
                store.indexPageFilms = 1;
            } else {
                store.indexPageFilms++;
            }
            let urlFilms = encodeURI("https://api.themoviedb.org/3/search/movie?api_key=99d73ffb466f6133b596f43c0724d28c&query=" + store.search + "&page=" + store.indexPageFilms);
            axios.get(urlFilms)
                .then(async response => {
                    for (let i = 0; i < response.data.results.length; i++) {
                        store.foundFilms.push({
                            title: response.data.results[i].title,
                            original_title: response.data.results[i].original_title,
                            original_language: response.data.results[i].original_language,
                            vote_average: response.data.results[i].vote_average,
                            srcCopertina: "https://image.tmdb.org/t/p/w342" + response.data.results[i].poster_path,
                            numberStar: Math.ceil(response.data.results[i].vote_average * 5 / 10),
                            overview: response.data.results[i].overview,
                            id: response.data.results[i].id,
                            actors: [],
                            genresID: response.data.results[i].genre_ids,
                            genresName: []
                        });
                        let urlActorsFilms = "https://api.themoviedb.org/3/movie/" + store.foundFilms[(store.foundFilms.length - 1)].id + "/credits?api_key=99d73ffb466f6133b596f43c0724d28c";
                        await axios.get(urlActorsFilms)
                            .then(response => {
                                let numberActor;
                                if (response.data.cast.length < 5) {
                                    numberActor = response.data.cast.length;
                                } else {
                                    numberActor = 5;
                                }
                                for (let index = 0; index < numberActor; index++) {
                                    store.foundFilms[(store.foundFilms.length - 1)].actors.push({
                                        name: response.data.cast[index].name
                                    });
                                }
                            })
                        for (let index = 0; index < store.genresFilms.length; index++) {
                            for (let iter = 0; iter < store.foundFilms[(store.foundFilms.length - 1)].genresID.length; iter++) {
                                if (store.genresFilms[index].id == store.foundFilms[(store.foundFilms.length - 1)].genresID[iter]) {
                                    store.foundFilms[(store.foundFilms.length - 1)].genresName.push(store.genresFilms[index].name);
                                }
                            }
                        }
                    }
                    if (store.foundFilms.length != 0) {
                        store.foundFilms[0].total_pages = response.data.total_pages;
                    }
                    store.showMoreFilm = true;
                    if (store.foundFilms.length == 0) {
                        store.showMoreFilm = false;
                    } else if (!(store.indexPageFilms < store.foundFilms[0].total_pages)) {
                        store.showMoreFilm = false;
                    }
                })
        },
        downloadAPITVseries: function (daSvuotare) {
            if (daSvuotare == true) {
                store.foundTVseries = [];
                store.indexPageTVseries = 1;
            } else {
                store.indexPageTVseries++;
            }
            let urlTVseries = encodeURI("https://api.themoviedb.org/3/search/tv?api_key=99d73ffb466f6133b596f43c0724d28c&query=" + store.search + "&page=" + store.indexPageTVseries);
            axios.get(urlTVseries)
                .then(async response => {
                    for (let i = 0; i < response.data.results.length; i++) {
                        store.foundTVseries.push({
                            title: response.data.results[i].name,
                            original_title: response.data.results[i].original_name,
                            original_language: response.data.results[i].original_language,
                            vote_average: response.data.results[i].vote_average,
                            srcCopertina: "https://image.tmdb.org/t/p/w342" + response.data.results[i].poster_path,
                            numberStar: Math.ceil(response.data.results[i].vote_average * 5 / 10),
                            overview: response.data.results[i].overview,
                            id: response.data.results[i].id,
                            actors: [],
                            genresID: response.data.results[i].genre_ids,
                            genresName: []
                        });
                        let urlActorsTVseries = "https://api.themoviedb.org/3/tv/" + store.foundTVseries[(store.foundTVseries.length - 1)].id + "/credits?api_key=99d73ffb466f6133b596f43c0724d28c";
                        await axios.get(urlActorsTVseries)
                            .then(response => {
                                let numberActor;
                                if (response.data.cast.length < 5) {
                                    numberActor = response.data.cast.length;
                                } else {
                                    numberActor = 5;
                                }
                                for (let index = 0; index < numberActor; index++) {
                                    store.foundTVseries[(store.foundTVseries.length - 1)].actors.push({
                                        name: response.data.cast[index].name
                                    });
                                }
                            })
                        for (let index = 0; index < store.genresTVseries.length; index++) {
                            for (let iter = 0; iter < store.foundTVseries[(store.foundTVseries.length - 1)].genresID.length; iter++) {
                                if (store.genresTVseries[index].id == store.foundTVseries[(store.foundTVseries.length - 1)].genresID[iter]) {
                                    store.foundTVseries[(store.foundTVseries.length - 1)].genresName.push(store.genresTVseries[index].name);
                                }
                            }
                        }
                    }
                    if (store.foundTVseries.length != 0) {
                        store.foundTVseries[0].total_pages = response.data.total_pages;
                    }
                    store.showMoreTVseries = true;
                    if (store.foundTVseries.length == 0) {
                        store.showMoreTVseries = false;
                    } else if (!(store.indexPageTVseries < store.foundTVseries[0].total_pages)) {
                        store.showMoreTVseries = false;
                    }
                })
        },
        downloadAPI: function () {
            store.notFound = "Spiacenti, nessun risultato corrispondente alla ricerca effettuata";
            store.methods.downloadAPIfilms(true);
            store.methods.downloadAPITVseries(true);
        }
    }
})