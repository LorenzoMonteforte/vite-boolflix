import { reactive } from "vue";
import axios, { isCancel, AxiosError } from 'axios';
export const store = reactive({
    search: "",
    search2: "",
    notFound: "",
    title: "",
    api: ["movie", "tv"],
    genres: [[], []],
    found: [[], []],
    indexPage: [1, 1],
    whichFilter: ["", ""],
    genreSelected: ["", ""],
    showMore: [false, false],
    methods: {
        downloadAPIgenres: function () {
            let url;
            for (let i = 0; i < 2; i++) {
                url = "https://api.themoviedb.org/3/genre/" + store.api[i] + "/list?api_key=99d73ffb466f6133b596f43c0724d28c";
                axios.get(url)
                    .then(response => {
                        store.genres[i] = response.data.genres;
                    })
            }
        },
        filterByPopularity: function (i) {
            let url = "https://api.themoviedb.org/3/" + store.api[i] + "/popular?api_key=99d73ffb466f6133b596f43c0724d28c" + "&page=" + store.indexPage[i];
            store.whichFilter[i] = "byPopularity";
            store.title = "PIÙ POPOLARI";
            return url;
        },
        downloadAPI: function (i, daSvuotare, whichFilter) {
            if (daSvuotare == true) {
                store.found[i] = [];
                store.indexPage[i] = 1;
                store.search2 = store.search;
            } else {
                store.indexPage[i]++;
            }
            if (i == 1 || (i == 0 && whichFilter == "byGenre")) {
                store.search = "";
            }
            let url;
            if (whichFilter == "byPopularity") {
                url = this.filterByPopularity(i);
            } else if (whichFilter == "byName") {
                if (store.search2 != "") {
                    url = encodeURI("https://api.themoviedb.org/3/search/" + store.api[i] + "?api_key=99d73ffb466f6133b596f43c0724d28c&query=" + store.search2 + "&page=" + store.indexPage[i]);
                    store.whichFilter[i] = "byName";
                    store.title = "CORRISPONDENTI ALLA RICERCA \"" + store.search2.toUpperCase() + "\"";
                } else {
                    url = this.filterByPopularity(i);
                }
                for (let index = 0; index < 2; index++) {
                    store.genreSelected[index] = "";
                }
            } else if (whichFilter == "byGenre") {
                if (store.genreSelected[i] != "") {
                    url = "https://api.themoviedb.org/3/discover/" + store.api[i] + "?api_key=99d73ffb466f6133b596f43c0724d28c&with_genres=" + store.genreSelected[i] + "&page=" + store.indexPage[i];
                    store.whichFilter[i] = "byGenre";
                    for (let index = 0; index < store.genres[i].length; index++) {
                        if (store.genreSelected[i] == store.genres[i][index].id) {
                            store.title = store.genres[i][index].name.toUpperCase();
                            break;
                        }
                    }
                    let y;
                    if (i == 0 ? y = 2 : y = 1) {
                        store.found[(y - 1)] = [];
                        store.showMore[(y - 1)] = false;
                        store.genreSelected[(y - 1)] = "";
                    }
                } else {
                    url = this.filterByPopularity(i);
                }
            }
            axios.get(url)
                .then(async response => {
                    for (let index = 0; index < response.data.results.length; index++) {
                        store.found[i].push({
                            original_language: response.data.results[index].original_language,
                            vote_average: response.data.results[index].vote_average,
                            srcCopertina: "https://image.tmdb.org/t/p/w342" + response.data.results[index].poster_path,
                            numberStar: Math.ceil(response.data.results[index].vote_average * 5 / 10),
                            overview: response.data.results[index].overview,
                            id: response.data.results[index].id,
                            actors: [],
                            genresID: response.data.results[index].genre_ids,
                            genresName: []
                        });
                        if (i == 0) {
                            store.found[i][(store.found[i].length - 1)].title = response.data.results[index].title;
                            store.found[i][(store.found[i].length - 1)].original_title = response.data.results[index].original_title;
                        } else if (i == 1) {
                            store.found[i][(store.found[i].length - 1)].title = response.data.results[index].name;
                            store.found[i][(store.found[i].length - 1)].original_title = response.data.results[index].original_name;
                        }
                        let urlActors = "https://api.themoviedb.org/3/" + store.api[i] + "/" + store.found[i][(store.found[i].length - 1)].id + "/credits?api_key=99d73ffb466f6133b596f43c0724d28c";
                        await axios.get(urlActors)
                            .then(response => {
                                let numberActor;
                                if (response.data.cast.length < 5) {
                                    numberActor = response.data.cast.length;
                                } else {
                                    numberActor = 5;
                                }
                                for (let iter = 0; iter < numberActor; iter++) {
                                    store.found[i][(store.found[i].length - 1)].actors.push({
                                        name: response.data.cast[iter].name
                                    });
                                }
                            })
                        for (let iter = 0; iter < store.genres[i].length; iter++) {
                            for (let iterator = 0; iterator < store.found[i][(store.found[i].length - 1)].genresID.length; iterator++) {
                                if (store.genres[i][iter].id == store.found[i][(store.found[i].length - 1)].genresID[iterator]) {
                                    store.found[i][(store.found[i].length - 1)].genresName.push(store.genres[i][iter].name);
                                }
                            }
                        }
                    }
                    if (store.found[i].length != 0) {
                        store.found[i][0].total_pages = response.data.total_pages;
                    }
                    store.showMore[i] = true;
                    if (store.found[i].length == 0) {
                        store.showMore[i] = false;
                    } else if (!(store.indexPage[i] < store.found[i][0].total_pages)) {
                        store.showMore[i] = false;
                    }
                    if (store.found[0].length == 0 && store.found[1].length == 0) {
                        store.notFound = "Spiacenti, nessun risultato corrispondente alla ricerca effettuata";
                    }
                })
        }
    }
})