import StringUtils from "utilities/StringUtils";
import StringUtils2 from "utilities-more/StringUtils";


export default class ChildClass {
    get decapitalized() {
        return this._decapitalized;
    }
    get capitalized() {
        return this._capitalized;
    }

    constructor() {
        console.log("created Child");

        let stringUtils = new StringUtils();

        this._capitalized = stringUtils.capitalizeString("capitalizeMe");

        let stringUtils2 = new StringUtils2();

        this._decapitalized = stringUtils2.decapitalizeString("DacApiTalizeMe");
    }
}