import axios from 'axios';

const api = axios.create({
    baseURL: "https://dev-connect-api-eta.vercel.app", // Adjust the base URL as needed
});

// Interceptor to add token to headers
api.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
    return req;
});

export const signup = async (userData) => {
    try {
        const res = await api.post('/api/signup', userData);
        localStorage.setItem('token', JSON.stringify(res.data.token)); // Store the token in localStorage
        localStorage.setItem('user', JSON.stringify(res.data.result)); // Store user data if needed
        navigate('/home'); // Redirect to home or another page after successful sign-up
        return res.data; // Return the response data if needed
    } catch (error) {
        console.error('Error during signup:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export const signin = async (userData, navigate) => {
    try {
        const res = await api.post('/api/signin', userData);
        localStorage.setItem('token', JSON.stringify(res.data.token)); // Store the token in localStorage
        localStorage.setItem('user', JSON.stringify(res.data.result)); // Store user data if needed
        navigate('/home'); // Redirect to home or another page after successful sign-in
        return res.data; // Return the response data if needed
    } catch (error) {
        console.error('Error during signin:', error);
        throw error; // Re-throw the error for further handling if needed
    }

}

export const editProfile = async (userData, navigate) => {
    try {
        const userId = JSON.parse(localStorage.getItem('user'))._id; // Get user ID from localStorage
        if (!userId) {
            navigate('/')
            throw new Error('User ID not found in localStorage');
        }
        const res = await api.post(`/api/edit-profile/${userId}`, userData);
        localStorage.setItem('user', JSON.stringify(res.data.result)); // Update user data in localStorage
        navigate('/home'); // Redirect to profile page after successful edit
        return res.data; // Return the updated user data if needed
    } catch (error) {
        console.error('Error during profile edit:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export const addProject = async (projectData) => {
    try {
        const userId = JSON.parse(localStorage.getItem('user'))._id; // Get user ID from localStorage
        if (!userId) {
            navigate('/')
            throw new Error('User ID not found in localStorage');
        }
        const res = await api.post(`/api/add-project/${userId}`, projectData);
        return res.data; // Return the added project data if needed
    } catch (error) {
        console.error('Error during adding project:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}

// export const searchProjects = async (query) => {
//     try {
//         const res = await api.get(`/api/search-projects?query=${query}`);
//         return res.data; // Return the search results if needed
//     } catch (error) {
//         console.error('Error during project search:', error);
//         throw error; // Re-throw the error for further handling if needed
//     }
// }

export const fetchProjects = async () => {
    try {
        const res = await api.get('/api/fetchProjects')
        return res.data;
    } catch (error) {
        console.error('Error during fetching projects:', error);
        throw error; // Re-throw the error for further handling i
    }
}

export const commentProject = async (projectId, comment) => {
    try {
        let userId = JSON.parse(localStorage.getItem('user'))._id; // Get user ID from localStorage
        const res = await api.post(`/api/comment-project/${projectId}`, { comment , userId });
        return res.data;
    } catch (error) {
        console.error('Error during commenting on project:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}
