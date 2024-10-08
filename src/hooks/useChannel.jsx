import { useEffect, useState } from 'react'
import { getChannelAPI } from '@/api/article'

const useChannel = () => {
    //get channel list 
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])

    return {
        channelList
    }
}
export default useChannel