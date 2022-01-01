// find length of books
function getTotalBooksCount(books) {
  return books.length;
}

//find length of accounts
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  for (let book in books) {
    if (!books[book].borrows[0].returned) total++; // if the most recent book borrowed isn't returned, add to count
  }
  return total;
}

/*
It returns an array containing five objects or fewer that represents the most common occurring genres, ordered 
from most common to least.
[ {name: horror, count: 5}, {}, {}, {}, {}]
Each object in the returned array has two keys:
- The `name` key which represents the name of the genre.
- The `count` key which represents the number of times the genre occurs.
*/

function getMostCommonGenres(books) {
  let genres = books.reduce((newObj, book) => {
    //makes an array of genres
    if (!newObj[book.genre]) {
      // if that book's genre isn't present,
      newObj[book.genre] = { name: book.genre, count: 1 }; //that genre is added as key with value of an object name: that genre, count 1.   [  horror: {name: horror, count: 1}    ]
    } else {
      // if it is already in array
      newObj[book.genre].count++; // the count of that genre increases by one.
    }
    return newObj;
  }, {});

  let mostCommonGenres = Object.keys(genres) //  looks at keys
    .map((genre) => genres[genre]) // for each one, it crates new array with just the values - [ {name: horror, count: 1} ]
    .sort((genreA, genreB) => genreB.count - genreA.count) //  puts them in order from most to least
    .slice(0, 5); // limits to only 5 in array

  return mostCommonGenres;
}

/*
It returns an array containing five objects or fewer that represents the most popular books in the library. Popularity is represented by the number of times a book has been borrowed.
Each object in the returned array has two keys:
- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.
 [
    { name: "incididunt nostrud minim", count: 30 },
    { name: "culpa do sint", count: 30 },
    { name: "ullamco est minim", count: 29 },
    ...
  ]
*/
function getMostPopularBooks(books) {
  const bookBorrows = {}; // create empty object
  for (let book in books) {
    bookBorrows[books[book].title] = books[book].borrows.length; // title of each book: length of borrows from each book
  }

  const mostPopularBooks = Object.keys(bookBorrows) //use keys from object to make array
    .sort((bookA, bookB) => bookBorrows[bookB] - bookBorrows[bookA]) // put them in order high to low
    .slice(0, 5) // only 5 in the array
    .map((book) => {
      return { name: book, count: bookBorrows[book] }; // create new objects in array for each item
    });

  return mostPopularBooks;
}

/*
It returns an array containing five objects or fewer that represents the most popular authors whose 
books have been checked out the most. Popularity is represented by finding all of the books written 
by the author and then adding up the number of times those books have been borrowed.
[
    { name: "Cristina Buchanan", count: 112 },
    { name: "Tami Hurst", count: 83 },
    { name: "Chrystal Lester", count: 80 },
    ...
  ]
*/
function getMostPopularAuthors(books, authors) {
  const booksByAuthor = {}; //create empty object

  for (let book in books) {
    //loop through each book - called books[book]
    const currentAuthor = authors.find(
      //look in authors.  return the author whose id matches current books' authorID
      (author) => author.id === books[book].authorId
    );

    const {
      //extract "first" and "last" from the current Author
      name: { first, last },
    } = currentAuthor;

    if (!booksByAuthor[`${first} ${last}`]) {
      // if booksByAuthor doesn't contain the full author name
      booksByAuthor[`${first} ${last}`] = books[book].borrows.length; //that becomes the key and its value is the number of borrows of that book
    } else {
      booksByAuthor[`${first} ${last}`] += books[book].borrows.length; // if the author is already in list, it will add the length of books borrows to that which is already there
    }
  }

  const result = helperFuctionToFormat(booksByAuthor);

  return result;
}

function helperFuctionToFormat(booksByAuthor) {
  const result = Object.keys(booksByAuthor) // use keys so we can use key functions
    .sort((authorA, authorB) => booksByAuthor[authorB] - booksByAuthor[authorA]) // sorts from high to low
    .slice(0, 5) // only 5 in array
    .map((author) => {                            // formats each to an obj
      return { name: author, count: booksByAuthor[author] };
    });
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
