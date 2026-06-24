import { useState } from "react";

export function useClientSession() {
    const [clientId] = useState<string>(() => {
        // 1. Check if an ID already exists for this tab session
        const existingId = window.sessionStorage.getItem("client_id");
        if (existingId) return existingId;

        // 2. Generate a native, secure UUID v4 if none exists
        // Supported natively in all modern environments (Edge, Chrome, Safari, Firefox)
        const newId = crypto.randomUUID();

        // 3. Commit it to storage immediately
        window.sessionStorage.setItem("client_id", newId);
        return newId;
    });

    return clientId;
}