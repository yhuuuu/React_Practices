// article apis

import { request } from "@/utils"

// get channel list 
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

// Publish article
export function createAriticleAPI(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

// Get article list
export function getArticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}

// Delete article 
export function deleteArticleAPI(id){
    return request({
        url:`/mp/articles/${id}`,
        method: 'DELETE',
    })
}

//get article info
export function getArticleById(id){
    return request({
        url:`/mp/articles/${id}`,
        method: 'GET',
    })
}