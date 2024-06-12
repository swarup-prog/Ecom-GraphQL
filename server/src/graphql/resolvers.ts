import { v4 as uuidv4 } from "uuid";
import { Book, Author } from "../models";
import path from "path";
import fs from "fs";

interface IBookInput {
  input: {
    title: string;
    author: string;
    pages: number;
    genre: string;
    price: number;
  };
}

interface IAuthorInput {
  input: {
    name: string;
  };
}

interface IDelete {
  id: string;
}

interface IUpdateBookInput {
  id: string;
  input: IBookInput;
}

interface IUpdateAuthorInput {
  id: string;
  input: IAuthorInput;
}

const resolvers = {
  UploadL GraphQLUp
  Query: {
    // hello: () => "Hello world!",

    getBook: async ({ id }: { id: string }) => {
      try {
        const book = await Book.findByPk(id);
        return book;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching book");
      }
    },

    getAuthor: async ({ id }: { id: string }) => {
      try {
        const author = await Author.findByPk(id);
        return author;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching author");
      }
    },

    getBooks: async () => {
      try {
        const books = await Book.findAll();
        return books;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching books");
      }
    },

    getAuthors: async () => {
      try {
        const authors = await Author.findAll();
        return authors;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching authors");
      }
    },
  },
  Mutation: {
    // uploadFile: async (parent: any, { file }: any) => {
    //   const { createReadStream, filename, mimetype, encoding } = await file;

    //   // const stream = createReadStream();
    //   // const pathName = path.join(__dirname, `../../public/images/${filename}`);
    // },

    createBook: async (parent: any, args: IBookInput) => {
      console.log(args.input);
      const { title, author, pages, genre, price } = args.input;
      try {
        const book = await Book.create({
          id: uuidv4(),
          title,
          author,
          pages,
          genre,
          price,
        });
        return book;
      } catch (error) {
        console.error(error);
        throw new Error("Error creating book");
      }
    },

    createAuthor: async (parent: any, args: IAuthorInput) => {
      const { name } = args.input;

      try {
        const author = await Author.create({
          id: uuidv4(),
          name,
        });
        return author;
      } catch (error) {
        console.error(error);
        throw new Error("Error creating author");
      }
    },

    deleteAuthor: async (parent: any, args: IDelete) => {
      try {
        const { id } = args;
        const author = await Author.findByPk(id);
        // check if there is any book associated with the author
        const books = await Book.findAll({
          where: {
            author: id,
          },
        });

        if (books.length > 0) {
          throw new Error("Author has books associated with it");
        }

        await author?.destroy();
        return author;
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting author");
      }
    },

    deleteBook: async (parent: any, args: IDelete) => {
      try {
        const { id } = args;
        const book = await Book.findByPk(id);
        await book?.destroy();
        return book;
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting book");
      }
    },

    updateBook: async (parent: any, args: IUpdateBookInput) => {
      try {
        const { id, input } = args;
        const book = await Book.findByPk(id);
        await book?.update({ ...input });
        return book;
      } catch (error) {
        console.error(error);
        throw new Error("Error updating book");
      }
    },

    updateAuthor: async (parent: any, args: IUpdateAuthorInput) => {
      try {
        const { id, input } = args;
        const author = await Author.findByPk(id);
        await author?.update({ ...input });
        return author;
      } catch (error) {
        console.error(error);
        throw new Error("Error updating author");
      }
    },
  },
};

export default resolvers;
