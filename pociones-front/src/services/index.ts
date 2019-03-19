const Services = ({ axios }: any) => ({
    auth: {
        login: (payload: object) => axios.post('auth/login', payload),
        logout: () => axios.post('auth/logout'),
        register: (payload: object) => axios.post('auth/register', payload),
    },
    potions: {
        get: (id: any) => axios.get(`potion/${id}`),
        add: (payload: any) => axios.post('potion', payload),
        search: (...params: any[]) => axios.get('potions', ...params),
        delete: (id: any) => axios.delete(`potion/${id}`),
        addToFavorites: (id: any) => axios.put(`potion/${id}`),
    },
    generic: {
        get: (params: any) => axios({
            method: 'GET',
            url: params.endpoint,
            params: params.params,
            data: params.data,
        }),
        put: (endpoint: string, data: any) => axios({
            method: 'PUT',
            url: endpoint,
            data,
        }),
        post: (endpoint: string, data: any) => axios.post(endpoint, data),
        search: (endpoint: string, ...params: any[]) => axios.get(endpoint, ...params),
        delete: (endpoint: string) => axios({
            method: 'DELETE',
            url: endpoint,
        }),
    },
    });


export default Services;


