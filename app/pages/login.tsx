import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded login logic
        if (username && password) {
            navigation.navigate("planner" as never);
        } else {
            alert('Please enter username and password');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '10px', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;