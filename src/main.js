import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import { perPage } from './js/pixabay-api';

const form = document.querySelector('.search-form');
const inputSearch = document.querySelector('[name="search"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-images');

form.addEventListener('input', savetoLocalStorage);
form.addEventListener('submit', searchImages);
loadMoreBtn.addEventListener('click', loadeMoreImages);

hidenMoreLoaderBt();

//localStorage
const localKey = 'input-name-image';
const localData = JSON.parse(localStorage.getItem(localKey));

const formData = {
    search: '',
};

if (localData) {
    inputSearch.value = localData.search;
    formData.search = localData.search;
};

function savetoLocalStorage(e) {
    formData.search = e.target.value.trim();

    localStorage.setItem(localKey, JSON.stringify(formData));
};

//Search images
let galleryData = {
    totalHits: 0,
};
let page = 1;

async function searchImages (e) {
    e.preventDefault();
        
    gallery.innerHTML = '';
    loaderShow();
    hidenMoreLoaderBt();

    const input = e.target.elements.search.value.trim();

    if (!input) {
        showMessage(IZI_MESSEGES.info.type, IZI_MESSEGES.info.message);

        gallery.innerHTML = '';
        loaderHiden();

        return;
    };

    try {
        page = 1;
        const response = await getImages(formData.search, page);

        if (response.hits.length === 0) {
            showMessage(IZI_MESSEGES.warningNoSearchImages.type, IZI_MESSEGES.warningNoSearchImages.message);

            gallery.innerHTML = '';
            loaderHiden();
            hidenMoreLoaderBt();
            
            return;
        }

        renderGallery(response.hits, gallery);
        galleryData.totalHits = response.totalHits;

        if (response.hits.length < perPage) {
            hidenMoreLoaderBt();
        } else {
            showMoreLoaderBtn();
        };

        loaderHiden();

    } catch (error) {
        console.error('Error:', error.message);

        loaderHiden();
        hidenMoreLoaderBt();

        return;
    };
};


//Loade new images button
async function loadeMoreImages () {
    page += 1;
    loaderShow();

    try {
        const response = await getImages(formData.search, page);
        const imagesLoaded = (page - 1) * perPage + response.hits.length;

        if (imagesLoaded >= galleryData.totalHits) {
            renderGallery(response.hits, gallery);

            showMessage(IZI_MESSEGES.warningNoImagesBtn.type, IZI_MESSEGES.warningNoImagesBtn.message);

            loaderHiden();
            hidenMoreLoaderBt();
            scrollNewImg();

        } else {
            renderGallery(response.hits, gallery);

            showMoreLoaderBtn();
            loaderHiden();

            scrollNewImg();
        }
    } catch (error) {
        showMessage(IZI_MESSEGES.error.type, IZI_MESSEGES.error.message);

        loaderHiden();
        hidenMoreLoaderBt();
    } finally {
        loaderHiden();
    };
};


// iziToast message
const IZI_MESSEGES = {
    success: {
        type: 'success',
        message: 'Request completed successfully'
    },
    info: {
        type: 'info',
        message: 'The field must be filled',
    },
    warningNoSearchImages: {
        type: 'warning',
        message: 'Sorry, there are no images matching your search query. Please try again!',
    },
    warningNoImagesBtn: {
        type: 'warning',
        message: "We're sorry, but you've reached the end of search results."
    },
    error: {
        type: 'error',
        message: 'Sorry, but something went wrong. Please try again later!',
    },
};


function showMessage(type, message) {
    const bgColor = {
        success: 'rgb(0, 255, 128, 0.7)',
        info: 'rgb(76, 153, 255, 0.7)',
        warning: 'rgb(255, 193, 7, 0.7)',
        error: 'rgb(255, 76, 76, 0.7)',
    };

    iziToast.show({
        message,
        messageColor: 'white',
        position: "topRight",
        backgroundColor: bgColor[type],
    });
};

//show and hiden loader or Load more btn 
function loaderShow() {
    let loader = document.querySelector('.loader');
    if(!loader){
        const newLoader = document.createElement('div');
        newLoader.className = 'loader';
        gallery.insertAdjacentElement('beforeend', newLoader);
    };

    return;
};

function loaderHiden() {
    const loader = document.querySelector('.loader');
    
    if (loader) {
        loader.remove();
    };

    return;
};

function showMoreLoaderBtn() {
    loadMoreBtn.style.display = 'block';
};

function hidenMoreLoaderBt() {
    loadMoreBtn.style.display = 'none';
};

function scrollNewImg() {
    const card = document.querySelector('.list-item')
    const imgRect = card.getBoundingClientRect();  

    window.scrollBy({
        top: imgRect.height * 2,
        behavior: 'smooth'
    });
};