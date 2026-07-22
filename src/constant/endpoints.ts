export const baseUrl = "http://127.0.0.1:8000/"
export const supabaseBucket = "FishKinetic"

export const getActivitiesUrl = baseUrl + 'api/activity/activities'
export const postActiveUrl = baseUrl + 'api/activity'

export const getOneActiveUrl = postActiveUrl + '/get_one'

export const postFishUrl = baseUrl + 'api/fish'
export const getFishsUrl = baseUrl + 'api/fish/fishs'

export const postFileUrl = postFishUrl + '/set_file_data'

export const updateFishUrl = baseUrl + 'api/fish/modify/'
export const updateActivityUrl = baseUrl + 'api/activity/modify/'