export default function Results({ results, theme, onRestart, onRetry }) {
  const { history, total } = results;
  const correct = history.filter((h) => h.correct).length;
  const wrong = total - correct;
  const percent = Math.round((correct / total) * 100);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percent / 100) * circumference;

  const ringColor =
    percent >= 80 ? "#2EBF5E" : percent >= 50 ? "#D4A017" : "#E04B1B";

  const getEmoji = () => {
    if (percent === 100) return "🎉";
    if (percent >= 80) return "🚀";
    if (percent >= 60) return "👍";
    if (percent >= 40) return "📖";
    return "💪";
  };

  const getMessage = () => {
    if (percent === 100) return "Score parfait ! Tu maîtrises ce thème.";
    if (percent >= 80) return "Excellent ! Tu as de très bonnes bases.";
    if (percent >= 60) return "Pas mal ! Quelques points à revoir.";
    if (percent >= 40) return "Continue à pratiquer, tu progresses !";
    return "Ce thème mérite plus d'attention. Relis la doc et réessaie !";
  };

  const wrongItems = history.filter((h) => !h.correct);

  return (
    <div className="results">
      <span className="results-emoji">{getEmoji()}</span>
      <h1 className="results-title">{getMessage()}</h1>
      <p className="results-subtitle">
        Thème : {theme.icon} {theme.title}
      </p>

      <div className="score-ring-wrap">
        <svg
          className="score-ring-svg"
          width="160"
          height="160"
          viewBox="0 0 120 120"
        >
          <circle className="score-ring-bg" cx="60" cy="60" r="54" strokeWidth="10" />
          <circle
            className="score-ring-fill"
            cx="60"
            cy="60"
            r="54"
            strokeWidth="10"
            stroke={ringColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="score-ring-text">
          <span className="score-number" style={{ color: ringColor }}>
            {percent}%
          </span>
          <span className="score-label">Score</span>
        </div>
      </div>

      <div className="results-details">
        <div className="stat-card correct-stat">
          <div className="stat-number">{correct}</div>
          <div className="stat-label">Correctes</div>
        </div>
        <div className="stat-card wrong-stat">
          <div className="stat-number">{wrong}</div>
          <div className="stat-label">Incorrectes</div>
        </div>
        <div className="stat-card percent-stat">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total</div>
        </div>
      </div>

      {wrongItems.length > 0 && (
        <div className="results-review">
          <div className="review-title">À revoir ({wrongItems.length})</div>
          {wrongItems.map((item, i) => (
            <div key={i} className="review-item">
              <span className="review-icon">❌</span>
              <div>
                <div className="review-q">{item.question}</div>
                <div className="review-a">Réponse : {item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="results-actions">
        <button className="btn btn-ghost" onClick={onRestart}>
          ← Choisir un thème
        </button>
        <button className="btn btn-primary" onClick={onRetry}>
          Réessayer ce thème
        </button>
      </div>
    </div>
  );
}
