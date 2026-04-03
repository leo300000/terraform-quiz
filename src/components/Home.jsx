import { themes, questions } from "../data/questions";

export default function Home({ onStart }) {
  return (
    <div className="home">
      <div className="home-header">
        <span className="logo-icon">🏔️</span>
        <h1 className="home-title">Terraform Quiz</h1>
        <p className="home-subtitle">
          Teste tes connaissances Terraform par thème — QCM + exercices de code
        </p>
      </div>

      <div className="themes-grid">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className="theme-card"
            style={{ "--theme-color": theme.color }}
            onClick={() => onStart(theme)}
          >
            <span className="theme-icon">{theme.icon}</span>
            <div className="theme-title">{theme.title}</div>
            <div className="theme-desc">{theme.description}</div>
            <div className="theme-meta">
              <span className="theme-count">
                {questions[theme.id].length} questions
              </span>
              <span>·</span>
              <span>
                {questions[theme.id].filter((q) => q.type === "code_complete").length} exercices code
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
