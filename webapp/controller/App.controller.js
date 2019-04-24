sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("my_amazingapptempest.controller.App", {
        onInit: function() {
            var model1 = new sap.ui.model.json.JSONModel();
            model1.loadData("model/FormData.json");
            this.getView().setModel(model1);
            var basicClassStatsTable = this.byId("basicClassStatsTable");
            basicClassStatsTable.bindElement("/All_Classes/0/table_stats/0");
            console.log(basicClassStatsTable);
        },
        onMenuSelect: function(oControlEvent) {
            //console.log(oControlEvent.getSource().sId);
            if (oControlEvent.mParameters.selected === true) {
                MessageToast.show(oControlEvent.getSource().getBindingContext().getProperty('src') + ".jpg");
                var sSelectedSrc = oControlEvent.getSource().getBindingContext().getProperty('src');
                console.log(sSelectedSrc);
                this.getView().getModel().setProperty('/Image_Show/0/src', sSelectedSrc);
            }
            //console.log(oControlEvent.getSource().getBindingContext().getProperty('src'));
        },
        onImageLoad: function() {
            //MessageToast.show("Картинка загрузилась");
        },
        onImageError: function() {
            MessageToast.show("Картинка не работает");
        }
    });
});