(async () => {
  try {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register('/service-worker.js');
      console.log('sw registered');
    }
  } catch (e) {
    console.log(e);
  }
})();

// const url = "https://service-worker-buggy-service-backend.onrender.com";

function noNetwork() {
  const container = document.querySelector('.news-container');

  container.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="modal">
        <p class="modal-text">
          Не удалось загрузить данные Проверьте подключение и обновите страницу
        </p>
      </div>
    `,
  );
}

function insertNews(arr) {
  const newsList = document.querySelector('.news-list');
  const fakeList = document.createElement('div');
  fakeList.classList.add('news-list');
  arr.forEach((newsItem) => {
    const { timestamp, newsMessage } = newsItem;
    const date = new Date(timestamp);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('ru-RU', options);
    fakeList.insertAdjacentHTML(
      'beforeend',
      `
      <div class="news-list-item">
          <div class="news-list-item-head-formatted">${formattedDate}</div>
          <div class="news-list-item-body">
            <div class="news-list-item-box"></div>
            <div class="news-list-item-two-lines">${newsMessage}</div>
          </div>
        </div>
      `,
    );
  });

  newsList.replaceWith(fakeList);
}

fetch('http://localhost:7070/api/test')
  .then((r) => r.json())
  .then((r) => insertNews(r))
  .catch(() => {
    setTimeout(noNetwork, 3000);
  });
