const config = {
    create: {
        userData: {
            in: ['body'],
            required: true,
            isObject: true,
            custom: (userData) => {
                console.log('Inside custom funaton in update', userData);
            },
        }
    },
    delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params']
        }
    },
    get: {
        skip: {
            required: false,
            default: 0,
            number: true,
            in: ['query'],
            errorMessage: 'Skip is invalid',
        },
        limit: {
            required: false, default: 10, number: true, in: ['query'],
            errorMessage: 'Limit is invalid',
        }
    },
    update: {
        originalId: {
            required: true,
            string: true,
            in: ['body']
        },
        dataToUpdate: {
            in: ['body'],
            required: true,
            isObject: true,
            custom: (dataToUpdate) => {
                console.log('Inside custom funaton in update', dataToUpdate);
            },
        }
    }
};

export default config;