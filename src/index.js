import searchFormTps from './templates/search-form-tps.hbs';
import galleryCardTps from './templates/gallery-card-tps.hbs';

import './sass/main.scss';


fetch('https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=23141272-55f7853bfecadbbcd9800c5ad')
