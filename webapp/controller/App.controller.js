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
            basicClassStatsTable.bindElement("/All_Classes/0");
            console.log(basicClassStatsTable);
        },
        onMenuSelect: function(oControlEvent) {
            //console.log(oControlEvent.getSource().sId);
            if (oControlEvent.mParameters.selected === true) {
                //MessageToast.show(oControlEvent.getSource().getBindingContext().getProperty('src') + ".jpg");
                var sSelectedSrc = oControlEvent.getSource().getBindingContext().getProperty('src');

                this.getView().getModel().setProperty('/Image_Show/0/src', sSelectedSrc);

                var selectedClass = oControlEvent.getSource().getBindingContext().getProperty('class');
                var changeBasicClassStatsTable = this.byId("basicClassStatsTable");
                var checker = 0;
                var bindRoot;
                switch (selectedClass) {
                    case 'Warrior':
                        checker = 0;
                        break;
                    case 'Wizard':
                        checker = 1;
                        break;
                    case 'Paladin':
                        checker = 2;
                        break;
                };
                bindRoot = "/All_Classes/" + checker;
                changeBasicClassStatsTable.bindElement(bindRoot);
                //console.log(bindRoot);


            }
            //console.log(oControlEvent.getSource().getBindingContext().getProperty('src'));
        },
        startStatBonusButtonPlus: function(oEvent) {
            let sPath = oEvent.getSource().getBindingContext().getPath();

            let sStartValue = oEvent.getSource().getBindingContext().getProperty('start_value');
            let sStartStatBonus = oEvent.getSource().getBindingContext().getProperty('start_stat_bonus');         
            let basicBonusPoints = this.getView().getModel().getProperty('/Basic_Bonus_Points/0/points');
            console.log(basicBonusPoints);
            if(+basicBonusPoints !== 0){
                this.getView().getModel().setProperty(sPath + '/current_value', sStartValue[0] + (+sStartStatBonus + 1));
                this.getView().getModel().setProperty(sPath + '/start_stat_bonus', +sStartStatBonus + 1);
                this.getView().getModel().setProperty('/Basic_Bonus_Points/0/points', +basicBonusPoints-1);}
            console.log(basicBonusPoints);

        },
        startStatBonusButtonMinus: function(oEvent) {
            let sPath = oEvent.getSource().getBindingContext().getPath();
            let sStartValue = oEvent.getSource().getBindingContext().getProperty('start_value');
            let limitSumm = 0;
            for (let i = 0; i<5;i++){
                limitSumm = limitSumm + (this.getView().getModel().getProperty("/All_Classes/0/table_stats/"+i+"/start_value/0"));
            }
            console.log(limitSumm);
            let sStartStatBonus = oEvent.getSource().getBindingContext().getProperty('start_stat_bonus');
            let basicBonusPoints = this.getView().getModel().getProperty('/Basic_Bonus_Points/0/points');
            const limitPoints =+(this.getView().getModel().getProperty('/Basic_Bonus_Points/0/limit'));
            //console.log(basicBonusPoints);
            //console.log(limitPoints);
            if(+basicBonusPoints < limitPoints){
                this.getView().getModel().setProperty(sPath + '/current_value', sStartValue[0] + (+sStartStatBonus - 1));
                this.getView().getModel().setProperty(sPath + '/start_stat_bonus', +sStartStatBonus - 1);
                this.getView().getModel().setProperty('/Basic_Bonus_Points/0/points', +basicBonusPoints+1);
                limitSumm--
            }
            //console.log(oEvent.getSource().getBindingContext().getProperty('start_stat_bonus'));
            //console.log(sPath + '/current_value', 1 + sStartValue + sStartStatBonus);

            //console.log(sStartValue);
        },
        onImageLoad: function() {
            //MessageToast.show("Картинка загрузилась");
        },
        onImageError: function() {
            MessageToast.show("Картинка не работает");
        }
    });
});