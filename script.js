const bookshelf = document.getElementById('bookshelf');
const newBookButton = document.getElementById('newBookButton');

let myLibrary = [];

class Book {
    constructor(title = 'untitled', author = 'unnamed', pages = 0, read = 'false') {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function newBookButtonClicked(e) {
    addBookToLibrary(false);
    displayEditDialogue(myLibrary[0], 0);
}

function addBookToLibrary(updateDisplay = true) {
    const book = new Book();
    appendToLibrary(book);
    updateCache();
    if(updateDisplay) displayBooks();
}

function appendToLibrary(book) {
    myLibrary = [book, ...myLibrary]
}

function removeFromLibrary(index) {
    const accept = confirm('Delete book?');
    if(!accept) return;
    myLibrary.splice(index, 1);
    updateCache();
    displayBooks();
}

function displayBooks() {
    bookshelf.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++) {
        const card = makeBookCard(myLibrary[i]);
        card.dataset.index = i;
        card.addEventListener('click', editBookMode);
        bookshelf.appendChild(card);
    }
    newBookButton.style.visibility = "visible";
}

function hideBooks() {
    bookshelf.innerHTML = '';
}

function makeBookCard(book) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');
    bookCard.innerHTML = `
    <div class="title">${book.title}</div>
    <div class="author">by ${book.author}</div>
    <div class="bottomPanel">
        <div class="pagecount">${book.pages} pages</div>
        &#149;
        <div class="read">${book.read ? 'Read' : 'Unread'}</div>
    </div>`;
    bookCard.style.backgroundColor = randomBookColor();
    return bookCard;
}

function randomBookColor() {
    const colors = ['lightskyblue', 'lightseagreen', 'lightgrey', 'lightsalmon'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateCache() {
    let finalList = [];
    for(const book of myLibrary) {
        let temp = [];
        temp.push(book.title);
        temp.push(book.author);
        temp.push(book.pages);
        temp.push(book.read);
        finalList.push(temp);
    }
    localStorage.setItem('library', JSON.stringify(finalList));
}

function checkCache() {
    if(localStorage.getItem('library')) return true;
    return false;
}

//Book data format: [title,author,pages,read]
function retrieveCache() {
    if(!checkCache()) return myLibrary;
    let _books = [];
    //Rebuild library objects from JSON
    const libString = localStorage.getItem('library');
    for(let b of JSON.parse(libString)) {
        const book = new Book(...b);
        _books.push(book);
    }
    return _books;
}

function displayEditDialogue(book, index) {
    newBookButton.style.visibility = "hidden";
    bookshelf.innerHTML = `
    <form action="#"> 
        <div class="editDialogueField">
            <label>Title</label>
            <input type="text" name="title-input" id="title-input" value="${book.title}">
        </div>

        <div class="editDialogueField">
            <label>Author</label>
            <input type="text" name="author-input" id="author-input" value="${book.author}">
        </div>

        <div class="editDialogueField">
            <label>Page Count</label>
            <input type="number" min="0" name="page-count-input" id= "page-count-input" value="${book.pages}">
        </div>

        <div class="editDialogueCheck">
            <label for="read-checkbox">Read?</label>
            <input type="checkbox" name="read-checkbox" id="read-checkbox" ${book.read ? "checked":""}>
        </div>

        <div class="editDialogueControls">
            <input type="button" value="Confirm" onclick="submitBookEdit(${index})">
            <input type="button" value="Close" onclick="closeEditDialogue()">
            <input type="button" class="deleteButton" value="Delete" onclick="removeFromLibrary(${index})">
        </div>
    </form>
    `;
}

function submitBookEdit(index) {
    const title = document.getElementById('title-input').value;
    const author = document.getElementById('author-input').value;
    const pages = document.getElementById('page-count-input').value;
    const read = document.getElementById('read-checkbox').checked;
    myLibrary[index] = new Book(title,author,pages,read);
    updateCache();
    displayBooks();
}

function closeEditDialogue() {
    displayBooks();
}

function editBookMode(e) {
    let index;
    let node = e.target;
    while (!node.classList.contains('bookCard')) {
        node = node.parentNode;
        
    }
    index = node.dataset.index;
    const book = myLibrary[index];
    hideBooks();
    displayEditDialogue(book, index);
}

newBookButton.addEventListener('click', newBookButtonClicked);
myLibrary = retrieveCache();
displayBooks();