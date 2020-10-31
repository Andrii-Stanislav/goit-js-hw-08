import photoColection from "./gallery-items.js"
// ✅ Создание и рендер разметки по массиву данных и предоставленному шаблону.
// ✅ Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// ✅ Открытие модального окна по клику на элементе галереи.
// ✅ Подмена значения атрибута src элемента img.lightbox__image.
// ✅ Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// ✅ Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
// ✅ Закрытие модального окна по клику на div.lightbox__overlay.
// ✅ Закрытие модального окна по нажатию клавиши ESC.
// ✅ Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".


const photoGallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxImage = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('.lightbox__button');

photoColection.map(createPhotoItemHTML);

photoGallery.addEventListener('click', showPhoto);
closeBtn.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowRight':
    case 'ArrowLeft':
      showNextPhoto(event.code);
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
});

function createPhotoItemHTML(photo, index) {
  const photoItem = `<li class="gallery__item">
    <a class="gallery__link" href="${photo.original}">
    <img class="gallery__image" src="${photo.preview}" data-source="${photo.original}" data-index="${index}" alt="${photo.description}">
    </a>
    </li >`;

  photoGallery.insertAdjacentHTML('beforeend', photoItem);
}

function showPhoto(event) {
  event.preventDefault();

  if (event.target === event.currentTarget) {
    return
  }

  lightbox.classList.add('is-open');

  const originalPhotoRef = event.target.getAttribute('data-source');
  lightboxImage.setAttribute('src', originalPhotoRef);

  const dataIndex = event.target.getAttribute('data-index');
  lightboxImage.setAttribute('data-index', dataIndex);

}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('data-index', '');
}

function showNextPhoto(keyCode) {
  if (!lightbox.classList.contains('is-open')){ return }
  
  const originalSrcArr = photoColection.map(({ original }) => original)
  const index = Number(lightboxImage.getAttribute('data-index'));

  switch (keyCode) {
    case 'ArrowRight':
      if (index === originalSrcArr.length - 1) { return }
      lightboxImage.setAttribute('src', originalSrcArr[index + 1]);
      lightboxImage.setAttribute('data-index', (index + 1));
      break;
    case 'ArrowLeft':
      if (index === 0) { return }
      lightboxImage.setAttribute('src', originalSrcArr[index - 1]);
      lightboxImage.setAttribute('data-index', (index - 1));
      break;
  }
}