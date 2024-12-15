import { useState } from 'react';
import './info.css';

function Ok() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        name: '',
        imgUrl: '',
        github: '',
        linkedin: ''
    });

    // Open Modal and set developer data
    const openModal = (name, imgUrl, github, linkedin) => {
        console.log('Modal Opened for:', name);  // Debugging line
        setModalData({ name, imgUrl, github, linkedin });
        setModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Back Button functionality
    const goBack = () => {
        window.history.back();
    };

    return (
        <>
            <video className="background-video" autoPlay muted loop>
                <source src="src/assets/bg4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="info-container" id="infoContainer">
                <h1>Developers</h1>

                {/* Developer 1 */}
                <div className="developer" onClick={() => { console.log('Clicked Aditya'); openModal('Aditya Priyadarshi', 'src/assets/aditya.jpeg', 'https://github.com/Adityapriyadarshix007', 'https://www.linkedin.com/in/aditya-priyadarshi-026816282'); }}>
                    <img src="src/assets/aditya.jpeg" alt="Aditya Priyadarshi" />
                    <div className="developer-info">
                        <p className="developer-name">Aditya Priyadarshi</p>
                    </div>
                </div>

                {/* Developer 2 */}
                <div className="developer" onClick={() => openModal('Yashvardhan Singh Sarangdevot', 'https://via.placeholder.com/100', 'https://github.com/SapairOg', 'https://www.linkedin.com/in/yashvardhan-singh-sarangdevot-07497328b')}>
                    <img src="https://via.placeholder.com/80" alt="Yashvardhan Singh Sarangdevot" />
                    <div className="developer-info">
                        <p className="developer-name">Yashvardhan Singh Sarangdevot</p>
                    </div>
                </div>

                {/* Developer 3 */}
                <div className="developer" onClick={() => openModal('Chinmay Bhardwaj', 'https://via.placeholder.com/100', 'https://github.com/chinmay', 'https://linkedin.com/in/chinmay')}>
                    <img src="https://via.placeholder.com/80" alt="Chinmay Bhardwaj" />
                    <div className="developer-info">
                        <p className="developer-name">Chinmay Bhardwaj</p>
                    </div>
                </div>

                {/* Developer 4 */}
                <div className="developer" onClick={() => openModal('Pratyush Kumar', 'src/assets/pratyush.jpeg', 'https://github.com/pratyushkumar-1', 'https://www.linkedin.com/in/pratyush-kumar-b4b593331')}>
                    <img src="src/assets/pratyush.jpeg" alt="Pratyush Kumar" />
                    <div className="developer-info">
                        <p className="developer-name">Pratyush Kumar</p>
                    </div>
                </div>

                {/* Developer 5 */}
                <div className="developer" onClick={() => openModal('Shriya Dhawan', 'https://via.placeholder.com/100', 'https://github.com/shriya', 'https://linkedin.com/in/shriya')}>
                    <img src="https://via.placeholder.com/80" alt="Shriya Dhawan" />
                    <div className="developer-info">
                        <p className="developer-name">Shriya Dhawan</p>
                    </div>
                </div>

                {/* Back Button */}
                <button className="back-button" onClick={goBack}>Back</button>
            </div>

            {/* Modal Structure */}
            {isModalOpen && (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img id="modalImage" src={modalData.imgUrl} alt="Developer Image" />
                        <h2 id="modalName">{modalData.name}</h2>
                        <div className="social-media">
                            <a id="githubLink" href={modalData.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a id="linkedinLink" href={modalData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Section */}
            <div className="footer" id="footer">
                <p>VIT Bus Tracking Corporation © 2024</p>
            </div>
        </>
    );
}

export default Ok;
