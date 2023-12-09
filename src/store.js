import { reactive } from "vue";
import axios, { isCancel, AxiosError } from 'axios';
export const store = reactive({
    search: "",
    search2: "",
    notFound: "",

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
        downloadAPI: function (i, daSvuotare, whichFilter) {
            if (daSvuotare == true) {
                store.found[i] = [];
                store.indexPage[i] = 1;
                store.search2 = store.search;
            } else {
                store.indexPage[i]++;
            }
            let url;
            if (whichFilter == "byName") {
                url = encodeURI("https://api.themoviedb.org/3/search/" + store.api[i] + "?api_key=99d73ffb466f6133b596f43c0724d28c&query=" + store.search2 + "&page=" + store.indexPage[i]);
                store.whichFilter[i] = "byName";
            } else if (whichFilter == "byGenre") {
                url = "https://api.themoviedb.org/3/discover/" + store.api[i] + "?api_key=99d73ffb466f6133b596f43c0724d28c&with_genres=" + store.genreSelected[i] + "&page=" + store.indexPage[i];
                store.whichFilter[i] = "byGenre";
                let y;
                if (i == 0 ? y = 2 : y = 1) {
                    store.found[(y - 1)] = [];
                    store.showMore[(y - 1)] = false;
                    store.genreSelected[(y - 1)] = "";
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
                })
        },
        invokeDownloadAPI: function () {
            store.notFound = "Spiacenti, nessun risultato corrispondente alla ricerca effettuata";
            store.methods.downloadAPI(0, true, "byName");
            store.methods.downloadAPI(1, true, "byName");
        }
    }
})