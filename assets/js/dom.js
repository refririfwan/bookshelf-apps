function addBook() {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const checkIsComplete = document.getElementById("inputBookIsComplete");
  let isComplete = false;
  if (checkIsComplete.checked == true) {
    isComplete = true;
  }
  console.log(title, author, year, isComplete);
}