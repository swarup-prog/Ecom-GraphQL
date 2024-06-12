import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import axios from "axios";

interface IAuthor {
  id: string;
  name: string;
}
interface IAuthorTableProps {
  authors: IAuthor[];
}

export function AuthorTable({ authors }: IAuthorTableProps) {
  const deleteAuthor = async (id: string) => {
    try {
      const { data } = await axios.post("http://localhost:3000/graphql", {
        query: `
        mutation DeleteAuthor($deleteAuthorId: ID!) {
          deleteAuthor(id: $deleteAuthorId) {
            id
          }
        }
        `,
        variables: {
          deleteAuthorId: id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table className="w-fit">
      <TableCaption>A list of authors.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">S.No.</TableHead>
          <TableHead className="w-[1000px]">Name</TableHead>
          <TableHead className="w-[200px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {authors?.map((author, index) => (
          <TableRow key={author.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{author.name}</TableCell>
            <TableCell className=" flex gap-2">
              <Button>Edit</Button>
              <Button
                className="bg-red-500"
                onClick={() => deleteAuthor(author.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
