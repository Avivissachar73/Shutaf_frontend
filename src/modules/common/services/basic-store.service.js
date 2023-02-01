import { alertService } from '@/modules/common/services/alert.service'
import { delay } from '@/modules/common/services/util.service';

const initFilterBy = () => ({
  filter: {
    search: '',
    params: {}
  },
  pagination: {
    page: 0,
    limit: 10,
  },
  sort: {},
});

async function StoreAjax({ commit, dispatch }, { do: toDo, onSuccess, onError, dontDelay = false }) {
  try {
    commit({ type: 'setLoading', val: true });
    if (!dontDelay) await delay(700);
  
    const res = await toDo();
    if (res.err) {
      if (onError) onError(res);
      else throw res;
    }
    else if (onSuccess) onSuccess(res);
  
    commit({ type: 'setLoading', val: false });
    
    if (typeof res === 'object') return JSON.parse(JSON.stringify(res));
    return res;
  } catch(err) {
    console.log(err);
    if (err.err && onError) onError(err);
    else alertService.toast({type: 'danger', msg: `Error ${err.status || 500}: ${err.err || err.message || err.msg || err.error || 'internal error'}`})
    setTimeout(() => {
      commit({ type: 'setLoading', val: false });
    }, 3000);
    throw err;
  }
}

export const basicStoreService = {
  initFilterBy,
  StoreAjax
}