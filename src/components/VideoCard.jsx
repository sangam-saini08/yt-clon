import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoLength from "../shared/VideoLength";

function VideoCard({ video }) {
	return (
		<Link to={`/video/${video?.videoId}`}>
			<div className="flex flex-col mb-8">
				<div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
					<img
						src={video?.thumbnails?.[0]?.url}
						alt=""
						className="h-full w-full object-cover"
					/>
					{video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
				</div>
				<div className="flex mt-3 text-white">
					<div className="flex items-start">
						<div className="flex h-9 w-9 rounded-full overflow-hidden">
							<img
								src={video?.author?.avatar[0]?.url}
								alt="avtar"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
					<div className="flex flex-col ml-3 overflow-hidden">
						<span className="text-sm font-bold line-clamp-2">
							{video?.title}
						</span>
						<span className="text-[12px] flex items-center mt-2 font-semibold text-white/[.7]">
							{video?.author?.title}
							{video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
								<BsFillCheckCircleFill className="text-white/[.5] text-[12px] ml-1 " />
							)}
						</span>
						<div className="flex text-[12px] text-white/[.7] font-semibold truncate ">
							<span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
							<span className="flex text-[24px] leading-none font-bold text-white/[.7] relative top-[-10px] mx-1">
								.
							</span>
							<span className="truncate">{video?.publishedTimeText}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default VideoCard;
