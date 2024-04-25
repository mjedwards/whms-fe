import Image from "next/image";
import React from "react";
import logo from "../../assets/noBG.png"

export const Logo = () => {
	return (
		<>
			<Image
				src={logo}
				alt='warm hearts mentorship service'
				width={50}
				height={50}
			/>
		</>
	);
};
