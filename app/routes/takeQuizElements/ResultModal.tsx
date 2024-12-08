export function ResultModal({ report, isOpen, onClose }: { report: any; isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Result</h2>
          <div className="text-gray-700">
            <p><strong>Total Questions:</strong> {report.totalQuestions}</p>
            <p><strong>Total Valid Questions:</strong> {report.totalValidQuestions}</p>
            <p><strong>Total Skipped:</strong> {report.totalSkiped}</p>
            <p><strong>Total Right:</strong> {report.totalRight}</p>
            <p><strong>Total Wrong:</strong> {report.totalWrong}</p>
            <p><strong>Accuracy:</strong> {report.accuracy}%</p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  export function submitQuiz(questions: any[], answers: string[], setReport: (report: any) => void, openModal: () => void) {
    let totalRight = 0;
    let totalWrong = 0;
    let totalValidQuestions = 0;
    let invalidQuestions = 0;
    let totalSkiped = 0;
    // console.log("Result", questions, answers)
    // return
    questions.forEach((question, index) => {
        const optionElement = question.board.filter((item: any) => item.type === "SINGLE_SELECT_OPTIONS")[0]
      const correctAnswer = optionElement?.data?.correctAnswer;
      const userAnswer = answers[index];
    // console.log("RESULT",question.board.filter((item: any) => item.type === "SINGLE_SELECT_OPTIONS"), correctAnswer, userAnswer) 
      if (correctAnswer === undefined) {
        invalidQuestions++;
      } else {
        totalValidQuestions++;
        console.log("Answers",userAnswer, correctAnswer)
        if(userAnswer === ""){
          totalSkiped++;
        }
        else if (userAnswer === correctAnswer) {
          totalRight++;
        } else {
          totalWrong++;
        }
      }
    });
  
    const totalQuestions = questions.length;
    const accuracy = totalValidQuestions > 0 ? ((totalRight / totalValidQuestions) * 100).toFixed(2) : 0;
  
    const report = {
      totalQuestions,
      totalValidQuestions,
      totalRight,
      totalWrong,
      accuracy,
      invalidQuestions,
      totalSkiped
    };
  
    setReport(report);
    openModal();
  }
  