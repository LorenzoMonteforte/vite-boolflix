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
    methods: {
        downloadAPIfilms: function (daSvuotare) {
            if (daSvuotare == true) {
                store.foundFilms = [];
                store.indexPageFilms = 1;
            } else {
                store.indexPageFilms++;
            }
            let urlFilms = encodeURI("https://api.themoviedb.org/3/search/movie?api_key=99d73ffb466f6133b596f43c0724d28c&query=" + store.search + "&page=" + store.indexPageFilms);
            axios.get(urlFilms)
                .then(response => {
                    for (let i = 0; i < response.data.results.length; i++) {
                        store.foundFilms.push({
                            title: response.data.results[i].title,
                            original_title: response.data.results[i].original_title,
                            original_language: response.data.results[i].original_language,
                            vote_average: response.data.results[i].vote_average,
                            srcCopertina: "https://image.tmdb.org/t/p/w342" + response.data.results[i].poster_path,
                            numberStar: Math.ceil(response.data.results[i].vote_average * 5 / 10),
                            overview: response.data.results[i].overview
                        })
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
            let urlTVseries = encodeURI("https://api.themoviedb.org/3/search/tv?api_key=99d73ffb466f6133b596f43c0724d28c&query=" + store.search);
            axios.get(urlTVseries)
                .then(response => {
                    for (let i = 0; i < response.data.results.length; i++) {
                        store.foundTVseries.push({
                            title: response.data.results[i].name,
                            original_title: response.data.results[i].original_name,
                            original_language: response.data.results[i].original_language,
                            vote_average: response.data.results[i].vote_average,
                            srcCopertina: "https://image.tmdb.org/t/p/w342" + response.data.results[i].poster_path,
                            numberStar: Math.ceil(response.data.results[i].vote_average * 5 / 10),
                            overview: response.data.results[i].overview
                        })
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