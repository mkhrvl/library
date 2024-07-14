const myLibrary = [];

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(author, title, pages, isRead) {
    const bookEntry = new Book(author, title, pages, isRead);
    myLibrary.push(bookEntry);
}

function createBookEntry(book) {
    const bookshelf = document.querySelector('.bookshelf__container');

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book__container');

    const bookCover = document.createElement('img');
    bookCover.classList.add('book__cover');
    bookCover.setAttribute('src', `https://picsum.photos/seed/${book.title}/100/`);

    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book__details');

    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('book__title');
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book__author');
    bookAuthor.textContent = `by ${book.author}`;

    const bookPages = document.createElement('p');
    bookPages.classList.add('book__pages');
    bookPages.textContent = `${book.pages} pages`;

    const bookStatusContainer = document.createElement('div');
    bookStatusContainer.classList.add('book__status-container');
    bookStatusContainer.classList.add(book.isRead ? 'book__status-container--read' : 'book__status-container--unread');

    const bookStatus = document.createElement('p');
    bookStatus.classList.add('book__status');
    bookStatus.textContent = book.isRead ? 'Read' : 'Not Read';

    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookAuthor);
    bookDetails.appendChild(bookPages);
    bookDetails.appendChild(bookStatusContainer);
    bookStatusContainer.appendChild(bookStatus);
    bookContainer.appendChild(bookCover);
    bookContainer.appendChild(bookDetails);
    bookshelf.appendChild(bookContainer);
}

function displayAllBooksFromLibrary(library) {
    library.forEach((book) => {
        createBookEntry(book);
    });
}

const dialog = document.querySelector('.bookshelf__dialog');
const btnShowBookEntry = document.querySelector('.bookshelf__btn-add');
const btnCancelBookEntry = document.querySelector('.form__btn--cancel');

btnShowBookEntry.addEventListener('click', () => {
    dialog.showModal();
});

btnCancelBookEntry.addEventListener('click', () => {
    dialog.close();
});

addBookToLibrary('Author 1', 'Book Title 1', 120, true);
addBookToLibrary('Author 2', 'Book Title 2', 300, false);

displayAllBooksFromLibrary(myLibrary);
