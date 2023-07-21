import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Util from './common/util';
import Draw from './common/draw';
import './index.css';

const Canvas = (canvasConfig) => {
    const {
        parentSize, // 外层容器尺寸
        canvasSize, // 画布坐标系范围
        className, // div类名
        backgroundConfigList = [], // 画在背景画布上的对象信息列表
        varyConfigList = [], // 画在动态画布上的对象信息列表
        // objectConfig: {
        //     type, // 图形对象类型
        //     isPolar, // 是否为极坐标系
        //     drawConfig, // 绘图细节
        //     onClick, // 点击事件
        // }

    } = canvasConfig;

    const { parentWidth = 0, parentHeight = 0 } = parentSize;
    const { canvasWidth = 0, canvasHeight = 0 } = canvasSize;
    const background = useRef(null);
    const vary = useRef(null);
    const cache = useRef(null);
    const [offset, setOffset] = useState({left: 0, top: 0}); // 画布相对于页面左上角偏移量
    const objectMap = useMemo(() => (new Map()), []);
    

    // 计算画布相对于页面左上角偏移量
    const calcOffset = () => {
        setOffset(Util.getElementOffset(background));
    };

    const getPointer = useCallback((e) => {
        let pointer = Util.getPointer(e, vary.current);
        return {
            x: (pointer.x - offset.left) * canvasWidth / parentWidth,
            y: (pointer.y - offset.top) * canvasHeight / parentHeight
        }
    }, [offset.left, offset.top, canvasWidth, canvasHeight, parentWidth, parentHeight])

    const findTarget = useCallback((e) => {
        const point = getPointer(e);
        const color = Util.getPointerColor(cache.current, point.x, point.y);
        return objectMap.get(color);
    }, [getPointer, objectMap])

    const onMouseDown = useCallback((e) => {
        let target = findTarget(e);
        if (target) {
            target.onClick();
        }
    }, [findTarget])

    useEffect(() => {
        // console.log(1)
        const hasEventObjectList = [...backgroundConfigList.filter(object => object?.onClick), ...varyConfigList.filter(object => object?.onClick)];
        objectMap.clear();
        cache.current?.clearRect(0, 0, canvasWidth, canvasHeight);
        for (const object of hasEventObjectList) {
            let color = Util.getRandomRGB();
            while (objectMap.has(color)) {
                color = Util.getRandomRGB();
            }
            objectMap.set(color, object);
            Draw[object.type + (object.isPolar ? 'ByPolar' : '')](cache.current, {
                ...object.drawConfig,
                fillColor: color,
                strokeColor: color
            });
        }
    }, [backgroundConfigList, varyConfigList, objectMap, canvasWidth, canvasHeight])

    useEffect(() => {
        // console.log(2, new Date())
        const bottomCtx = background.current?.getContext('2d');
        bottomCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (const object of backgroundConfigList) {
            Draw[object.type + (object.isPolar ? 'ByPolar' : '')](bottomCtx, object.drawConfig);
        }
    }, [backgroundConfigList, canvasWidth, canvasHeight])

    useEffect(() => {
        // console.log(3, new Date())
        const topCtx = vary.current?.getContext('2d');
        topCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (const object of varyConfigList) {
            Draw[object.type + (object.isPolar ? 'ByPolar' : '')](topCtx, object.drawConfig);
        }
    }, [varyConfigList, canvasWidth, canvasHeight])

    useEffect(() => {
        // console.log(4, new Date())
        calcOffset();
    }, [parentWidth, parentHeight])

    useEffect(() => {
        // console.log(5, new Date())
        cache.current = Util.getNewCanvasContext(canvasWidth, canvasHeight);
        const temp = vary.current;
        Util.addListener(temp, 'mousedown', onMouseDown);
        return () => Util.removeListener(temp, 'mousedown', onMouseDown);
    }, [canvasWidth, canvasHeight, onMouseDown])

    return (
        <div className={className ? `clever-canvas ${className}` : 'clever-canvas'} style={{width: parentWidth, height: parentHeight}}>
            <canvas className='background' ref={background} width={canvasWidth} height={canvasHeight} />
            <canvas className='vary' ref={vary} width={canvasWidth} height={canvasHeight} />
        </div>
    )
}

export default Canvas;