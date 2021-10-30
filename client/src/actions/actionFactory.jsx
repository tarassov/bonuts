import * as actionTypes from "./actionTypes";
import * as apiCaller from "actions/apiCaller";
import pluralize from "pluralize";
import { defaultCallback } from "notifiers/notifierFactory";

export default class ActionFactory {
  constructor(api, name = undefined) {
    this.nameUpper = api.itemName.toUpperCase();
    if (name != undefined) {
      this.actionOject = name;
    } else {
      this.actionOject = this.nameUpper;
    }
    this.nameLower = api.itemName.toLowerCase();
    this.api = api;
  }

  loadItems(args = {}) {
    var loadFunction = function (dispatch) {
      const options = {
        useToken: true,
        action: "load",
        name: pluralize.plural(this.api.itemName),
        apiFunction: this.api.loadItems,
        args: [args],
      };
      return apiCaller.callApi(dispatch, options).then((json) => {
        let items = json[pluralize.plural(this.nameLower)];

        if (items === undefined) {
          items = [];
        }
        if (args.page !== undefined) {
          let pagination = {
            page: args.page,
            per_page: json.headers.get("per-page"),
            total: json.headers.get("total"),
            request_date: json.headers.get("request_date"),
          };
          if (args.page === 0 || args.page === 1) {
            apiCaller.apiResult(
              dispatch,
              actionTypes.loadSuccess(pluralize.plural(this.actionOject)),
              { items: items, ...pagination },
              () => {
                return { items: [] };
              }
            );
          } else {
            apiCaller.apiResult(
              dispatch,
              actionTypes.addSuccess(pluralize.plural(this.actionOject)),
              { items: items, ...pagination },
              () => {
                return { items: [] };
              }
            );
          }
        } else {
          apiCaller.apiResult(
            dispatch,
            actionTypes.loadSuccess(pluralize.plural(this.actionOject)),
            { items: items },
            () => {
              return { items: [] };
            }
          );
        }
      });
    };
    return loadFunction.bind(this);
  }

  getItem(id, callback = undefined) {
    var getFunction = function (dispatch) {
      const options = {
        useToken: true,
        action: "get",
        name: this.api.itemName,
        apiFunction: this.api.getItem,
        args: [id],
      };

      return apiCaller.callApi(dispatch, options).then((json) => {
        apiCaller.apiResult(
          dispatch,
          actionTypes.getSuccess(this.actionOject),
          { item: json[this.nameLower] }
        );
        if (callback !== undefined && callback.success !== undefined) {
          callback.success(dispatch, json[this.nameLower]);
        }
      });
    };
    return getFunction.bind(this);
  }

  addItem(item, callback = undefined) {
    var addFunction = function (dispatch) {
      const options = {
        useToken: true,
        action: "add",
        name: this.api.itemName,
        apiFunction: this.api.addItem,
        args: [item],
      };

      return apiCaller.callApi(dispatch, options).then((json) => {
        let item
        if (json[pluralize.plural(this.actionOject)] !== undefined && json[pluralize.plural(this.actionOject)].isArray){
           item = json[pluralize.plural(this.actionOject)][0]
        }
        else{
          item  = json[this.actionOject.toLowerCase()] 
        }
    
        apiCaller.apiResult(
          dispatch,
          actionTypes.addSuccess(this.actionOject),
          { item: item }
        );
        if (callback !== undefined && callback.success !== undefined) {
          callback.success(dispatch);
        } else {
          defaultCallback.success(dispatch, this.api.itemName, "added");
        }
      });
    };
    return addFunction.bind(this);
  }

  updateItem(item, callback = undefined) {
    var editFunction = function (dispatch) {
      const options = {
        useToken: true,
        action: "update",
        name: this.api.itemName,
        apiFunction: this.api.updateItem,
        args: [item],
      };

      return apiCaller.callApi(dispatch, options).then((json) => {
        let items = json[pluralize.plural(this.nameLower)];
        if (items !== undefined) {
          items.forEach((item) => {
            apiCaller.apiResult(
              dispatch,
              actionTypes.updateSuccess(this.actionOject),
              { item: item }
            );
          });
        } else {
          apiCaller.apiResult(
            dispatch,
            actionTypes.updateSuccess(this.actionOject),
            { item: json[this.nameLower] }
          );
        }
        if (callback !== undefined && callback.success !== undefined) {
          callback.success(dispatch);
        }
      });
    };
    return editFunction.bind(this);
  }

  commentItem(params, callback) {
    var commentFunction = function (dispatch) {
      const options = {
        useToken: true,
        action: "comment",
        name: this.api.itemName,
        apiFunction: this.api.commentItem,
        args: [params.item, params.comment],
      };

      return apiCaller.callApi(dispatch, options).then((json) => {
        apiCaller.apiResult(
          dispatch,
          actionTypes.updateSuccess(this.actionOject),
          { item: json[this.nameLower] }
        );
        if (callback !== undefined && callback.success !== undefined) {
          callback.success(dispatch);
        }
      });
    };
    return commentFunction.bind(this);
  }

  deleteItem(item) {
    var deleteFunction = function (dispatch) {
      const options = {
        useToken: true,
        action: "delete",
        name: this.api.itemName,
        apiFunction: this.api.updateItem,
        args: [item],
      };

      return apiCaller.callApi(dispatch, options).then((json) => {
        apiCaller.apiResult(
          dispatch,
          actionTypes.deleteSuccess(this.actionOject),
          { item: json[this.nameLower] }
        );
      });
    };
    return deleteFunction.bind(this);
  }
}
