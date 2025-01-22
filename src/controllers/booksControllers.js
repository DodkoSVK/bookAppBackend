const booksModel = require('../models/booksModel');
const bookSchemas = require('../schemas/bookSchema');

const getBook = async (req, res) => {
    const { sortBy } = req.query;
    if(sortBy) {
        const { error } = bookSchemas.sortSchema.validate({ sortBy });
        if(error)
            return res.status(400).send({ message: error.details[0].message });
    }
    try {
        results = await booksModel.getAllBooks(sortBy);
        if(results.rows.length < 1) 
            return res.status(201).send({message: "V databaze sa nenachadzaju ziadne knihy."});
        
        console.log(`Results: ${results.rows}`);
        res.status(202).json(results.rows);
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }    
};

const getBookById = async (req, res) => {
    const { id } = req.params;
    console.log(`Book ID is ${id}`);
    try {
        const results = await booksModel.getBookById(id);
        if(results.rows.length < 1)
            return res.status(201).send({message: `V databaze sa nenachadza kniha s ID: ${id}.`});

        console.log(`Results: ${results.rows}`);
        res.status(202).json(results.rows);
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }    
};

const createBook = async (req, res) => {
    const { error } = bookSchemas.createBookSchema.validate(req.body);
    if(error)
        return res.status(400).send({ message: error.details[0].message});

    const { bookName, bookGenre, bookRating } = req.body;
    console.log(`Nazov knihy: ${bookName}, Zaner: ${bookGenre}, hodnotenie: ${bookRating}`);
    try {
        const results = await booksModel.createBook(bookName, bookGenre, bookRating);
        if (results.rows.length < 1)
            return res.status(500).send({message: "Nebolo mozne zapisat knihu do databazy"});

        console.log(`Results: ${JSON.stringify(results.rows)}`);
        return res.status(201).send({message: `Kniha vytvorena s ID: ${results.rows[0].id}`});

    } catch (e) {
        console.log(`We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }
};

const editBook = async (req, res) => {
    const { id } = req.params;
    console.log(`Book ID: ${id}`);

    const { error } = bookSchemas.patchBookSchema.validate(req.body);
    if(error)
        return res.status(400).send({ message: error.details[0].message});

    const { bookName, bookGenre, bookRating } = req.body;

    let fieldsToUpdate = [];
    let valuesToUpdate = [];

    if(bookName){
        fieldsToUpdate.push(`name = $${fieldsToUpdate.length+1}`);
        valuesToUpdate.push(bookName);
    }
    if(bookGenre){
        fieldsToUpdate.push(`genre = $${fieldsToUpdate.length+1}`);
        valuesToUpdate.push(bookGenre);
    }
    if(bookRating){
        fieldsToUpdate.push(`rating = $${fieldsToUpdate.length+1}`);
        valuesToUpdate.push(bookRating);
    }
    if(fieldsToUpdate < 1) 
        return res.status(400).send({message: "Musia byt definovane polia pre upravu."});
    
    try {
        valuesToUpdate.push(id);
        console.log(`Quera: UPDATE public.books SET ${fieldsToUpdate.join(', ')} WHERE id = $${fieldsToUpdate.length+1} RETURNING id;`);
        const results = await booksModel.patchBook(fieldsToUpdate, valuesToUpdate);
        if(results.rows.length < 1)
            return res.status(500).send({message: "Nebolo mozne upravit knihu v databazy"});

        console.log(`Results: ${JSON.stringify(results.rows)}`);
        return res.status(201).send({message: `Kniha s ID: ${results.rows[0].id} bola upravená`});

    } catch (e) {
        console.log(`We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }
};

const deleteBook = async(req, res) => {
    const { id } = req.params;
    console.log(`Book ID: ${id}`);
    try {
        const results = await booksModel.deleteBook(id);
        if(results.rows.length < 1)
            return res.status(500).send({message: "Nebolo mozne vymazat knihu v databazy"});

        console.log(`Results: ${JSON.stringify(results.rows)}`);
        return res.status(201).send({message: `Kniha s ID: ${results.rows[0].id} bola vymazaná`});
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        return res.status(500).send({message: "Neocakavana chyba na strane databazy."});
    }
};
module.exports = {getBook, getBookById, createBook, editBook, deleteBook};