import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";


export const UseRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}