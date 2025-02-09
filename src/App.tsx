import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import { useEffect } from "react";

const App = () => {

    useEffect(() => {
        // Dynamically create and append the chatbot script with custom attributes
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.defer = true;
        script.setAttribute("chatbotId", "qnladmNzh53489A3MRfxR");
        script.setAttribute("domain", "www.chatbase.co");
        document.body.appendChild(script);
    
        // Cleanup: Remove the script when the component is unmounted
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                </Routes>
            </Router>
            <Toast /> {/* Toast component from react-hot-toast */}
        </>
    )
}

export default App
