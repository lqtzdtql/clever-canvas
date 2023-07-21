import Util from "../util";

export const drawEllipse = (config) => {
    const {
        ctx,
        size,
        startAngle = 0,
        endAngle = 360,
        position,
        fillColor,
        strokeColor,
        lineWidth = 1
    } = config;
    const { a, b } = size;
    const max = Math.max(a, b);
    const scaleX = a/max;
    const scaleY = b/max;

    if (ctx) {
        ctx.save();
        ctx.scale(scaleX, scaleY);
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(
            position.x/scaleX,
            position.y/scaleY,
            max,
            startAngle,
            endAngle
        );
        fillColor && ctx.fill();
        strokeColor && ctx.stroke();
        ctx.restore();
    }
}

export const drawEllipseByPolar = (config) => {
    const {
        ctx,
        size,
        startAngle = 0,
        endAngle = 360,
        position,
        centerPoint,
        fillColor,
        strokeColor,
        lineWidth = 1
    } = config;
    const point = Util.polar2cartesian(position.r, position.angle, centerPoint);
    const { a, b } = size;
    const max = Math.max(a, b);
    const scaleX = a/max;
    const scaleY = b/max;

    if (ctx) {
        ctx.save();
        ctx.scale(scaleX, scaleY);
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.arc(
            point.x/scaleX,
            point.y/scaleY,
            max,
            startAngle,
            endAngle
        );
        fillColor && ctx.fill();
        strokeColor && ctx.stroke();
        ctx.restore();
    }
}