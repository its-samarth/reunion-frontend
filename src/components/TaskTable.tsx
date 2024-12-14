import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "./ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getTasks } from "@/services/authService";

export default function TaskTable() {
  const [taskData, setTaskData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found, please login first");

        const fetchedTasks = await getTasks(token);

        if (fetchedTasks?.tasks && Array.isArray(fetchedTasks.tasks)) {
          setTaskData(
            fetchedTasks.tasks.map((task) => ({
              id: task._id,
              title: task.title,
              priority: task.priority,
              status: task.status,
              startTime: new Date(task.startTime).toLocaleString(),
              endTime: new Date(task.endTime).toLocaleString(),
              totalTime: task.totalTime,
            }))
          );
        } else {
          throw new Error("Invalid tasks format received");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const columns: ColumnDef<any>[] = [
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
      accessorKey: "totalTime",
      header: "Total Time (hrs)",
    },
  ];

  const table = useReactTable({
    data: taskData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <Table>
        <TableCaption>A list of tasks with their priority and status.</TableCaption>
        <TableHeader>
          <TableRow>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
};
