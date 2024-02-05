import { Span } from 'next/dist/trace';
import React, { useState } from 'react';

// Define the structure of a question
interface Question {
  question: {
    text: string;
    code: string;
  };
  options: string[];
  correctAnswer: string;
}

// Array of questions with their options and correct answers
const questions: Question[] = [
  { 
    question: {
      text: "In Solana smart contracts, the data for accounts is passed by reference and can be mutated inside the contract functions.",
      code: `pub fn decrement(greeting_account: &mut WithMeta) -> ProgramResult {
        greeting_account.counter -= 1;
        Ok(())
      }`
    }, 
    options: ["True", "False"], 
    correctAnswer: "True" 
  },
  { 
    question: {
      text: "To invoke another program within a Solana program, the CPI (Cross-Program Invocation) feature is not required.",
      code: ""
    }, 
    options: ["True", "False"], 
    correctAnswer: "False" 
  },
  { 
    question: {
      text: "Solana programs can directly update the ledger state without going through a transaction.",
      code: ""
    }, 
    options: ["True", "False"], 
    correctAnswer: "False" 
  },
  { 
    question: {
      text: "In Solana, the account's data size is fixed at the time of its creation and cannot be changed later.",
      code: ""
    }, 
    options: ["True", "False"], 
    correctAnswer: "True" 
  },
  { 
    question: {
      text: "Smart contracts in Solana are called 'programs' and are written in Rust or C.",
      code: ""
    }, 
    options: ["True", "False"], 
    correctAnswer: "True" 
  },
];

// React component for the quiz
const QuizComponent: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  // Function to handle option changes for each question
  const handleOptionChange = (questionIndex: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option;
    setAnswers(newAnswers);
  };

  // Function to handle quiz submission
  const handleSubmit = () => {
    const isCorrect = questions.every((question, index) => question.correctAnswer === answers[index]);
    if (isCorrect) {
      console.log('yeay');
    } else {
      console.log('no award for you');
    }
    setSubmitted(true);
  };

  return (
    <div className='px-5'>
      {questions.map((question, index) => (
        <div className='border-t border-white pb-5' key={index}>
          <p className='my-5'>{question.question.text}</p>
          <code className='my-5'>{question.question.code}</code>
          <div className='flex gap-x-5 flex-row'>
            {question.options.map(option => (
              <label className={`border-white mt-5 rounded-full border py-1 w-fit px-5 hover:bg-white hover:text-black         
              ${answers[index] === option ? 'bg-white text-black' : 'bg-transparent text-white'}  `} key={option}>
                <input
                  className='w-0 h-0'
                  type="radio"
                  name={question.question.text}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => {
                    handleOptionChange(index, option);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
          {submitted && answers[index] !== question.correctAnswer && <span className='text-red-700 '>Wrong Answer!</span>  }
        </div>
      ))}
      <button className='border-white rounded-full border hover:bg-white hover:text-black   py-1 w-fit px-5 my-5' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuizComponent;
