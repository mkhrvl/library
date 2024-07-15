const myLibrary = [];

function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
    if (this.isRead) {
        this.isRead = false;
    } else {
        this.isRead = true;
    }
};

function addBookToLibrary(author, title, pages, isRead) {
    const bookEntry = new Book(author, title, pages, isRead);
    myLibrary.push(bookEntry);
}

const bookshelf = document.querySelector('.bookshelf__container');

function removeBookEntry(book) {
    const index = book.dataset.id;
    myLibrary.splice(index, 1);
    bookshelf.removeChild(book);
}

function createBookEntry(book) {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book__container');
    bookContainer.setAttribute('data-id', `${myLibrary.indexOf(book)}`);

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

    const bookStatus = document.createElement('button');
    bookStatus.setAttribute('type', 'button');
    bookStatus.classList.add('book__status');
    bookStatus.classList.add(book.isRead ? 'book__status--read' : 'book__status');
    bookStatus.textContent = book.isRead ? 'Read' : 'Not Read';

    bookStatus.addEventListener('click', () => {
        book.toggleReadStatus();
        bookStatus.classList.toggle('book__status--read');
        bookStatus.textContent = book.isRead ? 'Read' : 'Not Read';
    });

    const btnRemove = document.createElement('button');
    btnRemove.setAttribute('type', 'button');
    btnRemove.classList.add('book__btn-remove');
    btnRemove.textContent = 'Remove';

    btnRemove.addEventListener('click', (e) => {
        const bookToDelete = e.target.parentNode.parentNode;
        removeBookEntry(bookToDelete);
        refreshBookShelfDisplay();
    });

    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookAuthor);
    bookDetails.appendChild(bookPages);
    bookDetails.appendChild(bookStatus);
    bookDetails.appendChild(btnRemove);
    bookContainer.appendChild(bookCover);
    bookContainer.appendChild(bookDetails);
    bookshelf.appendChild(bookContainer);
}

function displayAllBooksFromLibrary() {
    myLibrary.forEach((book) => {
        createBookEntry(book);
    });
}

function refreshBookShelfDisplay() {
    const bookshelf = document.querySelector('.bookshelf__container');
    bookshelf.replaceChildren('');
    displayAllBooksFromLibrary();
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

function submitBookEntry() {
    const bookTitleInput = document.querySelector('#book-title');
    const bookAuthorInput = document.querySelector('#book-author');
    const bookPagesInput = document.querySelector('#book-pages');
    const bookStatusInput = document.querySelector('#book-read');

    const title = bookTitleInput.value;
    const author = bookAuthorInput.value;
    const pages = bookPagesInput.value;
    const status = bookStatusInput.checked;

    addBookToLibrary(author, title, pages, status);
}

const form = document.querySelector('.dialog__form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBookEntry();
    refreshBookShelfDisplay();
    dialog.close();
});

addBookToLibrary('Author 1', 'Book Title 1', '100', true);
addBookToLibrary('Author 2', 'Book Title 2', '200', false);

displayAllBooksFromLibrary();
