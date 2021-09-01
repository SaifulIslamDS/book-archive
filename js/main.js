const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const resultFound = document.getElementById("result-found");
// Capture ddata
const captureInputValues = () => {
    const search =  searchInput.value;
    const searchURL = `http://openlibrary.org/search.json?q=${search}`;
    fetch(searchURL)
    .then(res => res.json())
    .then(data => dataStorage(data.docs))
};
// store data in this function
// Loop through data
function dataStorage(data){
    data.forEach(book => {
        // console.log(book);
        resultFound.innerText = ``;
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("col-md-3" , "col-12");
        bookDiv.innerHTML = `
            <h3 id="book-title" class="pt-3">${book.title}</h3>
            <p id="book-author">Author: ${book.author_name}</p>
            <p id="book-published">Published date: ${book.publish_date}</p>
        `;
        bookContainer.append(bookDiv);
    });
};
//Event listener
searchBtn.addEventListener("click", captureInputValues);