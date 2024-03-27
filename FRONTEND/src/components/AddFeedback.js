import React, { useState } from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/AddFeedback.css';

export default function AddFeedback() {
  const [userName, setUsername] = useState("");
  const [stars, setStars] = useState(0); // Set default stars to 0
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date()); // Initialize date with current date

  function handleStarClick(starValue) {
    setStars(starValue);
  }

  function sendData(e) {
    e.preventDefault();

    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to submit this feedback?");

    if (isConfirmed) {
      // User confirmed, proceed with submission
      const newFeedback = {
        userName,
        stars,
        description,
        date
      }

      console.log(newFeedback);

      axios.post("http://localhost:8070/feedback/add", newFeedback)
        .then(() => {
          alert("New feedback added.")
        })
        .catch((err) => {
          alert(err)
          console.log(err);
        });
    } else {
      // User canceled, do nothing
    }
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <h1>Add Feedback</h1>

        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="userName"  
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            className="form-control" 
            id="description"  
            placeholder="Enter Feedback"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={5} // Adjust the number of rows as needed
          />
        </div>

        {/* Star Rating */}
        <div className="form-group">
          <label htmlFor="stars">Stars</label>
          <div className="rating" id="starRating">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={index < stars ? "star selected" : "star"}
                onClick={() => handleStarClick(index + 1)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        {/* End Star Rating */}

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <DatePicker 
            selected={date}
            onChange={date => setDate(date)}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
