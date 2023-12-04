import { reactive } from "vue";
import axios, { isCancel, AxiosError } from 'axios';
export const store = reactive({
    search: "",
    foundFilms: [],
    methods: {
        downloadAPI: function () {
            store.foundFilms = [];
            let url = encodeURI("https://api.themoviedb.org/3/search/movie?api_key=99d73ffb466f6133b596f43c0724d28c&query=" + store.search);
            axios.get(url)
                .then(response => {
                    for (let i = 0; i < response.data.results.length; i++) {
                        store.foundFilms.push({
                            title: response.data.results[i].title,
                            original_title: response.data.results[i].original_title,
                            original_language: response.data.results[i].original_language,
                            vote_average: response.data.results[i].vote_average
                        })
                    }
                })
        }
    }
})