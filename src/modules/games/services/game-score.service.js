import { httpService } from '@/modules/common/services/http.service';

const ENDPOINT = 'game-score';

export const gameScoreService = {
  query,
  get,
  add,
  update,
  save,
  remove,
  getEmptyItem
}

function query(filterBy) {
  return httpService.get(`${ENDPOINT}`, filterBy);
}
function get(id) {
  if (!id) return getEmptyItem();
  return httpService.get(`${ENDPOINT}/${id}`);
}
function add(post) {
  return httpService.post(`${ENDPOINT}`, post);
}
function update(post) {
  return httpService.put(`${ENDPOINT}`, post);
}
function remove(id) {
  return httpService.delete(`${ENDPOINT}/${id}`);
}
function save(post) {
  return post._id? update(post) : add(post);
}


function getEmptyItem() {
  return {
    score: 0,
    data: {}
  }
}