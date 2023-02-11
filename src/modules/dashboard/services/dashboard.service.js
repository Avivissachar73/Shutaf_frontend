import { httpService } from '@/modules/common/services/http.service';

const ENDPOINT = 'dashboard';

export const dashboardService = {
  getDashboardData,
  getOrganizationStats
}

function getDashboardData() {
  return httpService.get(`${ENDPOINT}/`);
}


function getOrganizationStats(organizationId) {
  return httpService.get(`${ENDPOINT}/organization/${organizationId}/stats`);
}