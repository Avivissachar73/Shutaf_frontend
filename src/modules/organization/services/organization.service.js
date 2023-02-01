import { httpService } from '@/modules/common/services/http.service';

const ENDPOINT = 'organization';

export const organizationService = {
  query,
  get,
  add,
  update,
  save,
  remove,
  getEmptyOrganization,
  inviteAccount,
  updateAccountStatus
}

function query(filterBy) {
  return httpService.get(ENDPOINT, filterBy);
}
function get(id) {
  if (!id) return getEmptyOrganization();
  return httpService.get(`${ENDPOINT}/${id}`);
}
function add(item) {
  return httpService.post(ENDPOINT, item);
}
function update(item) {
  return httpService.put(ENDPOINT, item);
}
function remove(id) {
  return httpService.delete(`${ENDPOINT}/${id}`);
}
function save(item) {
  return item._id? update(item) : add(item);
}



function inviteAccount(organizationId, accountId) {
  return httpService.post(`${ENDPOINT}/${organizationId}/invite/${accountId}`);
}
function updateAccountStatus(organizationId, accountId, newStatus) {
  return httpService.post(`${ENDPOINT}/${organizationId}/update-status/${accountId}`, { newStatus });
}




function getEmptyOrganization() {
  return {
    name: '',
    desc: ''
  }
}