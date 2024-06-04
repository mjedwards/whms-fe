import Image from "next/image";
import React from "react";
import logo from "../../assets/noBG.png"

interface LogoProps {
	w: number;
	h: number;
}
export const Logo: React.FC<LogoProps> = ({w, h}) => {
	return (
		<>
			<Image
				src={logo}
				alt='warm hearts mentorship service'
				width={w}
				height={h}
			/>
		</>
	);
};
