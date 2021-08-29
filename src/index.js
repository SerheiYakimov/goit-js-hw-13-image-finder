
import galleryCardTps from './templates/gallery-card-tps.hbs';


import './sass/main.scss';




const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input')
   
}

refs.input.addEventListener('input', onFetchImages);

function onFetchImages(e) {
e.preventDefault();
const value = refs.input.value;
console.log(value);
}



// refs.form.insertAdjacentHTML('afterbegin', galleryCardTps);


// fetch('https://pixabay.com/api/?image_type=photo&orientation=horizontal&key=23141272-55f7853bfecadbbcd9800c5ad')
// .then(response => response.json())
// .then(result => console.log(result))

// fetch('https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=23141272-55f7853bfecadbbcd9800c5ad')
// .then(response => response.json())
// .then(result => console.log(result))
