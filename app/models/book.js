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
  let filteredData = bookData.find((book)=>{
    if(book.id == id){
      return book 
    } 
  })
  return filteredData;   
}

module.exports = {
  Book: Book
}
