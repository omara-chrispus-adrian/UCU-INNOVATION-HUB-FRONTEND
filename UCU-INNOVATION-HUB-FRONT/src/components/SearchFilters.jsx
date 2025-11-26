import PropTypes from 'prop-types';
import { useState } from 'react';
import '../styles/SearchFilters.css';

const SearchFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        search: '',
        faculty: '',
        category: '',
        technology: '',
        year: '',
    });

    const faculties = [
        'Engineering, Design and Technology',
        'Business and Administration',
        'Science and Technology',
        'Social Sciences',
        'Law',
        'Theology',
    ];

    const categories = [
        'Web Development',
        'Mobile Apps',
        'AI/Machine Learning',
        'IoT',
        'Data Science',
        'Cybersecurity',
        'Blockchain',
        'Other',
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const handleChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters = {
            search: '',
            faculty: '',
            category: '',
            technology: '',
            year: '',
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="search-filters card">
            <div className="filters-header">
                <h2 className="filters-title gradient-text">Search & Filter Projects</h2>
                <button
                    onClick={handleReset}
                    className="reset-button"
                >
                    Reset Filters
                </button>
            </div>

            <div className="filters-grid">
                {/* Search */}
                <div className="filter-full-width">
                    <label className="filter-label">
                        Search Projects
                    </label>
                    <input
                        type="text"
                        placeholder="Search by title, description, or technology..."
                        value={filters.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                        className="input"
                    />
                </div>

                {/* Faculty Filter */}
                <div className="filter-item">
                    <label className="filter-label">
                        Faculty
                    </label>
                    <select
                        value={filters.faculty}
                        onChange={(e) => handleChange('faculty', e.target.value)}
                        className="input"
                    >
                        <option value="">All Faculties</option>
                        {faculties.map((faculty) => (
                            <option key={faculty} value={faculty}>
                                {faculty}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category Filter */}
                <div className="filter-item">
                    <label className="filter-label">
                        Category
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="input"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year Filter */}
                <div className="filter-item">
                    <label className="filter-label">
                        Year
                    </label>
                    <select
                        value={filters.year}
                        onChange={(e) => handleChange('year', e.target.value)}
                        className="input"
                    >
                        <option value="">All Years</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

SearchFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default SearchFilters;
