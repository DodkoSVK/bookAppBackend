const { pool } = require('../../config/database');

const getAllBooks = async (sortBy) => {
    try {
        let query = 'SELECT * FROM public.books';
        if(sortBy)
            query += ` ORDER BY ${sortBy}`;
        const results = await pool.query(query);
        return results;
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
};

const getBookById = async (id) => {
    try {
        const results = await pool.query('SELECT * FROM public.books WHERE id = $1' , [id]);
        return results;
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
};

const createBook = async (bookName, bookGenre, bookRating) => {
    try {
        const results = await pool.query('INSERT INTO public.books (name, genre, rating) VALUES ($1, $2, $3) RETURNING id;', [bookName, bookGenre, bookRating]);
        return results;
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
};

const patchBook = async (fieldsToUpdate, valuesToUpdate ) => {
    try {
        const results = await pool.query(`UPDATE public.books SET ${fieldsToUpdate.join(', ')} WHERE id = $${fieldsToUpdate.length+1} RETURNING id;`, valuesToUpdate);
        return results;
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
};

const deleteBook = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM public.books WHERE id = $1 RETURNING id;` , [id]);
        return results;
    } catch (e) {
        console.log(`We got a problem: ${e}`);
        throw e;
    }
};

module.exports = {getAllBooks, getBookById, createBook, patchBook, deleteBook};