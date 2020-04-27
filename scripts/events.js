// TODO:
// 1. Display all events                      |
// 2. Display type selector                   |
// 3. Dispaly location selector               |
// 4. Filter by type and location             |
// 5. Show one event in a different page      |
// -------------------------------------------

window.addEventListener('DOMContentLoaded', init);

const eventsLink = "http://multidani.eu/shop/wp-json/wp/v2/event"
const eventTypesLink = "http://multidani.eu/shop/wp-json/wp/v2/eventtype"

function init() {
    getData()
    getEventTypes()
}

//------------------Display all events----------------------

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

//---------Display all event types in selection box----------

function getEventTypes() {
    fetch(eventTypesLink)
        .then(res => res.json())
        .then(setEventTypes)
}

function setEventTypes(eventTypes) {
    eventTypes.forEach(setTypeSelection)
}

function setTypeSelection(type) {
    console.log(type)
    const typeOption = document.createElement("a");
    typeOption.innerHTML = type.name;
    //ADDING A FUNCTION THAT DISPLAYS EVENTS OF CONCRETE TYPE WHEN CLICKED ON
    typeOption.onclick = function () {
        //clear the current displayed events:
        document.querySelector(".event-grid-wrapper").innerHTML = "";
        if (type.name == "All") {
            getData()
        } else {
            fetch("http://multidani.eu/shop/wp-json/wp/v2/event?eventtype=" + type.id)
                .then(res => res.json())
                .then(handleData)
        }
    }

    document.querySelector(".dropdown-content").appendChild(typeOption);
}

