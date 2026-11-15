import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "recipesAppUser";

function readStoredUser() {
    try {
        const storedUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY));

        if (
            storedUser?.id == null ||
            typeof storedUser.name !== "string" ||
            typeof storedUser.email !== "string"
        ) {
            return null;
        }

        return {
            id: storedUser.id,
            name: storedUser.name,
            email: storedUser.email,
        };
    } catch {
        return null;
    }
}

    function AuthProvider({ children }) {
        const [user, setUser] = useState(readStoredUser);

        useEffect(() => {
            if (user) {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            } else {
                sessionStorage.removeItem(STORAGE_KEY);
            }
        }, [user]);

        async function login(email, password) {
            const response = await fetch("http://localhost:3001/users");
            
            if (!response.ok) {
                throw new Error("Nepavyko prisijungti.");
            }

            const users = await response.json();

            const matchingUser = users.find(
                (candidate) =>
                    candidate.email.trim().toLowerCase() === email.trim().toLowerCase() &&
                    candidate.password === password,
            );

            if (!matchingUser) {
                throw new Error("Neteisingas el. paštas arba slaptažodis.");
            }

            setUser({
                id: matchingUser.id,
                name: matchingUser.name,
                email: matchingUser.email,
            });
        }

        function logout() {
            sessionStorage.removeItem(STORAGE_KEY);
            setUser(null);
        }

        return (
            <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, logout }}>
                {children}
            </AuthContext.Provider>
        );  
    }

    export default AuthProvider;