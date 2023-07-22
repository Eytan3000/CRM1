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

export function deleteLeadFromDb(id) {
  fetch('http://localhost:8000/leads/' + id, {
    method: 'DELETE',
  });
}
export function deleteNoteFromDb(leadId) {
  // You cant change specific values from within a database object, so that would be a function for a real database. for now all you can do is to change the entire lead.
}

export function loadStagesFromDb() {
  return fetch('http://localhost:8000/stages').then((res) => res.json());
}

export function updateStageToDb(newStage) {
  return fetch('http://localhost:8000/stages', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: newStage,
    }),
  }).then((res) => res.json());
}

export function deleteStageFromDb(id) {
  fetch('http://localhost:8000/stages/' + id, {
    method: 'DELETE',
  });
}

export const updateObjectDB = async (objectId, updatedData) => {
  try {
    const response = await fetch(`http://localhost:8000/leads/${objectId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      console.log('Object updated successfully');
    } else {
      console.error('Failed to update object');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
