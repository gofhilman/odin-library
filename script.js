function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createTableHeader() {
    if (myLibrary == []) {
        const headerRow = document.createElement("tr");
        const columnHeaders = ["Title", "Author", "Number of Pages", "Read", "Action"];
        columnHeaders.forEach(columnHeader => {
            const header = document.createElement("th");
            header.textContent = columnHeader;
            headerRow.appendChild(header);
        });
        tableHeader.appendChild(headerRow);
    }
}

function displayBooks() {
    createTableHeader();
    myLibrary.forEach(book => {
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
        const checkbox = document.createElement("input[type='checkbox']");
        if (book.read) checkbox.checked = true;
        cell.appendChild(checkbox);
        bodyRow.appendChild(cell);
        // Display a button to remove the book
        cell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = 'remove';
        cell.appendChild(removeButton);
        bodyRow.appendChild(cell);
        removeButton.addEventListener('click',() => tableBody.removeChild(bodyRow));
    });
}

const myLibrary = [];
const tableHeader = document.querySelector("thead");
const tableBody = document.querySelector("tbody");