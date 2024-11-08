import api from "../api.js"
import useAuth from "../hooks/useAuth.js"

export default function NotApproved() {
    const { user } = useAuth();
    const handleRequest = async () => {
        try {
            const response = await api.post("/users/request-approval", {
                publicAddress: user?.publicAddress
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Error requesting approval:", error);
        }
    }

    return (
        <div>
            <div>Not Approved yet please wait</div>
            <button onClick={handleRequest} className="border p-2 rounded-md">Request Approve</button>
        </div>

    )
}