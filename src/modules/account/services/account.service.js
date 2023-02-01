import { httpService } from '@/modules/common/services/http.service';

const ENDPOINT = 'account';

export const accountService = {
  query,
  get,
  add,
  update,
  save,
  getEmptyAccount
}

function query(filterBy) {
  return httpService.get(ENDPOINT, filterBy);
}
function get(id) {
  // if (!id) return getEmptyAccount();
  return httpService.get(`${ENDPOINT}/${id}`);
}
function add(user) {
  return httpService.post(ENDPOINT, user);
}
function update(user) {
  return httpService.put(ENDPOINT, user);
}
function save(user) {
  return user._id? update(user) : add(user);
}


function getEmptyAccount() {
  return {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    roles: ['user'],
    organizations: []
  }
}