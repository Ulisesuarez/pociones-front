const Services = ({ axios }: any) => ({
    auth: {
        login: (payload: object) => axios.post('auth/login', payload),
        logout: () => axios.post('auth/logout'),
    },
    potions: {
        get: (id: any) => axios.get(`potion/${id}`),
        add: (payload: any) => axios.post('potion', payload),
        search: (...params: any[]) => axios.get('potions', ...params),
        delete: (id: any) => axios.delete(`potion/${id}`),
        addToFavorites: (id: any) => axios.put(`potion/${id}`),
    },
    generic: {
        get: (endpoint: string) => axios.get(endpoint),
        post: (endpoint: string) => axios.get(endpoint),
        put: (endpoint: string, payload: object) => axios.get(endpoint),
        delete: (endpoint: string) => axios.get(endpoint),
    },
});

export default Services;


