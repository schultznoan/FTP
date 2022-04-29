import instance from '@api/core';

export const shippingMethods = {
    url: '/shipping',
    async incrementMethods() {
        try {
            return await instance({ url: this.url });
        } catch (err) {
            throw err;
        };
    },
};