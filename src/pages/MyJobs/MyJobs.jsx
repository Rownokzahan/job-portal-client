import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { useEffect } from "react";
import "./MyJobs.css";
import Button from "react-bootstrap/Button";
import UpdateJobModal from "../UpdateJobModal/UpdateJobModal";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [control, setControl] = useState(false);
  const [modalJob, setModalJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/my-jobs/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [user, control]);

  const handleSearch = () => {
    fetch(`http://localhost:5000/jobs/search/${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      });
  };

  const handleJobUpdate = (data) => {
    fetch(`http://localhost:5000/jobs`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          setControl(!control);
        }
        console.log(result);
      });
  };

  const handleJobDelete = id => {
    fetch(`http://localhost:5000/jobs/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        if (result.deletedCount > 0) {
          setControl(!control);
        }
      });
  };

  return (
    <div>
      <div className="my-jobs-container">
        <h1 className="text-center p-4 ">ALL My Jobs</h1>
        <div className="search-box p-2 text-center">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="p-1"
          />{" "}
          <button onClick={handleSearch}>Search</button>
        </div>
        <Table striped bordered hover className="container">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>vacancy</th>
              <th>salary</th>
              <th>Edit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job, index) => (
              <tr key={job._id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.vacancy}</td>
                <td>{job.salary}</td>
                <td>
                  <Button variant="primary" onClick={() => { setModalJob(job), setModalShow(true) }}>
                    Edit
                  </Button>
                </td>
                <td>
                  {" "}
                  <button onClick={() => handleJobDelete(job._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <UpdateJobModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        job={modalJob}
        handleJobUpdate={handleJobUpdate}
      />
    </div>
  );
};

export default MyJobs;
