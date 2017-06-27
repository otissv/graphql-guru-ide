import { localAuth } from '../local/services-local';
import { promise } from './promise';

export default function canAccess (action) {
  const roles = localAuth().roles.split(',');

  return promise((resolve, reject) => {
    window.app.db
      .get('localReducer')
      .then(doc => {
        const viewRoles = doc.state.localViewActions[action].roles;
        for (let i = 0; i < roles.length; i++) {
          const role = roles[i];
          if (viewRoles.includes(role)) return resolve(true);
        }

        return resolve(true);
      })
      .catch(errors => {
        if (errors.status === '404') {
          resolve(true);
        } else {
          reject(errors);
        }
      });
  });
}
