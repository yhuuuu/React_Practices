// article apis

import { request } from "@/utils"

// get channel list 
export function getChannelAPI() {
    return request({
        url: '/channels',
        method: 'GET'
    })
}

export function createAriticleAPI(data) {
    return request({
        url:'/mp/articles?draft=false',
        method:'POST',
        data
    })
}