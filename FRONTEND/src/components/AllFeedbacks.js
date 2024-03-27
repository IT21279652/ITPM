import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../CSS/poorna.css';

export default function AllFeedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        function fetchallData() {
            axios.get("http://localhost:8070/Feedback/")
                .then((res) => {
                    setFeedbacks(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    alert(err.message);
                });
        }
        fetchallData();
    }, []);

    function deleteFeedback(id) {
        axios.delete('http://localhost:8070/Feedback/delete/' + id)
            .then(() => {
                alert("Delete Successfully");
                const newFeedbackList = feedbacks.filter((fb) => fb._id !== id)
                setFeedbacks(newFeedbackList)
            }).catch((err) => {
                console.log(err);
            });
    }

    // Function to generate star icons based on the number of stars
    const renderStars = (numberOfStars) => {
        const stars = [];
        for (let i = 0; i < numberOfStars; i++) {
            stars.push(<span key={i}>&#9733;</span>);
        }
        return stars;
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className='myContainer'>
            <br />
            <center>
                <h2>All Feedbacks</h2>
            </center>
            <div className='feedbacks-container'>
                {feedbacks.map((feedback) => (
                    <div key={feedback._id} className='feedback-card'>
                        <div className='feedback-details'>
                            <p><strong>Username:</strong> {feedback.userName}</p>
                            <p><strong>Stars:</strong> {renderStars(feedback.stars)}</p>
                            <p><strong>Description:</strong> {feedback.description}</p>
                            <p><strong>Date:</strong> {formatDate(feedback.date)}</p>
                        </div>
                        <div className='feedback-actions'>
                            <Link to={`/editFeedback/${feedback._id}`}><button className='editBtn'>Edit</button></Link>
                            <button className='deleteBtn' onClick={() => deleteFeedback(feedback._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <br />
            <br />
            <div className=''>
                <button type='button' id="backbtnIncalcProf" onClick={() => navigate('/dashboard/manageFinance')}>Back</button>
            </div>
        </div>
    );
}
