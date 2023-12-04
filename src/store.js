import { reactive } from "vue";
import axios, { isCancel, AxiosError } from 'axios';
export const store = reactive({
    methods: {
        downloadAPI: function () {
            axios.get("https://api.themoviedb.org/3/search/movie?api_key=99d73ffb466f6133b596f43c0724d28c&query=john+rambo")
                .then(response => {
                    console.log(response.data.results[0].overview);
                })
        }
    }
})