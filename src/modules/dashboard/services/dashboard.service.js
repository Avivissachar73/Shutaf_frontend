import { httpService } from '@/modules/common/services/http.service';

const ENDPOINT = 'dashboard';

export const dashboardService = {
  getDashboardData
}

function getDashboardData() {
  return httpService.get(`${ENDPOINT}/`);
}