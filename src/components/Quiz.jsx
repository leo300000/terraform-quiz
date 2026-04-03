import { useState } from "react";
import { questions } from "../data/questions";

function parseExplanation(text) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) =>
    part.startsWith("`") && part.endsWith("`")
      ? <code key={i}>{part.slice(1, -1)}</code>
      : <span key={i}>{part}</span>
  );
}

function MCQQuestion({ question, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);

  const choose = (idx) => {
    if (answered !== null) return;
    setSelected(idx);
    onAnswer(idx === question.answer, idx);
  };

  return (
    <>
      <div className="options-list">
        {question.options.map((opt, idx) => {
          let cls = "option-btn";
          if (answered !== null) {
            if (idx === question.answer) cls += " correct";
            else if (idx === answered.selected) cls += " wrong";
          } else if (selected === idx) {
            cls += " selected";
          }
          return (
            <button
              key={idx}
              className={cls}
              onClick={() => choose(idx)}
              disabled={answered !== null}
            >
              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered !== null && (
        <div className={`explanation-box ${answered.correct ? "correct" : "wrong"}`}>
          <div className="explanation-label">
            {answered.correct ? "✅ Correct !" : "❌ Pas tout à fait"}
          </div>
          {parseExplanation(question.explanation)}
        </div>
      )}
    </>
  );
}

function CodeQuestion({ question, onAnswer, answered }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const submit = () => {
    if (submitted) return;
    const ok = value.trim().toLowerCase() === question.answer.trim().toLowerCase();
    setCorrect(ok);
    setSubmitted(true);
    onAnswer(ok);
  };

  return (
    <>
      <div className="code-block">
        {question.code.split("___").map((part, i, arr) => (
          <span key={i}>
            <span>{part}</span>
            {i < arr.length - 1 && (
              <input
                className={`code-blank${submitted ? (correct ? " correct" : " wrong") : ""}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                disabled={submitted}
                spellCheck={false}
                autoComplete="off"
              />
            )}
          </span>
        ))}
      </div>

      {!submitted && (
        <div className="hint-text">💡 {question.hint}</div>
      )}

      <div className="code-submit-row">
        {!submitted ? (
          <button className="btn btn-primary" onClick={submit} disabled={!value.trim()}>
            Valider
          </button>
        ) : (
          <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Réponse attendue :{" "}
            <code style={{ fontFamily: "monospace", color: correct ? "var(--green)" : "var(--red)" }}>
              {question.answer}
            </code>
          </span>
        )}
      </div>

      {submitted && (
        <div className={`explanation-box ${correct ? "correct" : "wrong"}`}>
          <div className="explanation-label">
            {correct ? "✅ Correct !" : "❌ Pas tout à fait"}
          </div>
          {parseExplanation(question.explanation)}
        </div>
      )}
    </>
  );
}

export default function Quiz({ theme, onFinish, onExit }) {
  const themeQuestions = questions[theme.id];
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [history, setHistory] = useState([]);

  const q = themeQuestions[current];
  const isLast = current === themeQuestions.length - 1;
  const progress = (current / themeQuestions.length) * 100;

  const handleAnswer = (correct, selected) => {
    const entry = {
      question: q.question,
      correct,
      answer: q.type === "mcq" ? q.options[q.answer] : q.answer,
    };
    setAnswered({ correct, selected });
    setHistory((h) => [...h, entry]);
  };

  const next = () => {
    const finalHistory = [...history];
    if (isLast) {
      onFinish({ total: themeQuestions.length, history: finalHistory });
    } else {
      setCurrent((c) => c + 1);
      setAnswered(null);
    }
  };

  return (
    <div className="quiz">
      <div className="quiz-header">
        <div className="quiz-theme-badge">
          <span>{theme.icon}</span>
          <span>{theme.title}</span>
        </div>
        <div className="quiz-progress-wrap">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="quiz-progress-text">
            {current + 1} / {themeQuestions.length}
          </div>
        </div>
        <button className="btn-exit" onClick={onExit}>Quitter</button>
      </div>

      <div className="question-card">
        <span className={`question-type-badge ${q.type === "mcq" ? "badge-mcq" : "badge-code"}`}>
          {q.type === "mcq" ? "QCM" : "Compléter le code"}
        </span>

        <div className="question-text">{q.question}</div>

        {q.type === "mcq" ? (
          <MCQQuestion key={q.id} question={q} onAnswer={handleAnswer} answered={answered} />
        ) : (
          <CodeQuestion key={q.id} question={q} onAnswer={(ok) => handleAnswer(ok, null)} answered={answered} />
        )}

        {answered !== null && (
          <div className="question-nav">
            <button className="btn btn-primary" onClick={next}>
              {isLast ? "Voir les résultats →" : "Question suivante →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
