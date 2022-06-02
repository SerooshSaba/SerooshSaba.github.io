const content = document.getElementById("content-area");

// Knapper
const om_knapp = document.getElementById("om-knapp");
const erfaring_knapp = document.getElementById("erfaring-knapp");
const utdanning_knapp = document.getElementById("utdanning-knapp");

const alle_knapper = [ om_knapp, erfaring_knapp, utdanning_knapp ];

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
        alle_knapper.forEach((knapp)=>{
            knapp.style.color = "rgb(150,150,150)";
        });
        om_knapp.style.color = "rgb(0,0,0)";
    }

    if (isInViewPort(erfaring_seksjon)) {
        alle_knapper.forEach((knapp)=>{
            knapp.style.color = "rgb(150,150,150)";
        });
        erfaring_knapp.style.color = "rgb(0,0,0)";
    }

    if (isInViewPort(utdanning_seksjon)) {
        alle_knapper.forEach((knapp)=>{
            knapp.style.color = "rgb(150,150,150)";
        });
        utdanning_knapp.style.color = "rgb(0,0,0)";
    }

}, false);
