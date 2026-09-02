function is_youtubelink(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
}
function is_imagelink(url) {
    var p = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
    return (url.match(p)) ? true : false;
}
function is_vimeolink(url,el) {
    var id = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                var response = JSON.parse(xmlhttp.responseText);
                id = response.video_id;
                console.log(id);
                el.classList.add('lightbox-vimeo');
                el.setAttribute('data-id',id);

                el.addEventListener("click", function(event) {
                    event.preventDefault();
                    document.getElementById('lightbox').innerHTML = '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="videoWrapperContainer"><div class="videoWrapper"><iframe src="https://player.vimeo.com/video/'+el.getAttribute('data-id')+'/?autoplay=1&byline=0&title=0&portrait=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>';
                    document.getElementById('lightbox').style.display = 'block';

                    setGallery(this);
                });
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };
    xmlhttp.open("GET", 'https://vimeo.com/api/oembed.json?url='+url, true);
    xmlhttp.send();
}
function setGallery(el) {

    var lightbox = document.getElementById('lightbox');
    var galleryName = el.getAttribute('data-gallery');

    // Si esta imagen no pertenece a ninguna galería, no hacemos nada
    if (!galleryName) {
        lightbox.classList.remove('gallery');
        return;
    }

    // Todas las imágenes que pertenecen a esta galería
    var gallery_elements = Array.from(
        document.querySelectorAll(
            'a.lightbox-image[data-gallery="' + galleryName + '"]'
        )
    );

    // Si solo hay una imagen, no mostramos navegación
    if (gallery_elements.length <= 1) {
        lightbox.classList.remove('gallery');
        return;
    }

    lightbox.classList.add('gallery');

    // Posición de la imagen actualmente abierta
    var currentkey = gallery_elements.indexOf(el);

    if (currentkey === -1) return;

    var nextkey =
        (currentkey + 1) % gallery_elements.length;

    var prevkey =
        (currentkey - 1 + gallery_elements.length)
        % gallery_elements.length;

    var next = document.getElementById('next');
    var prev = document.getElementById('prev');

    if (next) {
        next.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            gallery_elements[nextkey].click();
        });
    }

    if (prev) {
        prev.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            gallery_elements[prevkey].click();
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {

    //create lightbox div in the footer
    var newdiv = document.createElement("div");
    newdiv.setAttribute('id',"lightbox");
    document.body.appendChild(newdiv);

    //add classes to links to be able to initiate lightboxes
    var elements = document.querySelectorAll('a');
    elements.forEach(element => {
        var url = element.getAttribute('href');
        if(url) {
            if(url.indexOf('vimeo') !== -1 && !element.classList.contains('no-lightbox')) {
                is_vimeolink(url,element);
            }
            if(is_youtubelink(url) && !element.classList.contains('no-lightbox')) {
                element.classList.add('lightbox-youtube');
                element.setAttribute('data-id',is_youtubelink(url));
            }
            if(is_imagelink(url) && !element.classList.contains('no-lightbox')) {
                element.classList.add('lightbox-image');
                var href = element.getAttribute('href');
                var filename = href.split('/').pop();
                var split = filename.split(".");
                var name = split[0];
                element.setAttribute('title',name);
            }
        }
    });

    //remove the clicked lightbox
    document.getElementById('lightbox').addEventListener("click", function(event) {
        if(event.target.id != 'next' && event.target.id != 'prev'){
            this.innerHTML = '';
            document.getElementById('lightbox').style.display = 'none';
        }
    });
    
    //add the youtube lightbox on click
    var elements = document.querySelectorAll('a.lightbox-youtube');
    elements.forEach(element => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById('lightbox').innerHTML = '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="videoWrapperContainer"><div class="videoWrapper"><iframe src="https://www.youtube.com/embed/'+this.getAttribute('data-id')+'?autoplay=1&showinfo=0&rel=0"></iframe></div>';
            document.getElementById('lightbox').style.display = 'block';

            setGallery(this);
        });
    });

    //add the image lightbox on click
    var elements = document.querySelectorAll('a.lightbox-image');
    elements.forEach(element => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById('lightbox').innerHTML = '<a id="close"></a><a id="next">&rsaquo;</a><a id="prev">&lsaquo;</a><div class="img" style="background: url(\''+this.getAttribute('href')+'\') center center / contain no-repeat;" title="'+this.getAttribute('title')+'" ><img src="'+this.getAttribute('href')+'" alt="'+this.getAttribute('title')+'" /></div><span>'+this.getAttribute('title')+'</span>';
            document.getElementById('lightbox').style.display = 'block';

            setGallery(this);
        });
    });

});

document.addEventListener("keydown", function(event) {

    var lightbox = document.getElementById('lightbox');

    if (lightbox.style.display !== 'block') return;

    if (event.key === "ArrowRight") {
        var next = document.getElementById('next');
        if (next) next.click();
    }

    if (event.key === "ArrowLeft") {
        var prev = document.getElementById('prev');
        if (prev) prev.click();
    }

    if (event.key === "Escape") {
        lightbox.innerHTML = '';
        lightbox.style.display = 'none';
    }    

});