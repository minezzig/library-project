

function findAuthorById(authors, id) {
  const foundAuthor = authors.find((author) => {    // look in authors: if author's ID matches given ID, return author object
    return author.id === id;                         
  });  
  return foundAuthor;
}




function findBookById(books, id) {             // look in books.  if that books ID matches given ID, return current book object
  const foundBook = books.find((book) => {
    return book.id === id 
  });
  return foundBook;
}




function partitionBooksByBorrowedStatus(books) {         
  const unavailable = books.filter((book) => {           //extract from books to new array name unavailable
    if (!book.borrows[0].returned) {                     //recent book in borrows is not returned
      return book;                                       //this book is put in unavailable array
    }
  });
  const available = books.filter((book) => {            //extract from books to new array named available
    if (book.borrows[0].returned) {                     //if recent book in books is returned
      return book;                                      //book is placed in available array
    }
  });

  const partitionedBooks = [unavailable, available];    //new variable is array with two values, unavailable and available
  return partitionedBooks;
}




/*
It should return an array of ten or fewer account objects that represents the accounts given by the IDs in the provided book's 
`borrows` array. However, each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.
*/
function getBorrowersForBook(book, accounts) {
  // this will make a list of the IDs of peopel who have borrowed this particular book
  const bookBorrows = book.borrows;
  const borrowersForBook = [];
  bookBorrows.forEach((borrower) => {
    // goes through each id who has borrowed the book
    let accountWhoBorrowed = accounts.find(
      (account) => account.id === borrower.id
    ); // looks for an account # that matches - puts that person's account in a variable
    accountWhoBorrowed["returned"] = borrower.returned; // adds a key-value pair to that person.  "returned: (whatever was stored in original borrower")
    borrowersForBook.push(accountWhoBorrowed); // pushes the edited account to a new array
  });
  return borrowersForBook.slice(0, 10); //limits this new array to only 10 accounts
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
