import ShareModal from "modals/share/ShareModal";
import ConfirmModalView from "modals/confirm/ConfirmModalView";
import DepartmentModal from "./department/DepartmentModal";
import ProfileModal from "./profile/ProfileModal";
import ProfilePreviewModal from "./profile/ProfilePreviewModal";
import EventModal from "./event/EventModal";
import SchedulerModal from "./scheduler/SchedulerModal";
import PluginModal from "./plugin/PluginModal";
import PurchasePreviewModal from "./purchase/PurchasePreviewModal";
import AskNumberView from "modals/confirm/AskNumberView";
import ImagePreviewModal from "modals/image/ImagePreviewModal";

export const SHARE_DIALOG = "SHARE_DIALOG";
export const NEW_STORE_ITEM = "NEW_STORE_ITEM";
export const EDIT_STORE_ITEM = "EDIT_STORE_ITEM";
export const CONFIRM_DIALOG = "CONFIRM_DIALOG";
export const REQUESTS_PRINT = "REQUESTS_PRINT";
export const EDIT_DEPARTMENT = "EDIT_DEPARTMENT";
export const PROFILE_EDIT = "PROFILE_EDIT";
export const PROFILE_PREVIEW = "PROFILE_PREVIEW";
export const EDIT_SCHEDULER = "EDIT_SCHEDULER";
export const EVENT = "EVENT";
export const PURCHASE_PREVIEW = "PURCHASE_PREVIEW";
export const EDIT_PLUGIN = "EDIT_PLUGIN";
export const ASK_NUMBER = "ASK_NUMBER";
export const IMAGE_PREVIEW ="IMAGE_PREVIEW";

const modalList = {
  SHARE_DIALOG: ShareModal,
  CONFIRM_DIALOG: ConfirmModalView,
  ASK_NUMBER: AskNumberView,
  EDIT_DEPARTMENT: DepartmentModal,
  PROFILE_EDIT: ProfileModal,
  PROFILE_PREVIEW: ProfilePreviewModal,
  EDIT_SCHEDULER: SchedulerModal,
  EVENT: EventModal,
  PURCHASE_PREVIEW: PurchasePreviewModal,
  EDIT_PLUGIN: PluginModal,
  IMAGE_PREVIEW: ImagePreviewModal
};

export default modalList;
