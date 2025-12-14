window.addEventListener('DOMContentLoaded', function(){
    const galleryContainer = $('#imageGallery');

    galleryContainer.slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
        ]
    });

})
