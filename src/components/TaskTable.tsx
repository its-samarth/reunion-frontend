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
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from "@tanstack/react-table";
  
  const initialTaskData = [
    {
      id: "T-00001",
      title: "Buy clothes",
      priority: 5,
      status: "Pending",
      startTime: "26-Nov-24 11:00 AM",
      endTime: "30-Nov-24 11:00 AM",
      totalTimeToFinish: 96,
    },
    {
      id: "T-00002",
      title: "Finish code",
      priority: 2,
      status: "Finished",
      startTime: "25-Nov-24 09:05 AM",
      endTime: "25-Nov-24 03:15 PM",
      totalTimeToFinish: 6.17,
    },
    {
      id: "T-00003",
      title: "Book travel tickets",
      priority: 4,
      status: "Pending",
      startTime: "19-Nov-24 10:00 PM",
      endTime: "20-Nov-24 11:00 PM",
      totalTimeToFinish: 25,
    },
    {
      id: "T-00004",
      title: "Order groceries",
      priority: 3,
      status: "Finished",
      startTime: "14-Oct-24 10:30 AM",
      endTime: "16-Oct-24 10:30 PM",
      totalTimeToFinish: 60,
    },
    {
      id: "T-00005",
      title: "Medical checkup",
      priority: 1,
      status: "Pending",
      startTime: "19-Nov-24 01:15 PM",
      endTime: "21-Dec-24 05:00 PM",
      totalTimeToFinish: 51.75,
    },
  ];
  
  const columns: ColumnDef<typeof initialTaskData[0]>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          onChange={(e) =>
            table.toggleAllRowsSelected(e.target.checked)
          }
          checked={table.getIsAllRowsSelected()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: "id",
      header: "Task ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "priority",
      header: "Priority",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
    },
    {
      accessorKey: "endTime",
      header: "End Time",
    },
    {
      accessorKey: "totalTimeToFinish",
      header: "Total time to finish (hrs)",
    },
  ];
  
  export default function TaskTable() {
    const [taskData, setTaskData] = React.useState(initialTaskData);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [filters, setFilters] = React.useState({ priority: "", status: "" });
  
    const table = useReactTable({
      data: taskData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
      },
      onSortingChange: setSorting,
    });
  
    const handleDeleteSelected = () => {
      const selectedIds = table.getSelectedRowModel().rows.map((row) => row.original.id);
      setTaskData((prevData) => prevData.filter((task) => !selectedIds.includes(task.id)));
    };
  
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value.includes(":")) {
        const [id, desc] = value.split(":");
        setSorting([{ id, desc: desc === "desc" }]);
      } else {
        setSorting([]);
      }
    };
  
    const handleFilterChange = (key: string, value: string) => {
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
      setTaskData(
        initialTaskData.filter((task) => {
          const matchesPriority =
            filters.priority === "" || task.priority.toString() === filters.priority;
          const matchesStatus =
            filters.status === "" || task.status === filters.status;
          return matchesPriority && matchesStatus;
        })
      );
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.controls}>
          <button onClick={handleDeleteSelected} style={styles.deleteButton}>
            Delete Selected
          </button>
          <select onChange={handleSortChange} style={styles.dropdown}>
            <option value="">Sort</option>
            <option value="startTime:asc">Start Time: ASC</option>
            <option value="startTime:desc">Start Time: DESC</option>
            <option value="endTime:asc">End Time: ASC</option>
            <option value="endTime:desc">End Time: DESC</option>
          </select>
          <select
            onChange={(e) => handleFilterChange("priority", e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Priority</option>
            {[1, 2, 3, 4, 5].map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleFilterChange("status", e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Finished">Finished</option>
          </select>
        </div>
        <Table>
          <TableCaption>A list of tasks with their priority and status.</TableCaption>
          <TableHeader>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
        </Table>
      </div>
    );
  }
  
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      margin: "20px auto",
      maxWidth: "80%",
      padding: "10px",
    },
    controls: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    deleteButton: {
      padding: "10px 20px",
      backgroundColor: "#e3342f",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    dropdown: {
      padding: "5px",
      marginLeft: "10px",
    },
  };
  