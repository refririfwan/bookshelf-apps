const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";

function makeBook(title, author, year, isComplete) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Penulis : " + author;

  const textYear = document.createElement("p");
  textYear.innerText = "Tahun : " + year;

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
  article.append(textTitle, textAuthor, textYear, action);

  return article;
}

function completeButton() {
  return createButton("green", "Selesai dibaca", function (event) {

  });
}

function uncompleteButton() {
  return createButton("green", "Belum selesai dibaca", function (event) {

  });
}

function trashButton() {
  return createButton("red", "Hapus buku", function (event) {

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
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const checkIsComplete = document.getElementById("inputBookIsComplete");

  let isComplete = false;

  if (checkIsComplete.checked == true) {
    isComplete = true;
    for (let i = 0; i < 10; i++) {
      const book = makeBook(title, author, year, isComplete);
      completedBookList.append(book);
    }
  } else {
    isComplete = false;
    for (let i = 0; i < 10; i++) {
      const book = makeBook(title, author, year, isComplete);
      uncompletedBookList.append(book);
    }
  }
}