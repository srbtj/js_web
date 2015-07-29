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
 * @param iSpeed
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

            var scale = (options[attr] - obj.dis) / iSpeed ;

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

function getElementByClassName(obj,target,className){

    return function(){
        var iTarget = obj.getElementsByTagName(target);
        var arr = [];

        for(var attr in iTarget){

            var iClass = iTarget[attr].className.split(' ');

            for(var i in iClass){

                if(iClass[i] === className){
                    arr.push(iTarget[attr]);
                    break;
                }
            }
        }

        return arr;
    }
};
