const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2608";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let parties = [];
let selectedParty;

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    console.log(parties);
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

function PartyListItem(party) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
    `;
  $li.addEventListener("click", () => {
    getParty(party.id);
  });
  return $li;
}

function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");
  const $children = parties.map(PartyListItem);
  $ul.replaceChildren(...$children);
  return $ul;
}
function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please Select an party to learn more.";
    return $p;
  }
  const $party = document.createElement("section");
  $party.classList.add("party");
  $party.innerHTML = `
    <h3>${selectedParty.name} #${selectedParty.id}</h3>
    <p>${selectedParty.date.split("T")[0]}</p>
    <p class="location">${selectedParty.location}</p>
    <p>${selectedParty.description}</p>
  `;
  return $party;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Party Planner</h1>
  <main>
  <section>
  <h2>Upcoming Parties</h2>
  <PartyList></PartyList>
  </section>
  <section id="selected">
  <h2>Party Details</h2>
  <PartyDetails></PartyDetails>
  </section>
  </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getParties();
  render();
}

init();
