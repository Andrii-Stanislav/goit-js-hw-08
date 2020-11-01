import photoColection from "./gallery-items.js"

const photoGallery = document.querySelector('.js-gallery');

photoGallery.addEventListener('click', () => {
    event.preventDefault();
});

photoColection.map(createPhotoItemHTML);

function createPhotoItemHTML(photo, index) {
  const photoItem = `<li class="gallery__item">
    <a class="gallery__link" href="">
    <img class="gallery__image" src="" data-lazy="${photo.original}" alt="${photo.description}">
    </a>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, aliquam repellat dolores saepe vero nesciunt modi? Dolore similique suscipit sunt quos aut nostrum expedita ex, quis omnis architecto sapiente tempore! Mollitia illum voluptate facilis, ea nesciunt commodi aut repellat ipsam.</p>
    </li >`;

  photoGallery.insertAdjacentHTML('beforeend', photoItem);
}


const images = [...document.querySelectorAll('.gallery__image')];

const lazyLoad = targets => {

  const io = new IntersectionObserver((entries, observer) => {
      console.log('💩');
      
    entries.forEach(
      entry => {
        if (entry.isIntersecting) {
          console.log(entry);
          console.log(entry.isIntersecting);


          const image = entry.target;
          const src = image.dataset.lazy;
          
          image.src = src;
          image.classList.add('appear');
          
          observer.unobserve(image);
      }
      }
    );
  });

  targets.forEach(target => io.observe(target));
};


lazyLoad(images);

