// article apis

import { request } from "@/utils"

// get channel list 
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

// Piulish article
export function createAriticleAPI(data) {
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

// Get article list
export function getAticleListAPI(params) {
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}