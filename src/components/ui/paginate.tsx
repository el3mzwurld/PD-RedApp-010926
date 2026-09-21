import { Button } from "@mui/material";
import { motion } from "motion/react";
import { useEffect } from "react";

interface PaginateProps {
  array: Array<unknown>;
  itemsPerPage: number;
  page: number;
  returnArray: (array: unknown[]) => void;
  prev: () => void;
  nextPage: () => void;
}

export const Paginate = ({
  array,
  itemsPerPage,
  page,
  returnArray,
  prev,
  nextPage,
}: PaginateProps) => {
  // indexes
  const indexLast = page * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;

  const paginated = array.slice(indexFirst, indexLast);

  const handlePaginate = () => {
    returnArray(paginated);
  };

  useEffect(() => {
    if (page === 1) {
      handlePaginate();
      return;
    }
  }, [page]);

  return (
    <motion.div
      style={{
        width: "auto",
        height: 30,
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      Items per page {itemsPerPage} : Page {page}
      <Button
        sx={{ height: "100%", width: "auto" }}
        disabled={page === 1}
        onClick={() => {
          handlePaginate();
          prev();
        }}
      >
        Previous
      </Button>
      <Button
        sx={{ height: "100%", width: "auto" }}
        disabled={page === array.length}
        onClick={() => {
          handlePaginate();
          nextPage();
        }}
      >
        Next
      </Button>
    </motion.div>
  );
};
