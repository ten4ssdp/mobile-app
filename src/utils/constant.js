import config from '../../config/env.config';

export const BASE_API_URL = config.staging.BASE_URL || 'http://3.10.224.110:5000/api';
export const cancelled = 'Annulée';
export const done = 'Effectuée';
export const toDo = 'Non effectuée';
