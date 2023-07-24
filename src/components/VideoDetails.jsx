import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/ContextApi";
import SuggestionVideoCard from "./SuggestionVideoCard.jsx";

const VideoDetails = () => {
	const [video, setVideo] = useState();
	const [relatedVideo, setRelatedVideo] = useState();
	const { id } = useParams();
	const { setLoading } = useContext(Context);

	useEffect(() => {
		document.getElementById("root").classList.add("custom-h");
		fetchVideoDetails();
		fetchRelatedVideos();
	}, [id]);

	const fetchVideoDetails = () => {
		setLoading(true);
		fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
			console.log(res);
			setVideo(res);
			setLoading(false);
		});
	};
	const fetchRelatedVideos = () => {
		setLoading(true);
		fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
			console.log(res);
			setRelatedVideo(res);
			setLoading(false);
		});
	};
	return (
		<div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
			<div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
				{/* video player div*/}
				<div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
					<div className="h-[200px] md:h-[400px] xl:h-[550px] ml-[-16px] mr-0 lg:ml-[-16px] lg:mr-0">
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${id}`}
							controls
							width={`100%`}
							height={`100%`}
							style={{ backgroundColor: "black" }}
							playing={true}
						/>
					</div>
					<div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
						{video?.title}
					</div>
					<div className="flex justify-between flex-col md:flex-row mt-4">
						<div className="flex">
							<div className="flex w-11 h-11 rouded-fill overflow-hidden items-start">
								<img
									src={video?.author?.avatar[0]?.url}
									alt="avatar"
									className="h-full w-full object-cover "
								/>
							</div>
							<div className="flex flex-col ml-3">
								<div className="text-white text-md font-semibold flex items-center">
									{video?.author?.title}
									{video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
										<BsFillCheckCircleFill className="text-white/[.5] text-[12px] ml-1 " />
									)}
								</div>
								<div className="text-white/[.7] text-sm">
									{video?.author?.stats?.subscribersText}
								</div>
							</div>
						</div>
						<div className="flex text-white mt-4 md:mt-0">
							<div className="flex items-center justify-center bg-white/[.15] h-11 px-6 rounded-3xl ">
								<AiOutlineLike className="text-xl text-white mr-2" />
								<span>{`${abbreviateNumber(
									video?.stats?.likes,
									2
								)} Likes`}</span>
							</div>
							<div className="flex items-center justify-center bg-white/[.15] h-11 px-6 rounded-3xl ml-2 lg:ml-3 xl:ml-4">
								<AiOutlineLike className="text-xl text-white mr-2" />
								<span>{`${abbreviateNumber(
									video?.stats?.views,
									2
								)} views`}</span>
							</div>
						</div>
					</div>
				</div>
				{/* suggestion div */}
				<div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
					{relatedVideo?.contents?.map((item, index) => {
						if (item?.type !== "video") {
							return false;
						}
						return <SuggestionVideoCard key={index} video={item?.video} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default VideoDetails;
