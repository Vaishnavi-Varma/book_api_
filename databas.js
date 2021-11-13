let books = [
    {
      ISBN: "12345Book",
      title: "Getting started with MERN",
      pubDate: "2021-07-07",
      language: "en",
      numPage: 250,
      authors: [1, 2],
      publications: [1],
      category: ["tech", "programming", "education", "thriller"],
    },
    {
      ISBN: "12345Book2",
      title: "Getting started with MERN",
      pubDate: "2021-07-07",
      language: "en",
      numPage: 250,
      authors: [1, 2],
      publications: [1],
      category: ["tech", "programming", "education", "thriller"],
    },
  ];
  
  let author = [
    {
      id: 1,
      name: "Pavan",
      books: ["12345Book", "1234566789Secret"],
    },
    { id: 2, name: "Elon Musk", books: ["12345Book"] },
    {
      id: 3,
      name: "Kushagra",
      books: [],
    },
  ];
  
  let publication = [
    {
      id: 1,
      name: "writex",
      books: ["12345Book"],
    },
    {
      id: 2,
      name: "Kushagra",
      books: [],
    },
  ];
  
  module.exports = { books, author, publication };