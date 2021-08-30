
import galleryCardTps from './templates/gallery-card-tps.hbs';

import './sass/main.scss';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    moreBtn: document.querySelector('#more'),
    gallery: document.querySelector('.gallery')   
}

refs.input.addEventListener('input', onFetchImages);
refs.moreBtn.addEventListener('click', onFetchImages);

let currentPage = 1;


function onFetchImages(e) {
e.preventDefault();
const value = e.target.value;
console.log(value);
currentPage++;
console.log(currentPage);

return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${currentPage}&per_page=12&key=23141272-55f7853bfecadbbcd9800c5ad`)
.then(response => response.json())
.then(result => {
    clearGallery();
    renderImages(result.hits);    
    // currentPage++;
    // console.log(currentPage);
})    
// .then(() => {
//     currentPage++;
//     console.log(currentPage)
// })
.catch((err) => console.log(error))
}


function renderImages(hits) {
    const markUpImages = galleryCardTps(hits);
    refs.gallery.insertAdjacentHTML('afterbegin', markUpImages);
}


function clearGallery() {
    refs.gallery.innerHTML = '';
}







