
import galleryCardTps from './templates/gallery-card-tps.hbs';


import './sass/main.scss';




const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    more: document.querySelector('#more'),
    gallery: document.querySelector('.gallery')
   
}

refs.input.addEventListener('input', onFetchImages);
refs.more.addEventListener('click', onFetchImages)

function onFetchImages(e) {
e.preventDefault();
const value = refs.input.value;
console.log(value);

return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&key=23141272-55f7853bfecadbbcd9800c5ad`)
.then(response => response.json())
// .then(renderImages)
.then(result => renderImages(result.hits))
}


function renderImages() {
    const markUpImages = galleryCardTps()
    refs.gallery.insertAdjacentHTML('afterend', markUpImages);
}

let currentPage = 1;






// fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${currentPage}&per_page=12&key=23141272-55f7853bfecadbbcd9800c5ad`)
// .then(response => response.json())
// .then(result => console.log(result))
// .then(() => currentPage++)
// .catch((err) => console.log(error))
