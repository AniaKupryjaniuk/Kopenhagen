const urlParams = new URLSearchParams(window.location.search);
const eventID = urlParams.get("event_id");
window.addEventListener('DOMContentLoaded', getData);

function getData() {
    fetch("http://multidani.eu/shop/wp-json/wp/v2/event/" + eventID + "?_embed")
        .then(res => res.json())
        .then(showEvent)
}

function showEvent(event) {
    document.querySelector(".event_image").src = event.image.guid;
    document.querySelector(".title").innerHTML = event.title.rendered;
    document.querySelector(".location").innerHTML = "Location: " + event.location;
    document.querySelector(".type").innerHTML = "Type: " + event._type;
    document.querySelector(".author").innerHTML = "Author: " + event._name;
    document.querySelector(".description").innerHTML = event.info;
    document.querySelector(".date").innerHTML = "Date: " + event.time;
}
