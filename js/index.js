/**
 *  get element by id
 * @param id
 * @returns {HTMLElement}
 */
function $(id){
    return document.getElementById(id);
};

/**
 *  get specify style of element
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
};

/**
 *  cache move;
 * @param obj
 * @param options
 * @param iSpeed  (0 - 1)
 * @param fn
 */
function startMove(obj,options,iSpeed,fn){

    clearInterval(obj.timer);

    obj.timer = setInterval(function(){

        obj.dis = 0;
        obj.flag = true;

        for(var attr in options){

            if(attr === 'opacity'){

                obj.dis = Math.round(getStyle(obj,attr)*100);

            }else{

                obj.dis = parseInt(getStyle(obj,attr));
            }

            var scale = (options[attr] - obj.dis) * iSpeed ;
            scale = scale > 0 ? Math.ceil(scale) : Math.floor(scale);
            if(options[attr] !== obj.dis){

                obj.flag = false;

                if(attr === 'opacity'){

                    obj.style[attr] = ( obj.dis + scale ) / 100;
                    obj.style.filter = 'alpha(opacity = '+ ( obj.dis + scale ) + ')';
                }else{
                    obj.style[attr] = obj.dis + scale + 'px';
                }
            }
        }

        if(obj.flag){

            clearInterval(obj.timer);
            fn && fn.call(obj);
        }
    },30);
};

/**
 *
 * @param obj
 * @param target
 * @param className
 * @returns {Function}
 */
function getElementByClassName(obj,target,className){

    var iTarget = obj.getElementsByTagName(target);
    var arr = [];

    for(var attr in iTarget){

        if(iTarget[attr].className){
            var iClass = iTarget[attr].className.split(' ');

            for(var i in iClass){

                if(iClass[i] === className){
                    arr.push(iTarget[attr]);
                    break;
                }
            }
        }

    }

    return arr;

};

/***
 *  add class style
 * @param obj
 * @param className
 */
function addClassByClassName(obj,className){

    if(obj.className){
        var iClass = obj.className.split(' ');
        var _index = getIndex(iClass,className);
        if(_index === -1){

            obj.className = obj.className + ' ' + className;
        }
    }else{
        obj.className = className;
    }

}

/**
 *   remove class style
 * @param obj
 * @param className
 */
function removeClassByClassName(obj,className){

    if(obj.className){

        var iClass = obj.className.split(' ');

        var _index = getIndex(iClass,className);
        if(_index > 0){

            iClass.splice(_index,1);
            obj.className = iClass;
        }
    }
}

/**
 *  get index of className
 * @param arr
 * @param className
 * @returns {number}
 */
function getIndex(arr,className){

    var _index = -1;
    for(var attr in arr){

        if(arr[attr] === className){

            _index = attr;
            break;
        }
    }

    return _index;
}