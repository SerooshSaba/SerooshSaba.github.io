const content = document.getElementById("content-area");

// Knapper
const om_knapp = document.getElementById("om-knapp");
const erfaring_knapp = document.getElementById("erfaring-knapp");
const utdanning_knapp = document.getElementById("utdanning-knapp");

// Dots
const om_dot = document.getElementById("om-dot");
const erfaring_dot = document.getElementById("erfaring-dot");
const utdanning_dot = document.getElementById("utdanning-dot");
const alle_dots = [ om_dot, erfaring_dot, utdanning_dot ];

// Seksjoner
const om_seksjon = document.getElementById("om-seksjon");
const erfaring_seksjon = document.getElementById("erfaring-seksjon");
const utdanning_seksjon = document.getElementById("utdanning-seksjon");


function isInViewPort(element) {
    var y_position = element.getBoundingClientRect().y;
    const margin = 400;
    if ( y_position > - margin && y_position < margin ) {
        return true;
    } else {
        return false;
    }
}

content.addEventListener('scroll', function (event) {

    if (isInViewPort(om_seksjon)) {
        alle_dots.forEach((dot)=>{
            dot.style.opacity = "0";
        });
        om_dot.style.opacity = "1";
    }

    if (isInViewPort(erfaring_seksjon)) {
        alle_dots.forEach((dot)=>{
            dot.style.opacity = "0";
        });
        erfaring_dot.style.opacity = "1";
    }

    if (isInViewPort(utdanning_seksjon)) {
        alle_dots.forEach((dot)=>{
            dot.style.opacity= "0";
        });
        utdanning_dot.style.opacity = "1";
    }

}, false);


om_knapp.onclick = () => {
    om_seksjon.scrollIntoView();
}

erfaring_knapp.onclick = () => {
    erfaring_seksjon.scrollIntoView();
}

utdanning_knapp.onclick = () => {
    utdanning_seksjon.scrollIntoView();
}