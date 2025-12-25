import BottomNav from "./components/layout/BottomNav";
import Home from "./pages/Home";
import TopBar from "./components/layout/TopBar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      {/* centered app container */}
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <Home />
      </div>

      <BottomNav />
    </div>
  );
}

export default App;
