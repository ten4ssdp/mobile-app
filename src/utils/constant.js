import config from '../../config/env.config';

export const BASE_URL = config.staging.BASE_URL || 'http://3.10.224.110:5000/ap';
export const BASE_API_URL = `${BASE_URL}/api`;
export const cancelled = 'Annulée';
export const done = 'Effectuée';
export const toDo = 'Non effectuée';
