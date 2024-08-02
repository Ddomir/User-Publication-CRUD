import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

export const App = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [student_id, setStudentID] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const [editPublicationID, setEditPubID] = useState(null);
  const [editPublicationTitle, setEditPubTitle] = useState("");
  const [editPublicationYear, setEditPubYear] = useState("");

  const [selectedUserID, setSelectedUserID] = useState("");

  const [publicationList, setPublicationList] = useState([]);
  const [userList, setUserList] = useState([]);

  const addPublication = () => {
    axios
      .post("http://localhost:3001/publications", {
        student_id: selectedUserID,
        title: title,
        year: year,
      })
      .then(() => {
        console.log("Success");
        getPublications();
      })
      .catch((error) => console.error(error));
  };

  const getPublications = () => {
    axios.get("http://localhost:3001/publications").then((response) => {
      setPublicationList(response.data);
    });
  };

  const deletePublication = (id) => {
    axios
      .delete(`http://localhost:3001/publications/${id}`)
      .then(() => {
        getPublications();
      })
      .catch((error) => console.error(error));
  };

  const editPublication = () => {
    if (!editPublicationID || !editPublicationTitle || !editPublicationYear) {
      console.error("All fields must be filled out");
      return;
    }

    axios
      .put(`http://localhost:3001/publications/${editPublicationID}`, {
        title: editPublicationTitle,
        year: editPublicationYear,
      })
      .then(() => {
        console.log("Publication updated successfully");
        getPublications();
      })
      .catch((error) => console.error("Error updating publication:", error));
  };

  useEffect(() => {
    getPublications();
    getUsers();
  }, []);

  const addUser = () => {
    axios
      .post("http://localhost:3001/users", {
        email: email,
        first_name: firstName,
        last_name: lastName,
      })
      .then(() => {
        console.log("Success");
        getUsers();
      })
      .catch((error) => console.error(error));
  };

  const getUsers = () => {
    axios.get("http://localhost:3001/users").then((response) => {
      setUserList(response.data);
    });
  };

  return (
    <div className="p-4">
      {/* Add Publication */}
      <h1 className="mb-4 text-3xl">Add Publication</h1>
      <div className="flex flex-col items-left space-y-4">
        <div className="items-center space-x-4">
          <label>Student ID: </label>
          <select
            className="border rounded-md"
            value={selectedUserID}
            onChange={(e) => setSelectedUserID(e.target.value)}
          >
            <option value="" disabled>
              Select a student
            </option>
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="items-center space-x-4">
          <label>Title: </label>
          <input
            className="border rounded-md"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="items-center space-x-4">
          <label>Year: </label>
          <input
            className="border rounded-md"
            type="number"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
        </div>

        <button
          onClick={addPublication}
          className="border border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-500 hover:shadow-md rounded-md p-2"
        >
          Submit
        </button>
      </div>

      {/* Show Publications */}
      <div className="mt-4 border rounded-lg border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b px-4">ID</th>
              <th className="border-b px-4">StudentID</th>
              <th className="border-b px-4">Title</th>
              <th className="border-b px-4">Year</th>
              <th className="border-b px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {publicationList.map((publication) => (
              <tr key={publication.id} className="text-center">
                <td className="py-2 px-4">{publication.id}</td>
                <td className="py-2 px-4">{publication.student_id}</td>
                <td className="py-2 px-4">{publication.title}</td>
                <td className="py-2 px-4">{publication.year}</td>
                <td className="py-2 px-4 flex justify-center items-center">
                  <MdOutlineDelete
                    className="text-red-600 cursor-pointer"
                    onClick={() => deletePublication(publication.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400"></span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Add User */}
      <h1 className="mb-4 text-3xl">Add Student</h1>
      <div className="flex flex-col items-left space-y-4">
        <div className="items-center space-x-4">
          <label>Email: </label>
          <input
            className="border rounded-md"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="items-center space-x-4">
          <label>First: </label>
          <input
            className="border rounded-md"
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="items-center space-x-4">
          <label>Last: </label>
          <input
            className="border rounded-md"
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        <button
          onClick={addUser}
          className="border border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-500 hover:shadow-md rounded-md p-2"
        >
          Submit
        </button>
      </div>

      {/* Show Users */}
      <div className="border rounded-lg border-gray-200 mt-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b px-4">ID</th>
              <th className="border-b px-4">Email</th>
              <th className="border-b px-4">First Name</th>
              <th className="border-b px-4">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.first_name}</td>
                <td className="py-2 px-4">{user.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400"></span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      {/* Edit Publication*/}
      {/* Edit Publication */}
      <h1 className="mb-4 text-3xl">Edit Publication</h1>
      <div className="flex flex-col items-left space-y-4">
        <div className="items-center space-x-4">
          <label>ID: </label>
          <input
            className="border rounded-md"
            type="text"
            value={editPublicationID || ""}
            onChange={(e) => setEditPubID(e.target.value)}
          />
        </div>
        <div className="items-center space-x-4">
          <label>Title: </label>
          <input
            className="border rounded-md"
            type="text"
            value={editPublicationTitle || ""}
            onChange={(e) => setEditPubTitle(e.target.value)}
          />
        </div>
        <div className="items-center space-x-4">
          <label>Year: </label>
          <input
            className="border rounded-md"
            type="number"
            value={editPublicationYear || ""}
            onChange={(e) => setEditPubYear(e.target.value)}
          />
        </div>
        <button
          onClick={editPublication}
          className="border border-gray-300 bg-gray-100 hover:bg-gray-200 hover:border-gray-500 hover:shadow-md rounded-md p-2"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default App;
