class Book {
    constructor(author, title, pages, isRead) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.isRead = isRead;
    }
    get author() {
        return this._author;
    }
    set author(value) {
        this._author = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get pages() {
        return this._pages;
    }
    set pages(value) {
        this._pages = value;
    }
    get isRead() {
        return this._isRead;
    }
    set isRead(value) {
        this._isRead = value;
    }
    toggleReadStatus() {
        this._isRead ? (this._isRead = false) : (this._isRead = true);
    }
}

const bookshelf = (function () {
    const myLibrary = [];

    const getLibrary = () => myLibrary;

    const addBook = (author, title, pages, isRead) => {
        const bookEntry = new Book(author, title, pages, isRead);
        myLibrary.push(bookEntry);
    };

    const removeBook = (book) => {
        const index = book.dataset.id;
        myLibrary.splice(index, 1);
    };

    return {
        getLibrary,
        addBook,
        removeBook,
    };
})();

const displayController = (function () {
    const library = bookshelf;
    const bookshelfDiv = document.querySelector('.bookshelf__container');
    const dialog = document.querySelector('.bookshelf__dialog');
    const btnShowBookEntry = document.querySelector('.bookshelf__btn-add');
    const btnCancelBookEntry = document.querySelector('.form__btn--cancel');
    const form = document.querySelector('.dialog__form');

    const updateDisplay = () => {
        bookshelfDiv.textContent = '';

        const books = library.getLibrary();

        books.forEach((book) => {
            renderBook(books, book);
        });
    };

    const renderBook = (books, book) => {
        const bookContainerDiv = document.createElement('div');
        bookContainerDiv.classList.add('book__container');
        bookContainerDiv.setAttribute('data-id', `${books.indexOf(book)}`);

        const bookCoverImg = document.createElement('img');
        bookCoverImg.classList.add('book__cover');
        bookCoverImg.setAttribute('src', `https://picsum.photos/seed/${book.title}/100/`);

        const bookDetailsDiv = document.createElement('div');
        bookDetailsDiv.classList.add('book__details');

        const bookTitleH2 = document.createElement('h2');
        bookTitleH2.classList.add('book__title');
        bookTitleH2.textContent = book.title;

        const bookAuthorP = document.createElement('p');
        bookAuthorP.classList.add('book__author');
        bookAuthorP.textContent = `by ${book.author}`;

        const bookPagesP = document.createElement('p');
        bookPagesP.classList.add('book__pages');
        bookPagesP.textContent = `${book.pages} pages`;

        const bookStatusBtn = document.createElement('button');
        bookStatusBtn.setAttribute('type', 'button');
        bookStatusBtn.classList.add('book__status');
        bookStatusBtn.classList.add(book.isRead ? 'book__status--read' : 'book__status');
        bookStatusBtn.textContent = book.isRead ? 'Read' : 'Not Read';

        const bookStatusClickHandler = () => {
            book.toggleReadStatus();
            bookStatusBtn.classList.toggle('book__status--read');
            bookStatusBtn.textContent = book.isRead ? 'Read' : 'Not Read';
        };

        bookStatusBtn.addEventListener('click', () => bookStatusClickHandler);

        const btnRemove = document.createElement('button');
        btnRemove.setAttribute('type', 'button');
        btnRemove.classList.add('book__btn-remove');
        btnRemove.textContent = 'Remove';

        const removeClickHandler = (e) => {
            const bookToDelete = e.target.parentNode.parentNode;
            library.removeBook(bookToDelete);
            bookshelfDiv.removeChild(bookToDelete);
            updateDisplay();
        };

        btnRemove.addEventListener('click', removeClickHandler);

        bookDetailsDiv.appendChild(bookTitleH2);
        bookDetailsDiv.appendChild(bookAuthorP);
        bookDetailsDiv.appendChild(bookPagesP);
        bookDetailsDiv.appendChild(bookStatusBtn);
        bookDetailsDiv.appendChild(btnRemove);
        bookContainerDiv.appendChild(bookCoverImg);
        bookContainerDiv.appendChild(bookDetailsDiv);
        bookshelfDiv.appendChild(bookContainerDiv);
    };

    const showBookClickHandler = () => {
        dialog.showModal();
    };

    btnShowBookEntry.addEventListener('click', showBookClickHandler);

    const cancelBookClickHandler = () => {
        dialog.close();
    };

    btnCancelBookEntry.addEventListener('click', cancelBookClickHandler);

    function submitBookEntry() {
        const bookTitleInput = document.querySelector('#book-title');
        const bookAuthorInput = document.querySelector('#book-author');
        const bookPagesInput = document.querySelector('#book-pages');
        const bookStatusInput = document.querySelector('#book-read');

        const title = bookTitleInput.value;
        const author = bookAuthorInput.value;
        const pages = bookPagesInput.value;
        const status = bookStatusInput.checked;

        library.addBook(author, title, pages, status);

        form.reset();
        updateDisplay();
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        submitBookEntry();
        updateDisplay();
        dialog.close();
    };

    form.addEventListener('submit', formSubmitHandler);

    library.addBook('Author 1', 'Book Title 1', '100', true);
    library.addBook('Author 2', 'Book Title 2', '200', false);
    library.addBook('Author 3', 'Book Title 3', '300', false);
    library.addBook('Author 4', 'Book Title 4', '400', true);
    library.addBook('Author 5', 'Book Title 5', '500', true);
    library.addBook('Author 6', 'Book Title 6', '600', true);

    updateDisplay();
})();
