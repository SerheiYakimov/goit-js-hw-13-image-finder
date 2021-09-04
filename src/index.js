
import ImageApiService from './js/apiService';
import galleryCardTps from './templates/gallery-card-tps.hbs';
import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import './sass/main.scss';



const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    moreBtn: document.querySelector('#more'),
    gallery: document.querySelector('.gallery'),
    upBtn: document.querySelector('#up')      
}

refs.form.addEventListener('submit', onFetchImages);
refs.moreBtn.addEventListener('click', onLoadMore);
refs.upBtn.addEventListener('click', onScrollUp);



const imageApiService = new ImageApiService();
const hiddenElement = document.getElementById('more');




function onFetchImages(e) {
    e.preventDefault();
    clearGallery();
    
    
    imageApiService.value = e.currentTarget.elements.query.value;
    console.log(imageApiService.value);

    if (imageApiService.value === '' || imageApiService.value.length < 3) {
        alert({
            text: 'Enter more letter for search!'
        });
    }
    // if (imageApiService.value.length < 3 || imageApiService.value.length > 1) {
    //     alert({
    //         text: 'Enter more letter for search!'
    //     });
    // }
    else {
    imageApiService.resetPage();
    imageApiService.fetchGallery().then(renderImages);
   
    refs.moreBtn.classList.replace('btn-hidden', 'btn-open');
    refs.upBtn.classList.replace('btn-hidden', 'btn-open');
    }
    
    
}


function renderImages(hits) {
    const markUpImages = galleryCardTps(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markUpImages);
    showScroll();
    
    
}


function clearGallery() {
    refs.gallery.innerHTML = '';
    refs.moreBtn.classList.replace('btn-open', 'btn-hidden');
}

function onLoadMore() {
    imageApiService.fetchGallery().then(renderImages);
   
   
    
}


function showScroll() {
    hiddenElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
}

function onScrollUp() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    refs.upBtn.classList.replace('btn-open', 'btn-hidden');
}











