// TODO:
// 2. fix when displaying all
// 3. Dispaly location selector               |
// 4. Filter by type, location and date       |
// 5. Show one event in a different page      |
// -------------------------------------------

window.addEventListener('DOMContentLoaded', init);

const eventsLink = "http://multidani.eu/shop/wp-json/wp/v2/event"
const eventTypesLink = "http://multidani.eu/shop/wp-json/wp/v2/eventtype"
const eventLocationLink = "http://multidani.eu/shop/wp-json/wp/v2/eventlocation"

var typeID = -1;
var locID = -1;

var allEvents = [];

function init() {
    getData()
    getEventTypes()
    getEventLocations()
}

//------------------Display all events----------------------

function getData() {
    fetch(eventsLink)
        .then(res => res.json())
        .then(function (data) {
            allEvents = data;
            handleData(data)
        })
}

function handleData(posts) {
    posts.forEach(showEvent);
}

function showEvent(event) {
    const template = document.querySelector(".event-template").content;
    const copy = template.cloneNode(true);
    console.log(event);
//    const tmp = document.createElement("div");
//    tmp.innerHTML = event.location + " - " + event._type;
   // copy.appendChild(tmp);
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
            typeID = -1;
            filter();
        } else {
            typeID = type.id;
            //filterByType(type.id);
            filter();
        }
    }

    document.querySelector(".dropdown-type").appendChild(typeOption);
}
//---------Display all event locations in selection box-----------

function getEventLocations() {
    fetch(eventLocationLink)
        .then(res => res.json())
        .then(setEventLocations)
}

function setEventLocations(eventLoc) {
    eventLoc.forEach(setLocationSelection)
}

function setLocationSelection(location) {
    console.log(location)
    const locOption = document.createElement("a");
    locOption.innerHTML = location.name;
    //ADDING A FUNCTION THAT DISPLAYS EVENTS OF CONCRETE TYPE WHEN CLICKED ON
    locOption.onclick = function () {
        //clear the current displayed events:
        document.querySelector(".event-grid-wrapper").innerHTML = "";
        if (location.name == "All") {
            locID = -1;
            filter();
        } else {
            //filterByLocation(location.id);
            locID = location.id;
            filter();
        }
    }

    document.querySelector(".dropdown-loc").appendChild(locOption);
}

//----------------------------Filters-----------------------------

function filter() {

    var filtered = []

    if(typeID == -1 && locID == -1) {
        handleData(allEvents)
    }
    else if(typeID == -1 && locID != -1) {
        //filter only by location
        filtered = allEvents.filter(event => event.eventlocation == locID);
    }
    else if(typeID != -1 && locID == -1) {
        //filter only by type
        filtered = allEvents.filter(event => event.eventtype == typeID);

    }
    else if(typeID != -1 && locID != -1) {
        //filter by both
        filtered = allEvents.filter(event => event.eventtype == typeID)
                            .filter(event => event.eventlocation == locID);

    }

    handleData(filtered);
}
