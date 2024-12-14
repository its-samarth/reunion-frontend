import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "./ui/table";
  
  import * as React from "react";
  import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  
  const taskPriorityData = [
    {
      priority: 1,
      pendingTasks: 10,
      timeLapsed: 5,
      timeToFinish: 10,
    },
    {
      priority: 2,
      pendingTasks: 5,
      timeLapsed: 3,
      timeToFinish: 7,
    },
    {
      priority: 4,
      pendingTasks: 2,
      timeLapsed: 1,
      timeToFinish: 3,
    },
    {
      priority: 3,
      pendingTasks: 12,
      timeLapsed: 8,
      timeToFinish: 15,
    },
    // Add more data here as needed
  ];
  
  const columns: ColumnDef<typeof taskPriorityData[0]>[] = [
    {
      accessorKey: "priority",
      header: "Task Priority",
    },
    {
      accessorKey: "pendingTasks",
      header: "Pending Tasks",
    },
    {
      accessorKey: "timeLapsed",
      header: "Time Lapsed (hrs)",
    },
    {
      accessorKey: "timeToFinish",
      header: "Time to Finish (hrs)",
    },
  ];
  
  export default function SummaryTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
  
    const table = useReactTable({
      data: taskPriorityData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
      state: {
        sorting,
      },
    });
  
    return (
      <div style={styles.tableContainer}>
        <Table>
          <TableCaption>A list of task priorities and their status.</TableCaption>
          <TableHeader>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-gray-200 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        <span>
                          {header.column.getIsSorted()
                            ? header.column.getIsSorted() === "desc"
                              ? " ▼"
                              : " ▲"
                            : "▼"}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </React.Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Pending Tasks</TableCell>
              <TableCell className="text-right">
                {taskPriorityData.reduce((acc, row) => acc + row.pendingTasks, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
  
  const styles: { [key: string]: React.CSSProperties } = {
    tableContainer: {
      margin: "20px auto",
      maxWidth: "80%",
      padding: "10px",
    },
  };
  