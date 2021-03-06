const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "bookId";

function makeBook(title, author, year, isComplete) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.classList.add("year");
  bookYear.innerText = year;

  const action = document.createElement("div");
  action.classList.add("action");

  if (isComplete) {
    action.append(uncompleteButton());
  } else {
    action.append(completeButton());
  }

  action.append(trashButton());

  const article = document.createElement("article");
  article.classList.add("book_item");
  article.append(bookTitle, bookAuthor, bookYear, action);

  return article;
}

function completeButton() {
  return createButton("green", "Selesai dibaca", function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });
}

function uncompleteButton() {
  return createButton("green", "Belum selesai dibaca", function (event) {
    addBookToUncompleted(event.target.parentElement.parentElement);
  });
}

function trashButton() {
  return createButton("red", "Hapus buku", function (event) {
    removeBook(event.target.parentElement.parentElement);
  });
}

function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = buttonText;
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function addBook() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const title = document.getElementById("inputBookTitle").value;
  const author = "Penulis : " + document.getElementById("inputBookAuthor").value;
  const year = "Tahun : " + document.getElementById("inputBookYear").value;
  const checkIsComplete = document.getElementById("inputBookIsComplete");

  let isComplete = false;

  if (checkIsComplete.checked == true) {
    isComplete = true;
    const book = makeBook(title, author, year, isComplete);

    const bookObject = composeBookObject(title, author, year, isComplete);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    completedBookList.append(book);
    updateDataToStorage();
  } else {
    isComplete = false;
    const book = makeBook(title, author, year, isComplete);

    const bookObject = composeBookObject(title, author, year, isComplete);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    uncompletedBookList.append(book);
    updateDataToStorage();
  }
}

function addBookToCompleted(bookElement) {
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthor = bookElement.querySelector(".book_item > p").innerText;
  const bookYear = bookElement.querySelector(".book_item > .year").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = true;
  newBook[BOOK_ITEMID] = book.id;

  listCompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function addBookToUncompleted(bookElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuthor = bookElement.querySelector(".book_item > p").innerText;
  const bookYear = bookElement.querySelector(".book_item > .year").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function removeBook(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(book.title, book.author, book.year, book.isComplete);
    newBook[BOOK_ITEMID] = book.id;

    if (book.isComplete) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}