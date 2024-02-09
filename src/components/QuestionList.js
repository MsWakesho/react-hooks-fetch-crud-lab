import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then(
      (data) => setQuestions(data))
      .catch((error) => console.log("Error fetching data:", error));
      }, [])
    
    // function handleAddQuestions(newQuestions){
    //   setQuestions([...questions, newQuestions])
    //   console.log("New Question", newQuestions)
    // }

    function handleDeleteQuestions(id) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .then(() => {
          const updatedQuestions = questions.filter((q) => q.id !== id);
          setQuestions(updatedQuestions);
        });
    }

  return (
    <section>
      <h1>Quiz Questions</h1>
      
      <ul>
        {questions.map((question) => (
          <QuestionItem 
          key = {question.id} 
          question={question}
          onDelete = {handleDeleteQuestions}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;