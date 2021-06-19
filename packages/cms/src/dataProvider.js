import crudProvider from 'ra-data-nestjsx-crud'
import axios from './axios'

const fetchJson = async function (url, options = {}) {
    try {
        const res =  await axios(url, options);
    return {
        status: res.status,
        headers: res.headers,
        body: null,
        json: res.data
    }
    } catch (error) {
       throw new Error(error.message)
    }
}

const dataProvider = crudProvider('http://localhost:3456',fetchJson);

const myDataProvider = {
    ...dataProvider,
    create: async (resource, params) => {
        if (!params.data.pictures) {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }
        const formData = new FormData();
        formData.append('file', params.data.pictures.rawFile);
        if(resource === 'courses') {
            formData.append('type', 'course-thumb');
        }
        const response = await axios.post('/file', formData);
        const thumbnailUrl = response.data && response.data.data;
        
        if(thumbnailUrl) {
            const { pictures, ...rest } = params.data;
           dataProvider.create(resource, {
               ...params,
                data: {
                    ...rest,
                    thumbnailUrl
                }
           })
        }
        
    }
}


export default myDataProvider;