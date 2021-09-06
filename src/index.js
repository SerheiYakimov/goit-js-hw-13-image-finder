
import ImageApiService from './js/apiService';
import galleryCardTps from './templates/gallery-card-tps.hbs';
import refs from './js/refs.js';
import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './sass/main.scss';



refs.form.addEventListener('submit', onFetchImages);
refs.moreBtn.addEventListener('click', onLoadMore);
refs.upBtn.addEventListener('click', onScrollUp);


const imageApiService = new ImageApiService();
const hiddenElement = document.getElementById('more');



function onFetchImages(e) {
    e.preventDefault();
    clearGallery();
        
    imageApiService.value = e.currentTarget.elements.query.value;
    

    if (imageApiService.value === '' || imageApiService.value.length < 3) {
        alert({
            title: 'Alert!',
            text: 'Enter more letter for search!'
        });
        return;
    }
    else {
        imageApiService.resetPage();
        imageApiService.fetchGallery().then(totalHits).then(renderImages).then(showScroll);
        
        refs.gallery.addEventListener('click', onShowFullImage);
        
        refs.moreBtn.classList.replace('btn-hidden', 'btn-open');
    }
    
    
}

function buttonHide() {
    refs.moreBtn.classList.replace('btn-open', 'btn-hidden');
    refs.upBtn.classList.replace('btn-open', 'btn-hidden');
}


function renderImages(result) {
    const markUpImages = galleryCardTps(result.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markUpImages);
    
}

function clearGallery() {
    refs.gallery.innerHTML = '';
    buttonHide();
    
}


function onLoadMore() {
    imageApiService.fetchGallery().then(renderImages).then(showScroll);
    refs.upBtn.classList.replace('btn-hidden', 'btn-open');
          
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

function onShowFullImage(e) {
    e.preventDefault();    
    if (e.target.nodeName !== 'IMG') {
        return
    }
    const src = e.target.dataset.source;
    const instance = basicLightbox.create(`<img src=${src} width="1280" height="600" />`);
    instance.show();
}


function totalHits(result) {
    if (result.total === 0) {
        clearGallery();
        error({
                title: 'Nothing is found.',
                    text: 'Please check if the input is correct'
          });
       
        return result;
       
        }
        if (result.total <= 12) {
            clearGallery();
            alert ({
                title: 'Success',
                text: `Found ${result.total} matches`
            })
            return result;
       
        }
        if (result.total > 12) {
            refs.upBtn.classList.replace('btn-hidden', 'btn-open');
            alert ({
                title: 'Success',
                text: `Found ${result.total} matches`
            })
                return result; 
        }        
        
}










