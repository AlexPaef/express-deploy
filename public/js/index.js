// Найти форму
// Перехватить событие submit + отменить стандартное поведение браузера
// Сформировать данные для отправки
// Отправить запрос + fetch
// Обработать ответ

// console.log(document.querySelector('form'));

document.addTodoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = event.target.action;
  const method = event.target.method;
  const title = event.target.title.value;
  const description = event.target.description.value;

  const body = JSON.stringify({
    title,
    description,
  });

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await response.json();

  // Способ 1 с помощью редиректа на клиенте
  // window.location.href = '/';

  // Споcоб 2 c помощью JSON

  const htmlTodo = `<div data-id=${data.id} class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">${data.title}</h5>
      <p class="card-text">${data.description}</p>
      <a href="/todos/edit/${data.id}" class="btn btn-primary">Правка</a>
    </div>
  </div>`;

  document.querySelector('.todos').innerHTML += htmlTodo;
});

document.querySelector('.todos').addEventListener('click', (event) => {
  if (event.target.classList.contains('js-delete')) {
    console.log('Delete id: ' + event.target.parentNode.parentNode.dataset.id);
    event.target.parentNode.parentNode.remove(event.target.parentNode);
  }
});
