import { RouterProvider } from "react-router-dom";
import { KorisnikProvider } from "./context/KorisnikContext.jsx";
import { router } from "./router.jsx";
export default function App() {
  return (
    <KorisnikProvider>
      <RouterProvider router={router} />
    </KorisnikProvider>
  );
}
