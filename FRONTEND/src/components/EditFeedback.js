import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/AddFeedback.css'; // Reuse the CSS from AddFeedback component

export default function EditFeedback() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [feedback, setFeedback] = useState({
        userName: "",
        stars: 0,
        description: "",
        date: new Date()
    });

    useEffect(() => {
        axios.get(`http://localhost:8070/feedback/get/${id}`)
            .then(res => {
                setFeedback(res.data.feedback);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    function updateData(e) {
        e.preventDefault();
        axios.put(`http://localhost:8070/feedback/update/${id}`, feedback)
            .then(() => {
                alert("Successfully updated!");
                navigate('/allFeedbacks');
            })
            .catch((err) => {
                alert(err);
            });
    }

    if (!feedback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <form onSubmit={updateData}>
                <h1>Edit Feedback</h1>
                <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Enter Username"
                        value={feedback.userName}
                        onChange={(e) => setFeedback({ ...feedback, userName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter Feedback"
                        value={feedback.description}
                        onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
                        rows={5}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stars">Stars</label>
                    <div className="rating">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={index < feedback.stars ? "star selected" : "star"}
                                onClick={() => setFeedback({ ...feedback, stars: index + 1 })}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <DatePicker
                        selected={new Date(feedback.date)}
                        onChange={date => setFeedback({ ...feedback, date })}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
