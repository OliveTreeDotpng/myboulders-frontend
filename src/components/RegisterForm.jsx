import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authApi";
import { uploadImageToImgur } from "../services/imageApi";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let profile_image_url = null;

            // Upload profile image to Imgur if selected
            if (profileImage) {
                const formData = new FormData();
                formData.append("file", profileImage);

                const result = await uploadImageToImgur(formData);
                profile_image_url = result.image_url;
            }

            // Register user
            await register({
                username,
                password,
                email,
                birthdate,
                profile_image_url,
            });

            // Redirect to login page
            navigate("/login");
        } catch (error) {
            setErrorMessage(
                error.response?.data?.error || "Registration failed. Please try again."
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Birthdate:</label>
                <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Profile image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                />
            </div>

            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;
