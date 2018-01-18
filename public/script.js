const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const serverUrl = 'http://localhost:7500'

// Handling key up on the input and sending the data to the server
todoInput.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 13) {
    fetch(`${serverUrl}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: 'text=' + evt.target.value
    })
    .then((response) => {
      evt.target.value = '';
      console.log('finished', response);
      loadData();
    });
  }
});

todoList.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'OL') {
    return;
  }

  const id = evt.target.getAttribute('data-id');
  fetch(`${serverUrl}/item/${id}`, {
    method: 'DELETE'
  })
  .then(() => loadData())
  .catch((err) => {
    console.log('There was a problem: ', err);
  });
});

// Loads data from the server.
function loadData() {
  fetch(`${serverUrl}/items`)
    .then((response) => response.json())
    .then((items) => {
      todoList.innerHTML = '';
      items.forEach((item) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', item.id);
        li.textContent = item.text;
        todoList.appendChild(li);
      })

    });
}

loadData();
