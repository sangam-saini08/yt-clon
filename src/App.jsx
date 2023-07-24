import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContext from "./context/ContextApi.jsx";
import Header from "./components/Header.jsx";
import Feed from "./components/Feed.jsx";
import SearchResult from "./components/SearchResult.jsx";
import VideoDetails from "./components/VideoDetails.jsx";

const App = () => {
	return (
		<AppContext>
			<BrowserRouter>
				<div className="flex flex-col h-full">
					<Header />
					<Routes>
						<Route path="/" exact Component={Feed} />
						<Route path="/searchResult/:searchQuery" Component={SearchResult} />
						<Route path="/video/:id" Component={VideoDetails} />
					</Routes>
				</div>
			</BrowserRouter>
		</AppContext>
	);
};

export default App;
