const API_KEY = '5d0fb6ab'

// Функция для выполнения запроса к API
function fetchMovies(query) {
  if (query.length < 1) {
    document.getElementById('results').innerHTML = '' // innerHTML = '' — стирает всё.
    return // Прекращение выполнения, если запрос слишком короткий
  }
  
  const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`

  // Выполняется запрос к API
  fetch(url) // fetch — это встроенная функция JS для отправки HTTP-запросов. Она отправляет GET-запрос на указанный URL и возвращает promise (объект, представляющий выполнение асинхронной операции).
    .then(function (response) { // response — это объект ответа от API, который получается от fetch().
      return response.json() // Преобразование ответа в формат JSON
    })
    .then(function (data) { // data - это объект с фильмами,  полученные от API, если запрос был успешным.
      console.log(data) // Для отладки, чтобы увидеть, что именно вернуло API.
      if (data.Response === "True") {
        displayResults(data.Search) // data.Search — это массив, состоящий из объектов с данными о фильмах.
      } else {
        document.getElementById('results').innerHTML = '<p>No results found.</p>'  // Выводится, если фильмы не найдены.
      }
    })
    .catch(function (error) {
      console.error('Error:', error) // Консолится ошибка, если что-то пошло не так
      document.getElementById('results').innerHTML = '<p>Something went wrong.</p>' // Выводится ошибка на экран
    })
}

// Функция для отображения результатов поиска
function displayResults(movies) {
  const resultsContainer = document.getElementById('results')
  resultsContainer.innerHTML = '' // Очищаются предыдущие результаты.
  if (!movies || movies.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>' // Выводится, если фильм - null/undefined или длина - 0.
    return
  }
  
  // Перебирание каждого фильма в найденных данных
  movies.forEach(function (movie) {
    const movieElement = document.createElement('div') // Создание элемента для отображения информации о фильме
    movieElement.classList.add('bg-white', 'p-4', 'rounded') // Добавление стилей
    
    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://wingandaprayer.live/wp-content/uploads/2018/07/no-image-available.jpg' // Если у фильма есть img-используется, если нет-заглушку.
    
    movieElement.innerHTML = `
    <h2 class="font-semibold text-lg">${movie.Title}</h2>
    <p class="text-gray-600">Year: ${movie.Year}</p>
    <p class="text-gray-600">Type: ${movie.Type || 'N/A'}</p>
    <img src="${poster}" alt="${movie.Title}" class="w-full object-cover pt-6 rounded">
    `

    resultsContainer.appendChild(movieElement) // Добавление элемента с фильмом в контейнер
  })
}

document.getElementById('inputSearch').addEventListener('input', function (event) {
  const query = event.target.value // event.target - это элемент, на котором произошло событие; value - значение поля ввода в момент события.
  fetchMovies(query) // Выполняется поиск с каждым новым вводом
})