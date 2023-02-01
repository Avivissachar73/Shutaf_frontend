import { httpService } from '@/modules/common/services/http.service';

const ENDPOINT = 'settings';

export const settingsService = {
  getSettings,
  updateSettings
}

function getSettings() {
  return httpService.get(`${ENDPOINT}/`);
}
function updateSettings(settingsToUpdate) {
  return httpService.put(`${ENDPOINT}/`, settingsToUpdate);
}