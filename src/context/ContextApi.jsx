import React, { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
export const Context = createContext();

const AppContext = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const [selectCategories, setSelectCategories] = useState("New");
	const [mobileMenu, setMobileMenu] = useState(true);

	useEffect(() => {
		fetchSelectedCategoryData(selectCategories);
	}, [selectCategories]);

	const fetchSelectedCategoryData = (query) => {
		setLoading(true);
		fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
			console.log(contents);
			setSearchResult(contents);
			setLoading(false);
		});
	};

	return (
		<Context.Provider
			value={{
				loading,
				setLoading,
				searchResult,
				setSearchResult,
				selectCategories,
				setSelectCategories,
				mobileMenu,
				setMobileMenu,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default AppContext;
