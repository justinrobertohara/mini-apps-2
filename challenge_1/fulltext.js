const axios = require('axios');

axios
  .get('http://localhost:3000/events/description?q=pilgrims')
  .then(resp => {
    console.log(resp.data);
  })
  .catch(error => {
    console.log(error);
  });
