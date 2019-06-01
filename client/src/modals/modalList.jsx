import ShareModal from 'modals/share/ShareModal'
import StoreItemModal from 'modals/store/StoreItemModal'
import ConfirmModalView from 'modals/confirm/ConfirmModalView'
import RegardModalView from './regard/RegardModalView';

export const SHARE_DIALOG = "SHARE_DIALOG"
export const NEW_STORE_ITEM="NEW_STORE_ITEM"
export const EDIT_STORE_ITEM="EDIT_STORE_ITEM"
export const CONFIRM_DIALOG="CONFIRM_DIALOG"
export const REGARDS_PRINT="REGARDS_PRINT"
const modalList =  {
  SHARE_DIALOG: ShareModal,
  NEW_STORE_ITEM: StoreItemModal,
  EDIT_STORE_ITEM: StoreItemModal,
  CONFIRM_DIALOG: ConfirmModalView,
  REGARDS_PRINT: RegardModalView
}



export default modalList;
