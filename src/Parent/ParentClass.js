import ChildClass from "Parent/Child/ChildClass";


export default class ParentClass {
    get child() {
        return this._child;
    }

    constructor() {
        console.log("created ParentClass");

        this._child = new ChildClass();
    }
}