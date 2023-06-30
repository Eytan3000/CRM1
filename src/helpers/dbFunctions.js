export function insertNewLead(lead) {
  fetch('http://localhost:8000/leads', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(lead),
  }).catch((err) => console.log(err));
}
export function loadAllLeadsCards() {
  return fetch('http://localhost:8000/leads').then((res) => res.json());
}
export function loadStages() {
  return fetch('http://localhost:8000/leads').then((res) => res.json());
}
export function loadLead(lead) {}
