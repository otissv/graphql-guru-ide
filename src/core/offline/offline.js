import { SET_OFFLINE_STATUS } from './constant-offline';

export function setOfflineStatus (status) {
  return {
    type: SET_OFFLINE_STATUS,
    payload: status
  };
}
