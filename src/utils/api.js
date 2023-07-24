import axios from "axios";
const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
	params: {
		hl: "en",
		gl: "US",
	},
	headers: {
		"X-RapidAPI-Key": "bf5e109920msh134d6586b29435bp17b93cjsn322f9225f553",
		"X-RapidAPI-Host": "youtube138.p.rapidapi.com",
	},
};

export const fetchDataFromApi = async (url) => {
	try {
		const { data } = await axios.get(`${BASE_URL}/${url}`, options);
		return data;
	} catch (error) {
		console.log(error);
	}
};
