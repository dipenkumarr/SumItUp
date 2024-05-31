import "./App.css";
import Hero from "./components/Hero";
import Demo from "./components/Demo";

function App() {
	return (
		<main>
			<div className="main">
				<div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
			</div>
			<div className="app">
				<Hero />
				<Demo />
			</div>
		</main>
	);
}

export default App;
