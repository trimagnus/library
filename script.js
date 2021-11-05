let myLibrary = [
    new Book('The Hobbit', 'J.R.R. Tolkien', 295, true), //Dummy content
    new Book('Fellowship of the Ring', 'J.R.R. Tolkein', 423, true),
];

//Each book will need a button to toggle read status
//Each book will need a delete button
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleRead = function() {
        this.read = !this.read;
    };
}

function addBookToLibrary() {
    //Take in user input
    const inp = getUserBookInput();
    //Create a book
    const book = createBook(inp);
    //Add it to the library
    if(book) {
        myLibrary.append(book);
        book.dataset.index = myLibrary.length - 1;

    }
    //Update cache
}

function getUserBookInput() {
    return;
}

function displayBooks() {
    
}

function updateCache() {
    //update the cache with the current library
    checkCache();
}

function checkCache() {
    //Check if a local storage cache exists
}

function retrieveCache() {
    if(checkCache()) return; //return the cache
    return myLibrary;
}

const newBookButton = document.getElementById('newBookButton');

myLibrary = retrieveCache();
displayBooks(console.log(myLibrary));