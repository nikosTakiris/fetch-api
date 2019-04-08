const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searching();
});

function searching() {
  let searchField = document.getElementById("search-text");
  const searchText = document.getElementById('search-text').value;
  const searchSort = document.querySelector("input[name='search-sort']:checked").value;
  const searchSelect = document.querySelector(".search-select").value;

  if(searchText === "") {
    warningMessage("Please add the search field");
    return;
  }

  redditApi(searchText, searchSort, searchSelect);
  clearText(searchField);
}

// reddit api
function redditApi(text, sort, limit) {
  let title = ""
  let subject = "";
  let thumbnail = "";
  let image = "";
  let url = "";
  let output = "";

  fetch(`https://www.reddit.com/search.json?q=${text}&sort=${sort}&limit=${limit}`)
  .then(response => response.json())
  .then(reddit => reddit.data.children.map(current => {
    
    title = current.data.title;
    subject = (current.data.selftext !== "") ? current.data.selftext : "";
    thumbnail = (current.data.preview) ? current.data.preview.images[0].source.url : "./images/red.jpg";
    url = current.data.url;

    // output
    output += `
      <div class="output">
      <a href=${url} target="_blank"><img src=${thumbnail}></a>
      <h2><a href=${url} target="_blank" class="title-a">${title}</a></h2>
      <p class="subject">${shortText(subject, 100)}</p>
      <p><a href=${url} target='_blank' class="read-more">Read more</a></p>
      </div>
    `;

    content.style.opacity = 1;
    document.getElementById('content').innerHTML = output;
  }))
  .catch(err => console.log(err));

// short text
function shortText(text, limit) {
  let short = text.indexOf(' ', limit);
  if(short == -1) return text;
  return text.substring(0, short);
}

// clear input field
function clearText(text) {
  text.value = "";
}

// warning message
function warningMessage(message) {
  const div_warning = document.createElement('div');
  div_warning.className = "warning-class";
  div_warning.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");
  const searchForm = document.getElementById("search-form");
  const wrapperSearch = document.querySelector(".search-wrapper");
  const content = document.getElementById("content");

  container.insertBefore(div_warning, content);
  setTimeout( () => {
    div_warning.style.opacity = 0;
  }, 2000 );

  setTimeout( () => {
    div_warning.remove();
  }, 2200 );
}
