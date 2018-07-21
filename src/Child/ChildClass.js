import StringUtils from "utilities/StringUtils";
import StringUtils2 from "utilities-more/StringUtils";


export default class ChildClass {

    constructor() {
        console.log("created Child");

        let stringUtils = new StringUtils();

        let capitalized = stringUtils.capitalizeString("capitalizeMe");

        let stringUtils2 = new StringUtils2();

        let decapitalized = stringUtils2.decapitalizeString("DacApiTalizeMe");
    }
}