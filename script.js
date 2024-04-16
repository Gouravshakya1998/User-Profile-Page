// JavaScript code
let currentPage = 1;

function searchGithub() {
  const username = document.getElementById('searchInput').value;

  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(user => {
      const profileElement = document.getElementById('profile');
      profileElement.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <p>Number of repositories: ${user.public_repos}</p>
      `;
    });

  fetch(`https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=10`)
    .then(response => response.json())
    .then(repositories => {
      const repositoriesElement = document.getElementById('repositories');
      repositoriesElement.innerHTML = repositories.map(repo => `
        <div class="repository">
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description available'}</p>
          <p>Topics: ${repo.topics ? repo.topics.join(', ') : 'No topics available'}</p>
        </div>
      `).join('');
    });

  renderPagination();
}

function renderPagination() {
  const paginationElement = document.getElementById('pagination');
  paginationElement.innerHTML = `
    <button onclick="previousPage()" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    <button onclick="nextPage()">Next</button>
  `;
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    searchGithub();
  }
}

function nextPage() {
  currentPage++;
  searchGithub();
}