import axios from "axios";

const getDiscography = async (id, page) => {
    let result, err;
    const reqstring = `https://api.discogs.com/artists/${id}/releases?sort=year&sort_order=desc&page=${page}&per_page=100`;
    try {
        let response = await axios.get(reqstring);
        response = response.data;
        result = {
            pages: response.pagination.pages,
            page: response.pagination.page,
            items: response.pagination.items,
            releases: response.releases.map((release) => {
                return {
                    title: release.artist + " - " + release.title,
                    type: 1,
                    id: release.main_release ? release.main_release : release.id,
                    master_id: release.main_release ? release.id : 0,
                    year: release.year,
                };
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

export default getDiscography;
