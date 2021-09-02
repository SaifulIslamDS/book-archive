const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const resultFound = document.getElementById("result-found");
const errorDiv = document.getElementById("error-div");

/*
**  Function name: emptyContent  
**  remove data after clicking search button 
*/
const emptyContent = () =>{
    searchInput.value = "";
    bookContainer.innerHTML = "";
    resultFound.innerHTML = "";
    errorDiv.innerHTML = "";
}
/* 
**  Function name: toggleSpinner 
**  Toggle spinner while data loading 
*/

const toggleSpinner = displayStyle => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = displayStyle;
};


/* 
**  Function name: captureInputValues 
**  Load and capture data from API to display
*/

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
        // display spinner while loading..
        toggleSpinner("block");
        const searchURL = `https://openlibrary.org/search.json?q=${search}`;
        fetch(searchURL)
        .then(res => res.json())
        .then(data => displayData(data.docs));
    }
};

/*  
**  Function name: displayData
**  store data in this function
**  Loop through data
*/

const displayData = (data) => { 
    if (data.length !== 0) {
        // enter into this block if input field has value
        emptyContent();
        // Loop through data
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
            });
    } else {
        //display error if no data found
        errorDiv.innerHTML = `
            <p style="display: inline; color: red;">No such book name found!</p>
        `;
    }
    // Stop spinner
    toggleSpinner("none");
}

/*
**  Event listener: execute after clicking search button
**  Placed here beacause of the console error:
**  Uncaught ReferenceError: Cannot access 'captureInputValues' before initialization 
*/
searchBtn.addEventListener("click", captureInputValues);
