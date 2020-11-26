import React, { useState } from "react";
import {
  DataTable,
  DataTableProps,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Button,
  TableSelectAll,
  TableSelectRow,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
} from "carbon-components-react";
import {
  Delete16 as Delete,
  Save16 as Save,
  Download16 as Download,
} from "@carbon/icons-react";
import { action } from "@storybook/addon-actions";
import { useSelector } from "react-redux";
import { selectConfigurations } from "../../../../features/sim/simSlice";

const insertInRandomPosition = (array: Array<any>, element: any) => {
  const index = Math.floor(Math.random() * (array.length + 1));
  return [...array.slice(0, index), element, ...array.slice(index)];
};

const headers = [
  {
    header: "Simulation ID",
    key: "simulationID",
  },
  {
    header: "Simulation Name",
    key: "simulationName",
  },
  {
    header: "Principal",
    key: "principal",
  },
  {
    header: "Max Portfolio",
    key: "maxPortfolio",
  },
  {
    header: "Min Portfolio",
    key: "minPortfolio",
  },
  {
    header: "Number of Trades",
    key: "numTrades",
  },
];
const rows = [
  {
    id: "simulation-1",
    simulationID: "8dk3-3hd8-jsk2-dls4",
    simulationName: "Trading Up",
    principal: "$11,000.00",
    maxPortfolio: "$128,756.23",
    minPortfolio: "$10,728.44",
    numTrades: "54",
  },
  {
    id: "simulation-2",
    simulationID: "8dk3-3hd8-jsk2-dls4",
    simulationName: "Trading Up",
    principal: "$11,000.00",
    maxPortfolio: "$128,756.23",
    minPortfolio: "$10,728.44",
    numTrades: "54",
  },
  {
    id: "simulation-3",
    simulationID: "8dk3-3hd8-jsk2-dls4",
    simulationName: "Trading Up",
    principal: "$11,000.00",
    maxPortfolio: "$128,756.23",
    minPortfolio: "$10,728.44",
    numTrades: "87",
  },
  {
    id: "simulation-4",
    simulationID: "8dk3-3hd8-jsk2-dls4",
    simulationName: "Trading Up",
    principal: "$11,000.00",
    maxPortfolio: "$128,756.23",
    minPortfolio: "$10,728.44",
    numTrades: "54",
  },
  {
    id: "simulation-5",
    simulationID: "8dk3-3hd8-jsk2-dls4",
    simulationName: "Trading Up",
    principal: "$11,000.00",
    maxPortfolio: "$128,756.23",
    minPortfolio: "$10,728.44",
    numTrades: "54",
  },
];

export const SimulationsTable: React.FC = (props) => {
  const configurations = useSelector(selectConfigurations);
  console.log(configurations);

  const [tableState, setTableState] = useState({
    rows,
    headers,
    id: 0,
  });

  const handleOnHeaderAdd = () => {
    const length = tableState.headers.length;
    const header = {
      key: `header_${length}`,
      header: `Header ${length}`,
    };

    const setStateCustom = (state: any) => {
      const rows = state.rows.map((row: any) => {
        return {
          ...row,
          [header.key]: header.header,
        };
      });
      return {
        rows,
        headers: state.headers.concat(header),
      };
    };
  };

  const handleOnRowAdd = () => {
    const setState = (state: any) => {
      const { id: _id, rows } = state;
      const id = _id + 1;
      const row = {
        id: "" + id,
        name: `New Row ${id}`,
        protocol: "HTTP",
        port: id * 100,
        rule: id % 2 === 0 ? "Round robin" : "DNS delegation",
        attached_groups: `Row ${id}'s VM Groups`,
        status: "Starting",
      };

      state.headers
        // @ts-ignore
        .filter((header: any) => row[header.key] === undefined)
        .forEach((header: any) => {
          // @ts-ignore
          row[header.key] = header.header;
        });

      return {
        id,
        rows: insertInRandomPosition(rows, row),
      };
    };
  };

  console.log(tableState);

  return (
    <DataTable rows={tableState.rows} headers={tableState.headers} {...props}>
      {({
        // @ts-ignore
        rows,
        // @ts-ignore
        headers,
        // @ts-ignore
        getHeaderProps,
        // @ts-ignore
        getSelectionProps,
        // @ts-ignore
        getToolbarProps,
        // @ts-ignore
        getBatchActionProps,
        // @ts-ignore
        getRowProps,
        // @ts-ignore
        onInputChange,
        // @ts-ignore
        selectedRows,
        // @ts-ignore
        getTableProps,
        // @ts-ignore
        getTableContainerProps,
        // @ts-ignore
      }) => (
        <TableContainer
          title="Simulations"
          description="A dynamic view of all of your simulations created in Risk Aversion. Click on the row dropdown for a more detailed view."
          {...getTableContainerProps()}
        >
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...getBatchActionProps()}>
              <TableBatchAction
                renderIcon={Delete}
                iconDescription="Delete the selected rows"
                // onClick={batchActionClick(selectedRows)}
              >
                Delete
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent>
              <TableToolbarSearch onChange={onInputChange} />
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header: any, i: any) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell: any) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow
                    colSpan={headers.length + 3}
                    className="demo-expanded-td"
                  >
                    <h6>Expandable row content</h6>
                    <div>Description here</div>
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};
