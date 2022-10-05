const count = 10;
const API_KEY = "zyTydYHbJPLxa2QbPgCe_WPSB4PmynfkN7so71kkihQ";
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const imagesConfig = {
  photosArray: [],
  ready: false,
  imagesLoaded: 0,
  totalImages: 0,
};

let { photosArray, ready, imagesLoaded, totalImages } = imagesConfig;

// Set attributes
const createAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Display Image
const displayPhotos = () => {
  totalImages = photosArray.length;
  imagesLoaded = 0;
  return photosArray.forEach((photo) => {
    const item = document.createElement("a");
    const img = document.createElement("img");
    createAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    createAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Load images
    img.addEventListener("load", () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        ready = true;
      }
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get images
const getPhotos = async () => {
  try {
    const response = await fetch(API_URL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

//Load images when the srollbar is at the
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
