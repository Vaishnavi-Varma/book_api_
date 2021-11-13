const express=require("express");
//Database
const database=require("./databas")
//Initialization
const booky=express();
//configuration
booky.use(express.json());

/*
Route -  /book
Description - get all books
Access-public
Parameter-none
Methods-get
*/
booky.get ("/book",(req,res)=>{
    return res.json({"book":database.books})
})

/*
Route -  /book/is
Description - get specific  book based on ISBN
Access-public
Parameter-isbn
Methods-get
*/

booky.get("/book/is/:isbn",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=> book.ISBN===req.params.isbn)
    if (getSpecificBook.length===0)
    {
    return res.json({error:`No Book found for the ISBN of ${req.params.isbn}`
    })
}
    
    return res.json({books:getSpecificBook})
    
})
/*
Route -  /book/c
Description - get specific  book based on Category
Access-public
Parameter-category
Methods-get
*/
booky.get("/book/c/:category",(req,res)=>{
     const getSpecificBook=database.books.filter((book)=>book.category.includes(req.params.category))
     if (getSpecificBook.length===0)
    {
    return res.json({error:`No Book found for the category of ${req.params.category}`
    })
}
    
    return res.json({books:getSpecificBook})
    
})
/*
Route -  /lang
Description - get specific  book based on language
Access-public
Parameter-language
Methods-get
*/

booky.get("/book/lang/:language",(req,res)=>{
    const getSpecificBook=database.books.filter((book)=>book.language===req.params.language)
    if (getSpecificBook.length===0)
   {
   return res.json({error:`No Book found for the language of ${req.params.language}`
   })
}
   
   return res.json({books:getSpecificBook})
   
})

/*
Route -  /author
Description - get all the authors
Access-public
Parameter-none
Methods-get
*/

booky.get("/authors",(req,res)=>{
    
    return res.json({"authors":database.author})
    
})

/*
Route -  /authors
Description - get specific  author based on id
Access-public
Parameter-id
Methods-get
*/
booky.get("/authors/:id",(req,res)=>{
const getSpecificAuthor=database.author.filter((author)=>author.id===parseInt(req.params.id))


if (getSpecificAuthor.length===0)
   {
   return res.json({error:`No Author found for the id of ${req.params.id}`
   })
}
   
   return res.json({Authors:getSpecificAuthor})
   
})
/*
Route -  /authors/book
Description - get all authors based on book
Access-public
Parameter-isbn
Methods-get
*/
booky.get("/authors/book/:isbn",(req,res)=>{
    const getSpecificAuthor=database.author.filter((author)=>author.books.includes(req.params.isbn))

    if (getSpecificAuthor.length===0)
   {
   return res.json({error:`No Author found for the Book ISBN of ${req.params.isbn}`
   })
}
   
   return res.json({Authors:getSpecificAuthor})
})   

/*
Route -  /publications
Description - get all Publications
Access-public
Parameter-none
Methods-get
*/
booky.get("/publications",(req,res)=>{
    
    return res.json({"publications":database.publication})
    
})
/*
Route -  /publications
Description - get a specific Publications
Access-public
Parameter-id
Methods-get
*/
booky.get("/publications/:id",(req,res)=>
{
    const getSpecificPublications=database.publication.filter((publication)=>publication.id===parseInt(req.params.id))
    if (getSpecificPublications.length===0)
    {
    return res.json({error:`No Publications found for the id of ${req.params.id}`
    })
 }
    
    return res.json({Authors:getSpecificPublications})
})
/*
Route -  /publications/book
Description - get a list of Publications based on book
Access-public
Parameter-isbn
Methods-get
*/
booky.get("/publications/book/:isbn",(req,res)=>{
const getSpecificPublications=database.publication.filter((publication)=>publication.books.includes(req.params.isbn))

if (getSpecificPublications.length===0)
    {
    return res.json({error:`No Publications found for the ISBN of ${req.params.isbn}`
    })
 }
    
    return res.json({Authors:getSpecificPublications})



})

/**********post*********/

/*
Route -  /book/add
Description - Add new book
Access-public
Parameter-none
Methods-post
*/
booky.post("/book/add",(req,res)=>{
const {newBook}=req.body
database.books.push(newBook);
return res.json({books:database.books})
})
/*
Route -  /author/add
Description - Add new author
Access-public
Parameter-none
Methods-post
*/
booky.post("/author/add",(req,res)=>{
    const {newAuthor}=req.body
database.author.push(newAuthor);
return res.json({auhtor:database.author})
})
/*
Route -  /publication/add
Description - Add new publication
Access-public
Parameter-none
Methods-post
*/
booky.post("/publication/add",(req,res)=>{
    const {newPublication}=req.body
database.publication.push(newPublication);
return res.json({auhtor:database.publication})
})

/**********put*********/
/*
Route -  /book/update/title/:isbn
Description - update book titile
Access-public
Parameter-none
Methods-put
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title=req.body.newBookTitle;
           return 
        }
    });
    return res.json({book:database.books})
})
/*
Route -  /book/update/author
Description - update/add new author for a book
Access-public
Parameter-isbn
Methods-put
*/
booky.put("/book/update/author/:isbn/:authoID",(req,res)=>{
    //update thee book database
    database.books.forEach((book)=>{
        if (book.ISBN===req.params.isbn){
            return book.author.push(parseInt(req.params.authoID))
        }
        
        })

        //update author database
        database.author.forEach((author)=>{
            if (author.id===parseInt(req.params.authoID)){
                return author.books.push(req.params.isbn)
            }
    })

    return res.json({books:database.books,auhtor:database.author,message:"New author was added"})
})
/*
Route -  /author/update/name
Description - Update Author name using it's id 
Access-public
Parameter-id
Methods-put
*/
booky.put("/author/update/name/:id",(req,res)=>{
    database.author.forEach((author) => {
        if(author.id=== parseInt(req.params.id)){
            author.name=req.body.newAuthorName;
           return 
        }
    });
    return res.json({author:database.author})
})
/*
Route -  /publication/update/name
Description - Update publication name using it's id 
Access-public
Parameter-id
Methods-put
*/
booky.put("/publication/update/name/:id",(req,res)=>{
    database.publication.forEach((publication) => {
        if(publication.id=== parseInt(req.params.id)){
            publication.name=req.body.newPublicationName;
           return 
        }
    });
    return res.json({publication:database.publication})
})
/*
Route -  /publication/update/book
Description - Update publication name using it's id 
Access-public
Parameter-isbn
Methods-put
*/
booky.put("/publication/update/book/:isbn",(req,res)=>{
//update the publication database
database.publication.forEach((publication)=>{
    if(publication.id===req.body.pubID){
       return publication.books.push(req.params.isbn)
    }
})
// update the book database
database.books.forEach((book)=>{
    if(book.ISBN===req.params.isbn){
        return book.publications.push(req.body.pubID)
        
    }
})
return res.json({books:database.books,
    publications:database.publication,
    message:"Successfully updated publications"
})
})
/*********Delete************/
/*
Route -  /book/delete
Description - Delete a book
Access-public
Parameter-isbn
Methods-DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
    const updateBookDatabase=database.books.filter((book)=>book.ISBN!==req.params.isbn)
    database.books=updateBookDatabase
    return res.json({books:database.books})
})

/*
Route -  /book/delete/author
Description - Delete a book from author
Access-public
Parameter-isbn,authorID
Methods-DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorID",(req,res)=>{
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const newAuthorList=book.authors.filter((author)=>author!==parseInt(req.params.authorID))
            
            book.authors=newAuthorList
            return;
        }
    })

    //update the author database

    database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.authorID)){
            const newBooksList=author.books.filter((book)=> book!==req.params.isbn)
            author.books=newBooksList
            return;
        }  
 })

return res.json({books:database.books,author:database.author,message:"author was deleted!!!!"})
})

/*
Route -  /author/delete
Description - Delete a author
Access-public
Parameter-id
Methods-DELETE
*/
booky.delete("/author/delete/:id",(req,res)=>{
    const updateAuthorDatabase=database.author.filter((author)=>author.id!==parseInt(req.params.id))
    database.author=updateAuthorDatabase;
    return res.json ({authors:database.author})
})
/*
Route -  /publication/delete
Description - Delete a publication
Access-public
Parameter-id
Methods-DELETE
*/
booky.delete("/publication/delete/:id",(req,res)=>{
    const updatePublicationDatabase=database.publication.filter((publication)=>publication.id!==parseInt(req.params.id))
    database.publication=updatePublicationDatabase;
    return res.json ({publications:database.publication})
})
/*
Route -  /publication/delete/book
Description - Delete a book from publication
Access-public
Parameter-pub_id,isbn
Methods-DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pub_id",(req,res)=>{
    //update publication database
    database.publication.forEach((publication)=>{
        if (publication.id===parseInt(req.params.pub_id)){
            const newBooksList=publication.books.filter((book)=>book!==req.params.isbn)
            publication.books=newBooksList
            return;
        }

    })
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
                const newPublicationsList=book.publications.filter((publication)=>publication!==parseInt(req.params.pub_id))
                book.publications=newPublicationsList
                return;
        }
    })
    return res.json({books:database.books,publications:database.publication})
})
booky.listen(3000,()=>{console.log("hey Server is running ")})

