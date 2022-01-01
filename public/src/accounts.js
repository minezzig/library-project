function findAccountById(accounts, id) {
  let foundAccount = accounts.find((account) => account.id === id); // look in accounts.  return account objcet if its' id matches given id
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((accountA, accountB) => {
    return accountA.name.last < accountB.name.last ? -1 : 1;
  });
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let book in books) {         //for each book, look through its borrows list for matching account ID, add to counter
    if (books[book].borrows.find((borrowers) => borrowers.id === account.id)) {
      total++;
    }
  }
  return total;
}

/*
It returns an array of book objects, including author information, that represents all books _currently checked out_ 
by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
*/
// search all book for matching ID number.  if that specific book is also returned === false.
// return an array with the book object
function getBooksPossessedByAccount(account, books, authors) {
  let booksTaken = [];
  books.forEach((book) => {                     //do this for every book
    if (
      book.borrows.find(
        (borrower) => borrower.id === account.id && !borrower.returned      // if the borrows list of book has the id of the account given, and returned is false
      )
    )
      booksTaken.push(book);                                                // add that particular book to the bookstaken array
  });

  booksTaken.forEach((book) => {              
    let authorMatch = authors.find((author) => author.id === book.authorId);  //look through authors to find name of matching ID
    book["author"] = authorMatch;                                             // add "author": author object to each book in booksTaken
  });
  return booksTaken;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
