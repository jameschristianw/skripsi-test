import { APIClient } from '@liskhq/lisk-api-client';

const API_BASEURL = 'http://192.168.1.18:4000';

export const api = new APIClient([API_BASEURL]);
