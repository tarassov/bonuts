import ShareModal from 'modals/share/ShareModal'
import StoreItemModal from 'modals/store/StoreItemModal'
import ConfirmModalView from 'modals/confirm/ConfirmModalView'
import RegardModalView from './regard/RegardModalView';
import DepartmentModal  from './department/DepartmentModal';
import  ProfileModal  from './profile/ProfileModal';
import  ProfilePreviewModal  from './profile/ProfilePreviewModal';
import  EventModal  from './event/EventModal';
import  SchedulerModal  from './scheduler/SchedulerModal';

export const SHARE_DIALOG = "SHARE_DIALOG"
export const NEW_STORE_ITEM="NEW_STORE_ITEM"
export const EDIT_STORE_ITEM="EDIT_STORE_ITEM"
export const CONFIRM_DIALOG="CONFIRM_DIALOG"
export const REGARDS_PRINT="REGARDS_PRINT"
export const EDIT_DEPARTMENT ="EDIT_DEPARTMENT"
export const  PROFILE_EDIT="PROFILE_EDIT"
export const  PROFILE_PREVIEW="PROFILE_PREVIEW"
export const EDIT_SCHEDULER='EDIT_SCHEDULER'
export const  EVENT="EVENT"


const modalList =  {
  SHARE_DIALOG: ShareModal,
  NEW_STORE_ITEM: StoreItemModal,
  EDIT_STORE_ITEM: StoreItemModal,
  CONFIRM_DIALOG: ConfirmModalView,
  REGARDS_PRINT: RegardModalView,
  EDIT_DEPARTMENT: DepartmentModal,
  PROFILE_EDIT: ProfileModal,
  PROFILE_PREVIEW: ProfilePreviewModal,
  EDIT_SCHEDULER: SchedulerModal,
  EVENT: EventModal
}



export default modalList;
