import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
    const getStatusBadge = (status) => {
        const badges = {
            pending: 'badge-pending',
            approved: 'badge-approved',
            rejected: 'badge-rejected',
        };
        return badges[status] || 'badge-pending';
    };

    return (
        <div className="project-card card card-hover animate-fade-in">
            {/* Project Image */}
            {project.image && (
                <div className="project-image">
                    <img src={project.image} alt={project.title} />
                </div>
            )}

            <div className="project-card-content">
                {/* Header */}
                <div className="project-header">
                    <h3 className="project-title line-clamp-2">
                        {project.title}
                    </h3>
                    {project.status && (
                        <span className={`badge ${getStatusBadge(project.status)}`}>
                            {project.status}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="project-description line-clamp-3">
                    {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && (
                    <div className="tech-tags">
                        {project.technologies.split(',').slice(0, 3).map((tech, index) => (
                            <span key={index} className="tech-tag">
                                {tech.trim()}
                            </span>
                        ))}
                        {project.technologies.split(',').length > 3 && (
                            <span className="tech-tag tech-tag-more">
                                +{project.technologies.split(',').length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="project-footer">
                    <div className="project-meta">
                        {project.faculty && (
                            <span className="meta-faculty">{project.faculty}</span>
                        )}
                        {project.year && (
                            <span className="meta-year">Year: {project.year}</span>
                        )}
                    </div>

                    <div className="project-actions">
                        {project.github_link && (
                            <a
                                href={project.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-link"
                                title="View on GitHub"
                            >
                                <svg className="github-icon" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        )}
                        <Link
                            to={`/project/${project.id}`}
                            className="btn btn-primary btn-sm"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        technologies: PropTypes.string,
        status: PropTypes.string,
        faculty: PropTypes.string,
        year: PropTypes.number,
        github_link: PropTypes.string,
    }).isRequired,
};

export default ProjectCard;
