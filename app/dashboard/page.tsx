"use client";

import { tasks } from "../../data/tasks";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { useState } from "react";

export default function DashboardPage() {
  const [taskList, setTaskList] = useState(tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      dueDate,
    };

    setTaskList([...taskList, newTask]);

    setTitle("");
    setDescription("");
    setStatus("");
    setDueDate("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Task Dashboard
      </h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">
            Add Task
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <input
              placeholder="Title"
              className="border p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Description"
              className="border p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              placeholder="Status"
              className="border p-2 w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 w-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <Button onClick={handleAddTask}>
              Save Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <input
        type="text"
        placeholder="Search task..."
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-4"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        className="border p-2 w-full mb-4"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Due Date Asc</option>
        <option value="desc">Due Date Desc</option>
      </select>

      <div className="space-y-4">

        {taskList.filter((task) =>
          task.title.toLowerCase().includes(search.toLowerCase())
        )
          .filter((task) =>
            statusFilter === "All"
              ? true
              : task.status === statusFilter
          )
          .sort((a, b) =>
            sortOrder === "asc"
              ? new Date(a.dueDate).getTime() -
              new Date(b.dueDate).getTime()
              : new Date(b.dueDate).getTime() -
              new Date(a.dueDate).getTime()
          )
          .map((task) => (
            <div
              key={task.id}
              className="border p-4 rounded"
            >
              <h2 className="font-bold text-lg">
                {task.title}
              </h2>

              <p>{task.description}</p>

              <div className="mt-2">
                <strong>Status:</strong>

                <select
                  className="border ml-2 p-1"
                  value={task.status}
                  onChange={(e) => {
                    const updatedTasks = taskList.map((t) =>
                      t.id === task.id
                        ? { ...t, status: e.target.value }
                        : t
                    );

                    setTaskList(updatedTasks);
                  }}
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <p>
                <strong>Due Date:</strong>{" "}
                {task.dueDate}
              </p>

              <Button
                variant="destructive"
                onClick={() =>
                  setTaskList(
                    taskList.filter((t) => t.id !== task.id)
                  )
                }
              >
                Delete
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}