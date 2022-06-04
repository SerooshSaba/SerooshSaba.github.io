const content = document.getElementById("content-area");

// Knapper
const about_button = document.getElementById("about-button");
const skills_button = document.getElementById("skills-button");
const projects_button = document.getElementById("projects-button");
const experience_button = document.getElementById("experience-button");

// Dots
const about_dot = document.getElementById("about-dot");
const skills_dot = document.getElementById("skills-dot");
const projects_dot = document.getElementById("projects-dot");
const experience_dot = document.getElementById("experience-dot");

const alle_dots = [ about_dot, skills_dot, experience_dot, projects_dot ];

// Sections
const about_section = document.getElementById("about-section");
const skills_section = document.getElementById("skills-section");
const projects_section = document.getElementById("projects-section");
const experience_section = document.getElementById("experience-section");



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

    if (isInViewPort(about_section)) {
        alle_dots.forEach((dot)=>{
            dot.style.opacity = "0";
        });
        about_dot.style.opacity = "1";
    }

    if (isInViewPort(skills_section)) {
        alle_dots.forEach((dot)=>{
            dot.style.opacity = "0";
        });
        skills_dot.style.opacity = "1";
    }

    if (isInViewPort(projects_section)) {
        alle_dots.forEach((dot)=>{
            dot.style.opacity = "0";
        });
        projects_dot.style.opacity = "1";
    }

    if (isInViewPort(experience_section)) {
        alle_dots.forEach((dot)=>{
            dot.style.opacity = "0";
        });
        experience_dot.style.opacity = "1";
    }

}, false);



about_button.onclick = () => {
    about_section.scrollIntoView();
}
skills_button.onclick = () => {
    skills_section.scrollIntoView();
}
projects_button.onclick = () => {
    projects_section.scrollIntoView();
}
experience_button.onclick = () => {
    experience_section.scrollIntoView();
}