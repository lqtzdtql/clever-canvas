
class Util {
    // 计算元素偏移值
    getElementOffset(element) {
        let valueTop = 0;
        let valueLeft = 0;
        while (element) {
            valueTop += element.offsetTop || 0;
            valueLeft += element.offsetLeft || 0;
            element = element.offsetParent;
        }
        return { left: valueLeft, top: valueTop};
    }

    addListener(element, eventName, handler) {
        element.addEventListener(eventName, handler, false);
    }

    removeListener(element, eventName, handler) {
        element.removeEventListener(eventName, handler, false);
    }

    getNewCanvasContext(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas.getContext('2d');
    }

    // 获取元素定位方式
    getElementPosition(element) {
        return window.getComputedStyle(element, null).position;
    }

    pointerX(event) {
        return event.clientX || 0;
    }

    pointerY(event) {
        return event.clientY || 0;
    }

    // 获取鼠标点击坐标，相对于页面左上角
    getPointer(event, upperCanvasEl) {
        event || (event = window.event);
        let element = event.target;
        let body = document.body || { scrollLeft: 0, scrollTop: 0 };
        let docElement = document.documentElement;
        let orgElement = element;
        let scrollLeft = 0;
        let scrollTop = 0;
        let firstFixedAncestor;

        while (element && element.parentNode && !firstFixedAncestor) {
            element = element.parentNode;
            if (element !== document && this.getElementPosition(element) === 'fixed') {
                firstFixedAncestor = element;
            }
            if (element !== document && orgElement !== upperCanvasEl && this.getElementPosition(element) === 'absolute') {
                scrollLeft = 0;
                scrollTop = 0;
            } else if (element === document && orgElement !== upperCanvasEl) {
                scrollLeft = body.scrollLeft || docElement.scrollLeft || 0;
                scrollTop = body.scrollTop || docElement.scrollTop || 0;
            } else {
                scrollLeft += element.scrollLeft || 0;
                scrollTop += element.scrollTop || 0;
            }
        }

        return {
            x: this.pointerX(event) + scrollLeft,
            y: this.pointerY(event) + scrollTop,
        }
    }

    // 获取画布对应位置颜色
    getPointerColor(ctx, x, y) {
        const color = ctx.getImageData(x, y, 1, 1).data;
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }

    // 随机数生成
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // 随机生成rgb
    getRandomRGB() {
        return `rgb(${this.getRandom(0, 255)}, ${this.getRandom(0, 255)}, ${this.getRandom(0, 255)})`;
    }

    // 极坐标转换为直角坐标
    polar2cartesian(r, angle, center) {
        return {
            x: center.x + r * Math.cos(angle/180*Math.PI),
            y: center.y - r * Math.sin(angle/180*Math.PI)
        }
    }
}

const util = new Util();

export default util;