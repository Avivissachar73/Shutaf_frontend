// The role of this file is to gather all the outsource libs of the game modules together, so it will be eas to be moved from project to project;

import { Utils as _Utils } from '@/modules/common/services/util.service.js';
import { EventEmiter as _EventEmiter } from '@/modules/common/services/event-emmiter.service.js';
import { alertService } from '@/modules/common/services/alert.service.js';

export const Utils = _Utils;
export const EventEmiter = _EventEmiter;
export const A_Alert = alertService.A_Alert;