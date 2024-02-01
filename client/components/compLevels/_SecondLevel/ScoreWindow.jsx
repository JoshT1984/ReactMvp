import "../../../css/scoreWindow.css";
import { useState, useEffect } from "react";
import Button from "../_ThirdLevel/Button.jsx";

function ScoreWindow({ currentScreen, onSubmit }) {
  //------------------GET ROUTE
  const [nameArray, setNameArray] = useState([]);
  const [scoreArray, setScoreArray] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    score: "",
  });

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/player");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        // Handle the case where there are no users (empty array)
        console.log("No Users Exist");
        setNameArray([]);
        setScoreArray([]);
      } else {
        const names = data.map((user) => ({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
        }));
        const scores = data.map((user) => user.score);
        setNameArray(names);
        setScoreArray(scores);
      }
    } catch (err) {
      console.error(`Error fetching user data: ${err.message}`);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  //----------------------------------------------------------------POST ROUTE------------------
  const handleInputChange = (e) => {
    // Update form data on input change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Success:", data);

      setNameArray((prevNames) => [
        ...prevNames,
        `${formData.firstname} ${formData.lastname}`,
      ]);
      setScoreArray((prevScores) => [...prevScores, formData.score]);

      // Clear the form data
      setFormData({
        firstname: "",
        lastname: "",
        score: "",
      });
    } catch (error) {
      console.error(error);
    }

    getUserData();
  };
  //------------------------------------------------------------------------UPDATE ROUTE
  //-$submitUpdate.on("click", function (e) {
  //     e.preventDefault();

  //     $lastIndexString = indexTracker;

  //     $taskEdit = $(".task_update").val();
  //     $dateEdit = $(".complete_by_update").val();
  //     fetch(`/lists/todo/${indexTracker}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         task: $taskEdit,
  //         complete_by: $dateEdit,
  //         user_id: userId,
  //       }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status : ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("IN THE THEN BLOCK");
  //         $(`.task${indexTracker}`).html($taskEdit);
  //         $(`.complete${indexTracker}`).html($dateEdit);
  //         $addTodo.show();
  //         $updateInputs.hide();
  //         console.log(`PATCH request successful:`, data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   });
  // }

  //------------------------------------------DELETE ROUTE----------------------------------------
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/player/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Deleted data for ID: ${id}`);
        getUserData(); // Refresh data after deletion
      } else if (response.status === 404) {
        console.log("ID outside the valid range");
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div id="scoreWindow">
        <img
          src="../../images/backgrounds/Title_Screen.png"
          alt="title_screen"
        />
      </div>
      <div className="scoreTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {nameArray.map((nameData, index) => (
              <tr key={index}>
                <td>
                  {console.log(nameArray)}
                  {nameData.firstname} {nameData.lastname}
                </td>
                <td>{nameData.score}</td>
                <td>
                  <button onClick={() => handleDelete(nameData.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="FIRST NAME"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="LAST NAME"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="SCORE"
            name="score"
            value={formData.score}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ScoreWindow;
