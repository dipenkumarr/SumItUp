import { logo } from "../assets";

const Hero = () => {
	return (
		<header className="w-full flex justify-center items-center flex-col">
			<nav className="flex justify-between items-center w-full mb-10 pt-6">
				<h1 className="text-white/95 font-satoshi font-extrabold text-4xl">
					SumItUp.
				</h1>
				<button
					type="button"
					onClick={() =>
						window.open("https://github.com/dipenkumarr/SumItUp")
					}
					className="black_btn"
				>
					GitHub
				</button>
			</nav>
			<h1 className="head_text text-white/95">
				Summarize Websites with <br className="max-md:hidden" />
				<span className="bg-gradient-to-r from-blue-300 via-indigo-500 to-purple-400 text-transparent bg-clip-text">
					Hugging Face Models
				</span>
			</h1>

			<h2 className="desc">
				This application uses advanced Hugging Face models to summarize
				long articles into concise summaries, helping users quickly
				understand the main points.
			</h2>
		</header>
	);
};

export default Hero;
