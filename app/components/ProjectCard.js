export default function ProjectCard({ title, description, tech, status }) {
    return (
      <div className="project-card">
        <div className="project-header">
          <h3>{title}</h3>
          <span className={`status ${status}`}>{status}</span>
        </div>
        <p className="project-description">{description}</p>
        <div className="tech-stack">
          {tech.map((item, index) => (
            <span key={index} className="tech-tag">{item}</span>
          ))}
        </div>
      </div>
    );
  }