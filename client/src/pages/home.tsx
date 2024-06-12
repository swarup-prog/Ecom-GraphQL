import { AddAuthorDialog } from "@/components/product/AddAuthorDialog";
import { AuthorTable } from "@/components/product/AuthorTable";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/graphql", {
        query: `
        query GetAuthors {
          getAuthors {
            id
            name
          }
        }
        `,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuthors(data.data.getAuthors);
      console.log(authors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="m-2 mx-52">
      <section className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">Authors</h1>
        <span className="flex justify-end">
          <AddAuthorDialog />
        </span>
        <AuthorTable authors={authors} />
      </section>
    </div>
  );
};

export default Home;
