import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "carbon-components-react";

interface StockTableProps {
  className?: string;
}

export const StockTable: React.FC<StockTableProps> = ({ className }) => {
  const headers = ["Symbol", "Price", "Return"];
  const rows = [
    {
      id: "AAPL",
      symbol: "AAPL",
      price: "$182",
      return: "-$32",
    },
    {
      id: "MSFT",
      symbol: "MSFT",
      price: "$112",
      return: "-$14",
    },
    {
      id: "TSLA",
      symbol: "TSLA",
      price: "$892",
      return: "+$246",
    },
    {
      id: "PHR",
      symbol: "PHR",
      price: "$121",
      return: "-$12",
    },
  ];

  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader key={header}>{header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {Object.keys(row)
              .filter((key) => key !== "id")
              .map((key) => {
                // @ts-ignore
                return <TableCell key={key}>{row[key]}</TableCell>;
              })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
