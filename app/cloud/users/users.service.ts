import { json } from 'web-request';
import { settings } from '../settings/settings.interface';
import { pagination } from '../common/pagination.interface';
import {user} from './user.interface';

class UsersService {
    
    fetchUsersInOgranization(settings: settings, organizationGuid: string, page: number): Promise<pagination<user>> {
        return json(`${settings.cfInstance}/v2/organizations/${organizationGuid}/user_roles`, {
            headers: {
                Authorization: `${settings.token.token_type} ${settings.token.access_token}`
            },
            throwResponseError: true,
            strictSSL: false
        });
    }
}

export let usersService = new UsersService();