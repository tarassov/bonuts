import ShareModal from 'modals/share/ShareModal'
import StoreItemModal from 'modals/store/StoreItemModal'


export const SHARE_DIALOG = "SHARE_DIALOG"
export const NEW_STORE_ITEM="NEW_STORE_ITEM"
export const EDIT_STORE_ITEM="EDIT_STORE_ITEM"
const modalList =  {
  SHARE_DIALOG: ShareModal,
  NEW_STORE_ITEM: StoreItemModal,
  EDIT_STORE_ITEM: StoreItemModal,
}



export default modalList;
