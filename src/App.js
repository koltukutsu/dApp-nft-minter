import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";

const App = () => {
  return (
    <div className="flex flex-col justify-center align-top space-y-10">
      <Head />
      <Body />
    </div>
  );
};

export default App;
