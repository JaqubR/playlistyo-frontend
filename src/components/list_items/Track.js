import './Track.css';
import albumCover from '../../img/albumcover.png';

function Track({ artist, title }) {

    const truncateString = longString => longString.length > 34 ? longString.substring(0, 33) + "…" : longString;

    return (
        <div className="track-container">
            <img src={albumCover} alt="track-cover" />
            <div className="track-labels">
                <p className="track-title">{truncateString(title)}</p>
                <p className="track-author">{truncateString(artist)}</p>
            </div>
        </div>
    );
}

export default Track;