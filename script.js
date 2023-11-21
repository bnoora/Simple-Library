let bookIdCounter = 1;

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.read = false;
  this.id = bookIdCounter++;
}

const library = [];

function addBookToLibrary(book) {
  library.push(book);
}

function removeBookFromLibrary(bookId) {
    const index = library.findIndex(book => book.id === bookId);
    if (index !== -1) {
      library.splice(index, 1);
    }
  }
  

function toggleReadStatus(bookId) {
    const book = library.find(book => book.id === bookId);
    if (book) {
        book.read = !book.read;
    }
}

function addBook() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const year = document.getElementById('year').value.trim();
    if (title && author && year) {
        const book = new Book(title, author, year);
        addBookToLibrary(book);
        renderList(); // Re-render the book list
        addBookForm.reset(); // Clear the form
    } else {
        alert("Please fill in all fields.");
    }
}
function removeBook() {
    const bookElement = this.closest('.bookCard');
    const bookId = parseInt(bookElement.getAttribute('book-id'), 10);
    removeBookFromLibrary(bookId);
    bookElement.remove();
}

function toggleRead() {
    const bookElement = this.closest('.bookCard');
    const bookId = parseInt(bookElement.getAttribute('book-id'), 10);
    toggleReadStatus(bookId);
    const book = library.find(book => book.id === bookId);
    if (book && book.read) {
        this.innerText = 'Unread';
        this.classList.add('readbook');
    } else {
        this.innerText = 'Read';
        this.classList.remove('readbook');
    }
}

const button_div_html = `<div class="bookCard_btns">
                            <div class="right_btns">
                                <button class="edit_btn">Edit</button>
                                <button class="delete_btn">Delete</button>
                        </div>
                            <div class="left_btns">
                                <button class="read_btn">Read</button>
                            </div>
                        </div>`;

function renderList() {
    const booklist = document.querySelector('.booklist');


    booklist.innerHTML = '';
    library.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCard.setAttribute('book-id', book.id);
        bookCard.innerHTML = `
                            <h3>${book.title}</h3>
                            <h3>${book.author}</h3>
                            <h3>${book.year}</h3>
                            <button class="read_btn"">${book.read ? 'Unread' : 'Read'}</button>
                            <button class="delete_btn"">Delete</button>
        `;


        bookCard.querySelector('.delete_btn').addEventListener('click', removeBook);
        bookCard.querySelector('.read_btn').addEventListener('click', toggleRead);


        booklist.appendChild(bookCard);

    });
}


document.addEventListener('DOMContentLoaded', () => { 
    const addBookBtn = document.querySelector('#addbook_btn');
    const addBookForm = document.querySelector('#addBookForm');
    const submitBookBtn = document.querySelector('#submitBook');

    addBookBtn.addEventListener('click', () => {
        addBookForm.style.display = addBookForm.style.display === 'none' ? 'block' : 'none';
    });

    submitBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateForm()) {
            addBook();
            addBookForm.style.display = 'none';
            renderList();
        }
    });

    function validateForm() {
        const titleInput = document.querySelector('#title');
        const authorInput = document.querySelector('#author');
        const yearInput = document.querySelector('#year');

        if (titleInput.value.trim() === '' || authorInput.value.trim() === '' || yearInput.value.trim() === '') {
            alert('Please fill in all fields');
            return false;
        }
        return true;
    }

    renderList();
});