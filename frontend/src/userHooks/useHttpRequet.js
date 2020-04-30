import React from "react";
export const useHttpRequest = () => {
    const request = async (url, method = 'GET', body = null, headers = {}) => {
        if (headers['Content-Type'] === 'application/json' ) {
            body = JSON.stringify(body);
        }
        const response = await fetch(url, {method, body, headers});
        return await response.json();

    };
    return {request}
};