import React, { useEffect, useMemo, useState } from 'react';
import Canvas from '../clever-canvas';

const Radar = (config) => {
    const {
        size,
        direction = 'up',
        canvasPadding = {},
        offset = {},
        className,
        // triConfig,
        arcConfigList,
        lineConfigList,
        arrowConfigList,
        pointConfigList,
        ellipseConfigList
    } = config;

    const { width = 0, height = 0 } = size;
    const { paddingTop = 0, paddingLeft = 0, paddingBottom = 0, paddingRight = 0 } = canvasPadding;
    const { offsetX = 0, offsetY = 0 } = offset;
    const centerPoint = useMemo(() => {
        const centerPointMap = {
            up: {
                x: 1000,
                y: 1000
            },
            down: {
                x: 1000,
                y: 0
            },
            left: {
                x: 1000,
                y: 1000
            },
            right: {
                x: 0,
                y: 1000
            },
            center: {
                x: 1000,
                y: 1000
            }
        }
        return {
            x: centerPointMap[direction].x + paddingLeft + offsetX,
            y: centerPointMap[direction].y + paddingTop + offsetY
        }
    }, [direction, paddingLeft, paddingTop, offsetX, offsetY])

    const [parentWidth, setParentWidth] = useState(1);
    const [parentHeight, setParentHeight] = useState(1);
    const [innerWidth, setInnerWidth] = useState(1);
    const [innerHeight, setInnerHeight] = useState(1);
    const [backgroundConfigList, setBackgroundConfigList] = useState([]);
    const [varyConfigList, setVaryConfigList] = useState([]);

    useEffect(() => {
        let _innerWidth = (direction === 'left' || direction === 'right') ? 1000 : 2000;
        let _innerHeight = (direction === 'up' || direction === 'down') ? 1000 : 2000;
        _innerWidth += paddingLeft + paddingRight;
        _innerHeight += paddingTop + paddingBottom;
        setInnerWidth(_innerWidth);
        setInnerHeight(_innerHeight);
        let _parentWidth = 0;
        let _parentHeight = 0;
        if (width) {
            if (typeof(width) === 'number' || ('' + width).slice(-2) === 'px') {
                _parentWidth = parseFloat(width)
            } else {
                _parentWidth = width;
            }
        } else {
            _parentWidth = '100%';
        }
        if (height) {
            if (typeof(height) === 'number' || ('' + height).slice(-2) === 'px') {
                _parentHeight = parseFloat(height)
            } else {
                _parentHeight = height;
            }
        } else if (width) {
            _parentHeight = width / _innerWidth * _innerHeight;
        } else {
            _parentHeight = '100%';
        }
        setParentWidth(_parentWidth);
        setParentHeight(_parentHeight);
    }, [direction, width, height, paddingBottom, paddingLeft, paddingRight, paddingTop])

    useEffect(() => {
        const _arcConfigList = (arcConfigList || []).reduce((res, item) => {
            res.push({
                type: 'arc',
                isPolar: false,
                drawConfig: {
                    position: centerPoint,
                    ...item
                },
            })
            if (item?.textConfigList) {
                for (const config of item.textConfigList) {
                    res.push({
                        type: 'text',
                        isPolar: true,
                        drawConfig: {
                            centerPoint,
                            ...config
                        },
                    })
                }
            }
            return res;
        }, [])

        const _lineConfigList = (lineConfigList || []).reduce((res, item) => {
            res.push({
                type: 'line',
                isPolar: true,
                drawConfig: {
                    centerPoint,
                    ...item
                },
            })
            if (item?.textConfigList) {
                for (const config of item.textConfigList) {
                    res.push({
                        type: 'text',
                        isPolar: true,
                        drawConfig: {
                            centerPoint,
                            ...config
                        },
                    })
                }
            }
            return res;
        }, [])
        const _triConfigList = [];
        // if (triConfig) {
        //     const {
        //         height,
        //         angle,
        //         color
        //     } = triConfig;
        //     _triConfigList.push({
        //         type: 'triangle',
        //         isPolar: false,
        //         drawConfig {

        //         }
        //     })
        // }
        setBackgroundConfigList([..._arcConfigList, ..._lineConfigList, ..._triConfigList]);
    }, [arcConfigList, lineConfigList, centerPoint])

    useEffect(() => {
        const _arrowConfigList = (arrowConfigList || []).reduce((res, item) => {
            res.push({
                type: 'arrow',
                isPolar: true,
                drawConfig: {
                    centerPoint,
                    ...item
                },
            })
            if (item?.textConfigList) {
                for (const config of item.textConfigList) {
                    res.push({
                        type: 'text',
                        isPolar: true,
                        drawConfig: {
                            centerPoint,
                            ...config
                        },
                    })
                }
            }
            return res;
        }, [])

        const _pointConfigList = (pointConfigList || []).reduce((res, item) => {
            res.push({
                typeof: 'arc',
                isPolar: true,
                drawConfig: {
                    centerPoint,
                    ...item
                },
            })
            if (item?.textConfigList) {
                for (const config of item.textConfigList) {
                    res.push({
                        type: 'text',
                        isPolar: true,
                        drawConfig: {
                            centerPoint,
                            ...config
                        },
                    })
                }
            }
            return res;
        }, [])

        const _ellipseConfigList = (ellipseConfigList || []).reduce((res, item) => {
            res.push({
                type: 'ellipse',
                isPolar: true,
                onClick: item?.onClick,
                drawConfig: {
                    centerPoint,
                    ...item
                },
            })
            if (item?.textConfigList) {
                for (const config of item.textConfigList) {
                    res.push({
                        type: 'text',
                        isPolar: true,
                        drawConfig: {
                            centerPoint,
                            ...config
                        },
                    })
                }
            }
            return res;
        }, [])
        setVaryConfigList([..._arrowConfigList, ..._pointConfigList, ..._ellipseConfigList]);
    }, [arrowConfigList, pointConfigList, ellipseConfigList, centerPoint])

    return <Canvas
        parentSize = {{ parentWidth, parentHeight}}
        canvasSize = {{ canvasWidth: innerWidth, canvasHeight: innerHeight}}
        className = {className}
        backgroundConfigList = {backgroundConfigList}
        varyConfigList = {varyConfigList}
    />
}

export default Radar;