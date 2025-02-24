import { useNavigate } from 'react-router-dom';

function RecordPage() {
    const navigate = useNavigate(); // Hook for navigation

    const handleBackToHomepage = () => {
        navigate('/'); // Navigate back to the homepage
    };

    return (
        <div className="text-center mt-5">
            <h2>Recording Page</h2>
            <p>This is a placeholder for the recording functionality.</p>
            <button 
                className="btn btn-primary" 
                onClick={handleBackToHomepage}
            >
                Return to Homepage
            </button>
        </div>
    );
}

export default RecordPage; 