import React from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem.jsx";
import { categories } from "../utils/Constant.jsx";
import { Context } from "../context/ContextApi.jsx";

const LeftNav = () => {
	const { selectCategories, setSelectCategories, mobileMenu } =
		React.useContext(Context);
	const navigate = useNavigate();

	const clickHandler = (name, type) => {
		switch (type) {
			case "category":
				return setSelectCategories(name);
			case "home":
				return setSelectCategories(name);
			case "menu":
				return false;
			default:
				break;
		}
	};

	return (
		<div
			className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 md:translate-x-0 transition-all  ${
				mobileMenu === true ? "translate-x-0" : "translate-x-[-240px] "
			}`}
		>
			<div className="flex px-5 flex-col ">
				{categories.map((item, index) => {
					return (
						<React.Fragment key={index}>
							<LeftNavMenuItem
								text={item.type === "home" ? "Home" : item.name}
								icon={item.icon}
								action={() => {
									clickHandler(item.name, item.type);
									navigate("/");
								}}
								className={
									selectCategories === item.name ? "bg-white/[0.15]" : ""
								}
							/>
							{item.divider && <hr className="my-5 border-white/[0.2]" />}
						</React.Fragment>
					);
				})}
				<hr className="my-5 border-white/[0.2]" />
				<div className="text-white/[.5] text-[10px] ">
					Clone by: Sangam Saini
				</div>
			</div>
		</div>
	);
};

export default LeftNav;
