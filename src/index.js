
import ImageApiService from './js/apiService';
import galleryCardTps from './templates/gallery-card-tps.hbs';
import './sass/main.scss';



const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    moreBtn: document.querySelector('#more'),
    gallery: document.querySelector('.gallery')   
}

refs.form.addEventListener('submit', onFetchImages);
refs.moreBtn.addEventListener('click', onLoadMore);


const imageApiService = new ImageApiService();


function onFetchImages(e) {
    e.preventDefault();
    clearGallery();
   
    
    imageApiService.value = e.currentTarget.elements.query.value;
    console.log(imageApiService.value);
    imageApiService.resetPage();
    imageApiService.fetchGallery().then(renderImages);
    refs.moreBtn.classList.replace('btn-hidden', 'btn-open');
}


function renderImages(hits) {
    const markUpImages = galleryCardTps(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markUpImages);
}


function clearGallery() {
    refs.gallery.innerHTML = '';
}

function onLoadMore() {
    imageApiService.fetchGallery().then(renderImages);
}

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });








