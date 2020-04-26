// TODO:
// 1. Display all events                      |
// 2. Display type selector                   |
// 3. Dispaly location selector               |
// 4. Filter by type and location             |
// 5. Show one event in a different page      |
// -------------------------------------------

window.addEventListener('DOMContentLoaded', getData);

const eventsLink = "http://multidani.eu/shop/wp-json/wp/v2/event"

function getData() {
    fetch(eventsLink)
        .then(res => res.json())
        .then(handleData)
}

function handleData(posts) {
    posts.forEach(showEvent)
}

function showEvent(event) {
    const template = document.querySelector(".event-template").content;
    const copy = template.cloneNode(true);
    console.log(event);
    copy.querySelector(".event-image").src = event.image.guid;
    copy.querySelector(".img-link").href = "singleEvent.html?event_id=" + event.id;

    document.querySelector(".event-grid-wrapper").appendChild(copy);
}
