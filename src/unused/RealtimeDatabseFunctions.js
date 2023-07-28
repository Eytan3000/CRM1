const firebaseConfig = {};

// Replace "your_database_url" with the URL of your Firebase Realtime Database
const databaseURL =
  'https://mycrm-a7912-default-rtdb.europe-west1.firebasedatabase.app/';

// Data to be added to the database
const newData = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
};

// // Perform the POST request to add the data
// fetch(`${databaseURL}/users.json`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(newData),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Data added successfully:', data);
//   })
//   .catch((error) => {
//     console.error('Error adding data:', error);
//   });

// export default function addUser() {
//   fetch('https://mycrm-a7912-default-rtdb.europe-west1.firebasedatabase.app/', {
//     method: 'POST',
//     body: JSON.stringify({
//       user: 'newUser',
//       oderdItems: 'newOrderItems',
//     }),
//   });
// }

// fetch(`${databaseURL}/users/Eytan_krief_ID/leads.json`, {
//   method: 'POST',
//   body: JSON.stringify({
//     user: 'newUser2',
//     oderdItems: 'newOrderItems',
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Data added successfully. Auto-generated ID:', data.name);
//   })
//   .catch((error) => {
//     console.error('Error adding data:', error);
//   });

// // fetch lead
// fetch(`${databaseURL}/users/Eytan_krief_ID/leads.json`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log('Data added successfully.:', data);
//   })
//   .catch((error) => {
//     console.error('Error adding data:', error);
//   });
