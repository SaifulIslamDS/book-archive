const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const resultFound = document.getElementById("result-found");
const errorDiv = document.getElementById("error-div");
const bookCover = document.getElementById("book-cover");

//empty content
const emptyContent = () =>{
    searchInput.value = "";
    bookContainer.innerHTML = "";
    resultFound.innerHTML = "";
}
// Capture ddata
const captureInputValues = () => {
    const search =  searchInput.value;
    if (search === "") {
        emptyContent();
        errorDiv.innerHTML = `
        <p style="color: red;">Search field cannot be empty!</p>
        `;
        return;
    } else {
        emptyContent();
        const searchURL = `https://openlibrary.org/search.json?q=${search}`;
        fetch(searchURL)
        .then(res => res.json())
        .then(data => dataStorage(data.docs));
    }
};

// store data in this function
// Loop through data
const dataStorage = (data) => { 
    if (data.length === 0) {
        // console.log("No data found");
        errorDiv.innerHTML = `
            <p style="display: inline; color: red;">No such book name found!</p>
        `;
    } else {
        errorDiv.innerText = "";
    }
    data.forEach(book => {
        // console.log(book.cover_i);
        resultFound.innerHTML = `<p>${data.length} books found</p>`;
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("col-md-3" , "col-12" , "item");
        bookDiv.innerHTML = `
            <div>
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid" alt="Book cover image">
                <h3 class="pt-3">${book.title}</h3>
                <p>Author: ${book.author_name}</p>
                <p>Publisher: ${book.publisher}</p>
                <p>Published date: ${book.publish_date}</p> 
            </div>
        `;
        bookContainer.append(bookDiv);
        })
}
//Event listener
searchBtn.addEventListener("click", captureInputValues);

//Display book covers 
// const displayBookCover = () => {
//     bookCover.innerHTML = `
//     <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">
//     `;
// };