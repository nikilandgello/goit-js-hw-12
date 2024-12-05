import axios from 'axios';

export let perPage = 15;

const KEY_API = '47345355-bb5adb35ee772e90f4db69f75';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(qValue, page) {
    const params = new URLSearchParams({
        key: KEY_API,
        q: qValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
    });

    const response = await axios.get(`?${params}`);
    
    return response.data;
}