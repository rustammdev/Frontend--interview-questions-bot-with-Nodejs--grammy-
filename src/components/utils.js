const questions = require("../../questions.json");
const { Random } = require("random-js");

const randomQuestion = (topic) => {
  const random = new Random();
  const questionTopic = topic.toLowerCase();

  const randomQuestionIndex = random.integer(
    0,
    questions[questionTopic].length - 1
  );

  return questions[questionTopic][randomQuestionIndex];
};

const getCorrectAnswear = () => {
  
}

module.exports = { randomQuestion, getCorrectAnswear };
