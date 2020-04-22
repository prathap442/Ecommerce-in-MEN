const Book = function(){

}

const bookData = [
  {
    "name": "The Sherlock Holmes",
    "author": "Arthur Canon Doyle",
    "id": 12 
  },
  {
    "name": "Wings of Fire",
    "author": "APJ Abdul kalam",
    "id": 23  
  }   
];

Book.findAll = function(){
  return bookData;
}

Book.findOneById = function(id){
   bookData.find((book)=>{
     if(book.id == id){
       return book
     }
   })   
}

module.exports = {
  Book: Book
}
