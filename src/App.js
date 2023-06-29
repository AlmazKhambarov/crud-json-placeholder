import Layout from "./layout/Layout";
import Routers from "./Routers/routers";
import "./App.scss";
import Header from "./components/Layout/Header/Header";

function App() {
	return (
		<div className="app">
			<div className="app__left">
				<Layout />
			</div>
			<div className="app__right">
				<Header />
				<Routers />
			</div>
		</div>
	);
}

export default App;
