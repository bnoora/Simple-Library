function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.read = false;
}

const library = [];

function addBookToLibrary(book) {
  library.push(book);
}

function removeBookFromLibrary(book) {
  const index = library.indexOf(book);
  library.splice(index, 1);
}

function toggleReadStatus(book) {
  book.read = !book.read;
}

function render() {
  const container = document.querySelector('.container');
  const

}
