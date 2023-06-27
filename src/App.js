import Layout from "./layout/Layout";
import Routers from "./Routers/routers";
import "./App.scss";
import Header from "./components/Layout/Header/Header";

function App() {
	return (
		<div className="app">
			<Layout />
			<div className="app__inside">
				<Header />
				<Routers />
			</div>
		</div>
	);
}

export default App;
