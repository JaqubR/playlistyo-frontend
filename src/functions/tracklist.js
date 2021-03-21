import axios from "axios";

const getTracklist = async (id, master_id) => {
    let result, err;
    const reqstring = `https://api.discogs.com/${
        master_id !== null && master_id !== 0 ? "master" : "release"
    }s/${id}`;
    try {
        let response = await axios.get(encodeURI(reqstring));
        response = response.data;
        result = {
            title: response.title,
            artist: response.artists[0].name,
            tracklist: response.tracklist.map((track) => {
                return track.title;
            }),
        };
    } catch (error) {
        err = error;
    }
    return new Promise((resolve, reject) => {
        if (err) reject(err);
        else resolve(result);
    });
};
export default getTracklist;
