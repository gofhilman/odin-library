class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    addBookToLibrary() {
        myLibrary.push(this);
    }
    resetValues() {
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = null;
        bookRead.checked = false;
    }
    static #createTableHeader() {
        if (myLibrary.length == 1) {
            const headerRow = document.createElement("tr");
            const columnHeaders = ["Title", "Author", "Pages", "Read", "Action"];
            columnHeaders.forEach(columnHeader => {
                const header = document.createElement("th");
                header.textContent = columnHeader;
                headerRow.appendChild(header);
            });
            tableHeader.appendChild(headerRow);
        }
    }
    static displayBooks() {
        Book.#createTableHeader();
        let book = myLibrary[myLibrary.length-1];
    
        // Display the book title, author, and page number
        const bodyRow = document.createElement("tr");
        const bookData = [book.title, book.author, book.pages];
        bookData.forEach(bookInfo => {
                const cell = document.createElement("td");
                cell.textContent = bookInfo;
                bodyRow.appendChild(cell);
        });
    
        // Display a tickbox for the book read
        let cell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        if (book.read) checkbox.checked = true;
        cell.appendChild(checkbox);
        bodyRow.appendChild(cell);
    
        // Display a button to remove the book
        cell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = 'remove';
        cell.appendChild(removeButton);
        bodyRow.appendChild(cell);
        tableBody.appendChild(bodyRow);
        removeButton.addEventListener('click',() => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            tableBody.removeChild(bodyRow);
            if (myLibrary.length == 0) tableHeader.replaceChildren();
        });
    }
}

const myLibrary = [];
const tableHeader = document.querySelector("thead");
const tableBody = document.querySelector("tbody");
const addBook = document.querySelector("#add-book");

const bookDialog = document.querySelector("dialog");
const bookTitle = bookDialog.querySelector("#book-title");
const bookAuthor = bookDialog.querySelector("#book-author");
const bookPages = bookDialog.querySelector("#book-pages");
const bookRead = bookDialog.querySelector('#book-read');
const confirmData = bookDialog.querySelector("#confirm");

addBook.addEventListener('click', () => {
    bookDialog.showModal();
});

confirmData.addEventListener('click', (event) => {
    event.preventDefault();
    bookDialog.close(); 
    let book = new Book(bookTitle.value , bookAuthor.value, bookPages.value, bookRead.checked);
    book.addBookToLibrary();
    Book.displayBooks();
    book.resetValues();
})